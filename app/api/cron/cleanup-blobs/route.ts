import { NextRequest, NextResponse } from 'next/server';
import { list, del } from '@vercel/blob';
import { db } from '@/lib/db';
import { sql } from 'drizzle-orm';
import { logger } from '@/lib/logger';

const GRACE_PERIOD_MS = 24 * 60 * 60 * 1000; // 24 hours

async function collectReferencedUrls(): Promise<Set<string>> {
  const urls = new Set<string>();

  const textColumns = await db.execute<{ url: string }>(sql`
    SELECT image_url AS url FROM products WHERE image_url IS NOT NULL
    UNION ALL
    SELECT image_url AS url FROM product_images WHERE image_url IS NOT NULL
    UNION ALL
    SELECT hero_image_url AS url FROM categories WHERE hero_image_url IS NOT NULL
    UNION ALL
    SELECT hero_image_url AS url FROM collections WHERE hero_image_url IS NOT NULL
    UNION ALL
    SELECT image_url AS url FROM banners WHERE image_url IS NOT NULL
    UNION ALL
    SELECT image_url_mobile AS url FROM banners WHERE image_url_mobile IS NOT NULL
    UNION ALL
    SELECT hero_image_url AS url FROM pages WHERE hero_image_url IS NOT NULL
    UNION ALL
    SELECT author_image_url AS url FROM testimonials WHERE author_image_url IS NOT NULL
    UNION ALL
    SELECT url FROM media_assets
  `);

  for (const row of textColumns.rows) {
    if (row.url) urls.add(row.url);
  }

  const jsonbColumns = await db.execute<{ urls: string[] | null }>(sql`
    SELECT carousel_images AS urls FROM categories WHERE carousel_images IS NOT NULL
    UNION ALL
    SELECT carousel_images AS urls FROM collections WHERE carousel_images IS NOT NULL
    UNION ALL
    SELECT images AS urls FROM banners WHERE images IS NOT NULL
    UNION ALL
    SELECT images AS urls FROM pages WHERE images IS NOT NULL
  `);

  for (const row of jsonbColumns.rows) {
    const arr = row.urls;
    if (Array.isArray(arr)) {
      for (const u of arr) {
        if (typeof u === 'string') urls.add(u);
      }
    }
  }

  const sections = await db.execute<{ content_json: Record<string, unknown> | null }>(sql`
    SELECT content_json FROM page_sections WHERE content_json IS NOT NULL
  `);

  for (const row of sections.rows) {
    const json = row.content_json;
    if (json && typeof json === 'object') {
      for (const val of Object.values(json)) {
        if (typeof val === 'string' && val.includes('blob.vercel-storage.com')) {
          urls.add(val);
        }
      }
    }
  }

  return urls;
}

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const dryRun = request.nextUrl.searchParams.get('dry') === 'true';
  const cutoff = new Date(Date.now() - GRACE_PERIOD_MS);

  try {
    const referencedUrls = await collectReferencedUrls();
    logger.info('Blob cleanup: collected referenced URLs', { count: referencedUrls.size });

    const orphans: { url: string; size: number; pathname: string }[] = [];
    let cursor: string | undefined;

    do {
      const result = await list({ cursor, limit: 1000 });
      for (const blob of result.blobs) {
        if (new Date(blob.uploadedAt) > cutoff) continue;
        if (!referencedUrls.has(blob.url)) {
          orphans.push({ url: blob.url, size: blob.size, pathname: blob.pathname });
        }
      }
      cursor = result.hasMore ? result.cursor : undefined;
    } while (cursor);

    const totalFreedBytes = orphans.reduce((sum, o) => sum + o.size, 0);

    if (!dryRun && orphans.length > 0) {
      const batchSize = 100;
      for (let i = 0; i < orphans.length; i += batchSize) {
        const batch = orphans.slice(i, i + batchSize).map((o) => o.url);
        await del(batch);
      }
      logger.info('Blob cleanup: deleted orphans', {
        count: orphans.length,
        freedBytes: totalFreedBytes,
      });
    } else if (dryRun) {
      logger.info('Blob cleanup: dry run', {
        orphansFound: orphans.length,
        freedBytes: totalFreedBytes,
      });
    } else {
      logger.info('Blob cleanup: no orphans found');
    }

    return NextResponse.json({
      orphansFound: orphans.length,
      deleted: dryRun ? 0 : orphans.length,
      freedBytes: totalFreedBytes,
      freedKB: Math.round(totalFreedBytes / 1024),
      dryRun,
      ...(dryRun ? { orphans: orphans.slice(0, 50) } : {}),
    });
  } catch (error) {
    logger.error('Blob cleanup failed', { error });
    return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 });
  }
}
