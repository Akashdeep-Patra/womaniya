/**
 * OG Image Integration Tests
 *
 * Starts the Next.js dev server, discovers real content slugs by scraping
 * listing pages, then fetches every OG image endpoint and validates:
 *   - HTTP 200
 *   - Content-Type: image/png
 *   - Valid PNG magic bytes
 *   - Correct dimensions (1200 × 630)
 *
 * Saves PNG artifacts to test-artifacts/og/ for visual inspection.
 *
 * Usage:
 *   bun run test:og            # starts its own server (port 5099)
 *   OG_BASE_URL=http://localhost:5001 bun run test:og  # against running server
 *
 * Exit code 0 = all pass, 1 = one or more failures.
 */

import { spawn, type ChildProcess } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// ─── Config ──────────────────────────────────────────────────────────────────

const PORT = 5099; // dedicated test port — won't collide with dev (5001)
const BASE_URL = process.env.OG_BASE_URL ?? `http://localhost:${PORT}`;
const ARTIFACT_DIR = path.join(process.cwd(), 'test-artifacts', 'og');
const EXTERNAL_SERVER = !!process.env.OG_BASE_URL;

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const MIN_PNG_BYTES = 8_000; // valid images should be well above this

const REQUEST_TIMEOUT_MS = 30_000;
const SERVER_READY_TIMEOUT_MS = 60_000;
const SERVER_POLL_INTERVAL_MS = 1_000;

// ─── Types ────────────────────────────────────────────────────────────────────

interface TestCase {
  /** Human-readable name shown in output */
  name: string;
  /** Page path to scrape for the og:image URL (required) */
  pagePath: string;
  /**
   * If set, scrape THIS path to find a dynamic link matching this pattern,
   * then use that link as pagePath.
   */
  discoverFrom?: { listingPath: string; linkPattern: RegExp };
}

interface TestResult {
  name: string;
  pagePath: string;
  ogImageUrl?: string;
  passed: boolean;
  error?: string;
  dimensions?: { width: number; height: number };
  sizeBytes?: number;
  artifactPath?: string;
}

// ─── Static test cases ───────────────────────────────────────────────────────
//
// Each entry has a pagePath to scrape for the og:image meta tag.
// Dynamic routes additionally have a discoverFrom to find a real slug first.

const TEST_CASES: TestCase[] = [
  // ── Static / index pages ─────────────────────────────────────────────────
  { name: 'root',             pagePath: '/' },
  { name: 'storefront-home',  pagePath: '/en' },
  { name: 'shop-index',       pagePath: '/en/shop' },
  { name: 'stories-index',    pagePath: '/en/stories' },
  { name: 'collections-index',pagePath: '/en/collections' },
  { name: 'campaigns-index',  pagePath: '/en/campaigns' },
  { name: 'about',            pagePath: '/en/about' },
  { name: 'categories-index', pagePath: '/en/categories' },

  // ── Dynamic routes — slug discovered by scraping a listing page ───────────
  {
    name: 'shop-product',
    pagePath: '', // filled in at runtime
    discoverFrom: {
      listingPath: '/en/shop',
      linkPattern: /\/en\/shop\/[a-z0-9][a-z0-9-]+/i,
    },
  },
  {
    name: 'story-slug',
    pagePath: '',
    discoverFrom: {
      listingPath: '/en/stories',
      linkPattern: /\/en\/stories\/[a-z0-9][a-z0-9-]+/i,
    },
  },
  {
    name: 'collection-slug',
    pagePath: '',
    discoverFrom: {
      listingPath: '/en/collections',
      linkPattern: /\/en\/collection\/[a-z0-9][a-z0-9-]+/i,
    },
  },
  {
    name: 'campaign-slug',
    pagePath: '',
    discoverFrom: {
      listingPath: '/en/campaigns',
      linkPattern: /\/en\/campaign\/[a-z0-9][a-z0-9-]+/i,
    },
  },
];

// ─── Server management ───────────────────────────────────────────────────────

async function startServer(): Promise<ChildProcess> {
  console.log(`\n  Starting Next.js server on port ${PORT}…`);
  const server = spawn('bun', ['run', 'dev', '--port', String(PORT)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'development' },
  });

  // Stream server output for debugging (suppress in CI by piping to /dev/null)
  const debug = process.env.OG_DEBUG === '1';
  server.stdout?.on('data', (d: Buffer) => { if (debug) process.stdout.write(`  [server] ${d}`); });
  server.stderr?.on('data', (d: Buffer) => { if (debug) process.stderr.write(`  [server] ${d}`); });

  return server;
}

async function waitForServer(url: string): Promise<void> {
  const deadline = Date.now() + SERVER_READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.status < 500) return; // server is up (even 404 is fine)
    } catch {
      // not ready yet
    }
    await new Promise((r) => setTimeout(r, SERVER_POLL_INTERVAL_MS));
  }
  throw new Error(`Server did not become ready within ${SERVER_READY_TIMEOUT_MS / 1000}s`);
}

function stopServer(server: ChildProcess): void {
  try { server.kill('SIGTERM'); } catch { /* already dead */ }
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  return res.text();
}

function extractOgImageUrl(html: string, base: string): string | undefined {
  // Match property="og:image" content="..." (handles attribute order variations)
  const match =
    html.match(/property="og:image"\s+content="([^"]+)"/) ??
    html.match(/content="([^"]+)"\s+property="og:image"/);
  if (!match?.[1]) return undefined;
  const raw = match[1];
  // Make relative URLs absolute
  return raw.startsWith('http') ? raw : new URL(raw, base).toString();
}

function extractLinks(html: string, pattern: RegExp): string[] {
  // Only extract from href="..." attributes so we get real page links,
  // not OG image URLs that appear in <meta> tags.
  const links: string[] = [];
  const hrefRe = /href="([^"]+)"/gi;
  let m: RegExpExecArray | null;
  while ((m = hrefRe.exec(html)) !== null) {
    const href = m[1];
    if (pattern.test(href) && !links.includes(href)) {
      links.push(href);
    }
  }
  return links;
}

// ─── PNG validation ───────────────────────────────────────────────────────────

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function isPngBuffer(buf: Buffer): boolean {
  return buf.subarray(0, 8).equals(PNG_MAGIC);
}

// ─── Single test runner ───────────────────────────────────────────────────────

async function runTest(tc: TestCase): Promise<TestResult> {
  const result: TestResult = { name: tc.name, pagePath: tc.pagePath, passed: false };

  try {
    let pagePath = tc.pagePath;

    // Discover dynamic slug if needed
    if (tc.discoverFrom) {
      const listingHtml = await fetchText(`${BASE_URL}${tc.discoverFrom.listingPath}`);
      const links = extractLinks(listingHtml, tc.discoverFrom.linkPattern);
      if (links.length === 0) {
        result.error = `No links matching ${tc.discoverFrom.linkPattern} found on ${tc.discoverFrom.listingPath}`;
        return result;
      }
      pagePath = links[0]; // use first discovered slug
      result.pagePath = pagePath;
    }

    // Fetch the page to get the OG image URL from meta tags
    const pageHtml = await fetchText(`${BASE_URL}${pagePath}`);
    const ogUrl = extractOgImageUrl(pageHtml, BASE_URL);
    if (!ogUrl) {
      result.error = `No og:image meta tag found on ${pagePath}`;
      return result;
    }
    result.ogImageUrl = ogUrl;

    // Fetch the OG image itself
    const imgRes = await fetch(ogUrl, { signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
    if (!imgRes.ok) {
      result.error = `HTTP ${imgRes.status} from OG image URL`;
      return result;
    }
    const contentType = imgRes.headers.get('content-type') ?? '';
    if (!contentType.includes('image/png')) {
      result.error = `Wrong content-type: "${contentType}" (expected image/png)`;
      return result;
    }

    const buf = Buffer.from(await imgRes.arrayBuffer());
    result.sizeBytes = buf.length;

    if (buf.length < MIN_PNG_BYTES) {
      result.error = `PNG too small: ${buf.length} bytes (min ${MIN_PNG_BYTES})`;
      return result;
    }
    if (!isPngBuffer(buf)) {
      result.error = `Response is not a valid PNG (wrong magic bytes)`;
      return result;
    }

    // Use sharp to verify dimensions
    const meta = await sharp(buf).metadata();
    result.dimensions = { width: meta.width ?? 0, height: meta.height ?? 0 };
    if (meta.width !== OG_WIDTH || meta.height !== OG_HEIGHT) {
      result.error = `Wrong dimensions: ${meta.width}×${meta.height} (expected ${OG_WIDTH}×${OG_HEIGHT})`;
      return result;
    }

    // Save artifact
    const artifactPath = path.join(ARTIFACT_DIR, `${tc.name}.png`);
    await fs.writeFile(artifactPath, buf);
    result.artifactPath = artifactPath;

    result.passed = true;
  } catch (err) {
    result.error = err instanceof Error ? err.message : String(err);
  }

  return result;
}

// ─── Reporter ─────────────────────────────────────────────────────────────────

function printResult(r: TestResult): void {
  const status = r.passed ? '✅' : '❌';
  const dims = r.dimensions ? `  ${r.dimensions.width}×${r.dimensions.height}` : '';
  const size = r.sizeBytes ? `  ${(r.sizeBytes / 1024).toFixed(1)}KB` : '';
  const page = r.pagePath || '(discovering…)';
  console.log(`  ${status}  ${r.name.padEnd(22)} ${page}${dims}${size}`);
  if (!r.passed) {
    console.log(`       ↳ ${r.error}`);
    if (r.ogImageUrl) console.log(`       ↳ OG URL: ${r.ogImageUrl}`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('\n┌─────────────────────────────────────────────────────┐');
  console.log('│           Womaniya OG Image Integration Tests        │');
  console.log('└─────────────────────────────────────────────────────┘');

  await fs.mkdir(ARTIFACT_DIR, { recursive: true });

  let server: ChildProcess | undefined;
  if (!EXTERNAL_SERVER) {
    server = await startServer();
    try {
      console.log(`  Waiting for server at ${BASE_URL}…`);
      await waitForServer(`${BASE_URL}/en`);
      console.log(`  Server ready ✓\n`);
    } catch (err) {
      stopServer(server);
      console.error(`  ✗ ${err instanceof Error ? err.message : err}`);
      process.exit(1);
    }
  } else {
    console.log(`  Using external server: ${BASE_URL}\n`);
  }

  const results: TestResult[] = [];
  console.log(`  ${'Name'.padEnd(24)} ${'Page'.padEnd(40)} Dims       Size`);
  console.log(`  ${'─'.repeat(80)}`);

  for (const tc of TEST_CASES) {
    const result = await runTest(tc);
    results.push(result);
    printResult(result);
  }

  if (server) stopServer(server);

  // Summary
  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  console.log(`\n  ${'─'.repeat(80)}`);
  console.log(`  ${passed} passed, ${failed} failed`);
  if (results.some((r) => r.passed)) {
    console.log(`  Artifacts saved to: ${ARTIFACT_DIR}`);
  }

  if (failed > 0) {
    console.log('\n  ── Failures ──────────────────────────────────────────');
    results.filter((r) => !r.passed).forEach((r) => {
      console.log(`\n  ❌ ${r.name} (${r.pagePath})`);
      console.log(`     ${r.error}`);
      if (r.ogImageUrl) console.log(`     OG URL: ${r.ogImageUrl}`);
    });
    console.log('');
    process.exit(1);
  }

  console.log('\n  All OG image tests passed ✓\n');
}

main().catch((err) => {
  console.error('\nUnhandled error:', err);
  process.exit(1);
});
