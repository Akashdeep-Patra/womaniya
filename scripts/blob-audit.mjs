import { list } from '@vercel/blob';
import { config } from 'dotenv';
config({ path: '/Users/akashdeep/Documents/code/womaniya/.env.local' });

async function audit() {
  const stats = { total: 0, totalBytes: 0, byPrefix: {}, byType: {}, large: [], noWebp: [] };
  let cursor;

  do {
    const result = await list({ cursor, limit: 1000 });
    for (const blob of result.blobs) {
      stats.total++;
      stats.totalBytes += blob.size;

      const prefix = blob.pathname.split('/')[0] || 'root';
      if (!stats.byPrefix[prefix]) stats.byPrefix[prefix] = { count: 0, bytes: 0 };
      stats.byPrefix[prefix].count++;
      stats.byPrefix[prefix].bytes += blob.size;

      const ct = blob.contentType || 'unknown';
      if (!stats.byType[ct]) stats.byType[ct] = { count: 0, bytes: 0 };
      stats.byType[ct].count++;
      stats.byType[ct].bytes += blob.size;

      if (blob.size > 2 * 1024 * 1024) {
        stats.large.push({ pathname: blob.pathname, sizeMB: (blob.size / 1024 / 1024).toFixed(2), type: blob.contentType });
      }

      if (ct.startsWith('image/') && !['image/webp', 'image/avif'].includes(ct)) {
        stats.noWebp.push({ pathname: blob.pathname, sizeMB: (blob.size / 1024 / 1024).toFixed(2), type: blob.contentType });
      }
    }
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  console.log('=== BLOB STORAGE AUDIT ===');
  console.log('Total blobs:', stats.total);
  console.log('Total size:', (stats.totalBytes / 1024 / 1024).toFixed(2), 'MB');
  console.log();

  console.log('--- By Folder Prefix ---');
  for (const [prefix, data] of Object.entries(stats.byPrefix).sort((a, b) => b.bytes - a.bytes)) {
    console.log(`  ${prefix}: ${data.count} files, ${(data.bytes / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log();

  console.log('--- By Content Type ---');
  for (const [type, data] of Object.entries(stats.byType).sort((a, b) => b.bytes - a.bytes)) {
    console.log(`  ${type}: ${data.count} files, ${(data.bytes / 1024 / 1024).toFixed(2)} MB`);
  }
  console.log();

  if (stats.large.length > 0) {
    console.log('--- Large Files (>2MB) ---');
    stats.large.sort((a, b) => parseFloat(b.sizeMB) - parseFloat(a.sizeMB));
    for (const f of stats.large) {
      console.log(`  ${f.sizeMB}MB  ${f.type}  ${f.pathname}`);
    }
    console.log();
  }

  if (stats.noWebp.length > 0) {
    console.log('--- Non-WebP/AVIF Images (compression may not have been applied) ---');
    for (const f of stats.noWebp) {
      console.log(`  ${f.sizeMB}MB  ${f.type}  ${f.pathname}`);
    }
    console.log();
  }

  const webpCount = stats.byType['image/webp']?.count || 0;
  const avifCount = stats.byType['image/avif']?.count || 0;
  const nonOptCount = stats.noWebp.length;
  const totalImages = Object.entries(stats.byType).filter(([k]) => k.startsWith('image/')).reduce((s, [, v]) => s + v.count, 0);

  console.log('=== OPTIMIZATION VERDICT ===');
  console.log('Total images:', totalImages);
  console.log(`WebP: ${webpCount} (${totalImages > 0 ? ((webpCount / totalImages) * 100).toFixed(1) : 0}%)`);
  console.log(`AVIF: ${avifCount} (${totalImages > 0 ? ((avifCount / totalImages) * 100).toFixed(1) : 0}%)`);
  console.log(`Non-optimized (JPEG/PNG): ${nonOptCount} (${totalImages > 0 ? ((nonOptCount / totalImages) * 100).toFixed(1) : 0}%)`);
  console.log('Large files (>2MB):', stats.large.length);

  if (nonOptCount > 0 && totalImages > 0) {
    const pct = ((nonOptCount / totalImages) * 100).toFixed(0);
    console.log(`\n⚠ ${pct}% of images are NOT in WebP/AVIF format — browser-side compression may not be working for all uploads.`);
  }
  if (webpCount > 0 && nonOptCount === 0) {
    console.log('\n✓ All images are in optimized formats (WebP/AVIF). Compression is working correctly.');
  }
}

audit().catch(console.error);
