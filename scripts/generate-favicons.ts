/**
 * Generate all favicon/icon assets for the Womaniya brand.
 *
 * Outputs to public/:
 *   - favicon.ico          (48x48 ICO via embedded PNG)
 *   - icon-192.png         (192x192 for Android/PWA)
 *   - icon-512.png         (512x512 for PWA splash)
 *   - apple-touch-icon.png (180x180 for iOS)
 *   - favicon-32.png       (32x32 small favicon)
 *   - favicon-16.png       (16x16 tiny favicon)
 *
 * Run: pnpm tsx scripts/generate-favicons.ts
 */

import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const OUT = join(process.cwd(), 'public');

/* ─── The brand SVG ────────────────────────────────────────────── */
function brandSvg(size: number, withBg: boolean = false, bgColor = '#FBF8F1'): string {
  const bg = withBg
    ? `<rect width="100" height="100" rx="22" fill="${bgColor}" />`
    : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="sindoor" x1="15%" y1="5%" x2="85%" y2="95%">
      <stop offset="0%" stop-color="#D94A3E" />
      <stop offset="50%" stop-color="#C0392B" />
      <stop offset="100%" stop-color="#A42E24" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F0DDA4" />
      <stop offset="50%" stop-color="#D4A843" />
      <stop offset="100%" stop-color="#B8923A" />
    </linearGradient>
  </defs>
  ${bg}
  <circle cx="50" cy="50" r="46" fill="url(#sindoor)" />
  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5" />
  <path
    d="M 19 36 C 16 34, 14 37, 15 40 C 16 42, 19 42, 20 40 L 34 72 C 35 74, 36 74, 37 72 L 47 40 C 48 38, 49 38, 50 40 L 60 72 C 61 74, 62 74, 63 72 L 76 28 C 77 24, 80 22, 82 24 C 84 26, 83 30, 80 31 C 77 32, 75 30, 76 28"
    fill="none"
    stroke="#FBF8F1"
    stroke-width="4.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <circle cx="48" cy="30" r="3" fill="url(#gold)" />
</svg>`;
}

/* ─── ICO file builder (single-image ICO with embedded PNG) ───── */
function buildIco(pngBuffer: Buffer, width: number, height: number): Buffer {
  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);      // reserved
  header.writeUInt16LE(1, 2);      // ICO type
  header.writeUInt16LE(1, 4);      // 1 image

  // Directory entry: 16 bytes
  const entry = Buffer.alloc(16);
  entry.writeUInt8(width >= 256 ? 0 : width, 0);
  entry.writeUInt8(height >= 256 ? 0 : height, 1);
  entry.writeUInt8(0, 2);          // no palette
  entry.writeUInt8(0, 3);          // reserved
  entry.writeUInt16LE(1, 4);       // color planes
  entry.writeUInt16LE(32, 6);      // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8);  // image size
  entry.writeUInt32LE(22, 12);     // offset to image data (6 + 16)

  return Buffer.concat([header, entry, pngBuffer]);
}

/* ─── Generate all assets ──────────────────────────────────────── */
async function main() {
  mkdirSync(OUT, { recursive: true });

  const configs = [
    { name: 'favicon-16.png',       size: 16,  bg: false },
    { name: 'favicon-32.png',       size: 32,  bg: false },
    { name: 'icon-192.png',         size: 192, bg: false },
    { name: 'icon-512.png',         size: 512, bg: false },
    { name: 'apple-touch-icon.png', size: 180, bg: true  },
  ];

  for (const { name, size, bg } of configs) {
    const svg = brandSvg(size, bg);
    const png = await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toBuffer();
    const out = join(OUT, name);
    writeFileSync(out, png);
    console.log(`  ✓ ${name} (${size}x${size})`);
  }

  // Build favicon.ico from 48x48 PNG
  const ico48svg = brandSvg(48);
  const ico48png = await sharp(Buffer.from(ico48svg))
    .resize(48, 48)
    .png()
    .toBuffer();
  const icoBuffer = buildIco(ico48png, 48, 48);
  writeFileSync(join(OUT, 'favicon.ico'), icoBuffer);
  console.log('  ✓ favicon.ico (48x48)');

  console.log('\nAll favicon assets generated in public/');
}

main().catch((err) => {
  console.error('Failed to generate favicons:', err);
  process.exit(1);
});
