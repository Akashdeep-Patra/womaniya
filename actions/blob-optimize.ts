'use server';

import { auth } from '@/auth';
import { del, head } from '@vercel/blob';
import { db } from '@/lib/db';
import { products, productImages, categories, collections, banners, pages, testimonials, mediaAssets } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { logger } from '@/lib/logger';

/**
 * Returns all unique blob URLs referenced anywhere in the DB,
 * so the client can decide which ones need recompression.
 */
export async function getAllBlobUrls(): Promise<{ url: string; table: string; column: string; id: number }[]> {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const refs: { url: string; table: string; column: string; id: number }[] = [];

  const prods = await db.select({ id: products.id, url: products.image_url }).from(products);
  for (const p of prods) {
    if (p.url) refs.push({ url: p.url, table: 'products', column: 'image_url', id: p.id });
  }

  const pImgs = await db.select({ id: productImages.id, url: productImages.image_url }).from(productImages);
  for (const pi of pImgs) {
    if (pi.url) refs.push({ url: pi.url, table: 'product_images', column: 'image_url', id: pi.id });
  }

  const cats = await db.select({ id: categories.id, hero: categories.hero_image_url, carousel: categories.carousel_images }).from(categories);
  for (const c of cats) {
    if (c.hero) refs.push({ url: c.hero, table: 'categories', column: 'hero_image_url', id: c.id });
    if (c.carousel && Array.isArray(c.carousel)) {
      for (const url of c.carousel) {
        refs.push({ url, table: 'categories', column: 'carousel_images', id: c.id });
      }
    }
  }

  const colls = await db.select({ id: collections.id, hero: collections.hero_image_url, carousel: collections.carousel_images }).from(collections);
  for (const c of colls) {
    if (c.hero) refs.push({ url: c.hero, table: 'collections', column: 'hero_image_url', id: c.id });
    if (c.carousel && Array.isArray(c.carousel)) {
      for (const url of c.carousel) {
        refs.push({ url, table: 'collections', column: 'carousel_images', id: c.id });
      }
    }
  }

  const bnrs = await db.select({ id: banners.id, url: banners.image_url, mobile: banners.image_url_mobile, images: banners.images }).from(banners);
  for (const b of bnrs) {
    if (b.url) refs.push({ url: b.url, table: 'banners', column: 'image_url', id: b.id });
    if (b.mobile) refs.push({ url: b.mobile, table: 'banners', column: 'image_url_mobile', id: b.id });
    if (b.images && Array.isArray(b.images)) {
      for (const url of b.images) {
        refs.push({ url, table: 'banners', column: 'images', id: b.id });
      }
    }
  }

  const pgs = await db.select({ id: pages.id, hero: pages.hero_image_url, images: pages.images }).from(pages);
  for (const p of pgs) {
    if (p.hero) refs.push({ url: p.hero, table: 'pages', column: 'hero_image_url', id: p.id });
    if (p.images && Array.isArray(p.images)) {
      for (const url of p.images) {
        refs.push({ url, table: 'pages', column: 'images', id: p.id });
      }
    }
  }

  const tests = await db.select({ id: testimonials.id, url: testimonials.author_image_url }).from(testimonials);
  for (const t of tests) {
    if (t.url) refs.push({ url: t.url, table: 'testimonials', column: 'author_image_url', id: t.id });
  }

  return refs;
}

/**
 * Swap a single old blob URL with a new (recompressed) one across all DB tables.
 *
 * SAFETY GUARANTEES:
 * 1. Verifies the new blob actually exists before touching any DB records
 * 2. Performs all DB swaps first, only deletes old blob after ALL succeed
 * 3. If any DB swap fails, stops immediately — old blob is preserved
 * 4. Old blob deletion failure is non-fatal (logged but not thrown)
 */
export async function swapBlobUrl(
  oldUrl: string,
  newUrl: string,
  newSizeBytes?: number,
  newFilename?: string,
): Promise<{ updated: number }> {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  // SAFETY: Verify the new blob actually exists before changing any DB records
  try {
    await head(newUrl);
  } catch {
    throw new Error(`New blob not found at ${newUrl} — aborting swap to protect existing references`);
  }

  let updated = 0;

  // Wrap all DB updates — if any fail, we stop but old blob is untouched
  try {
    // Products — image_url
    const r1 = await db.update(products).set({ image_url: newUrl }).where(eq(products.image_url, oldUrl));
    updated += r1.rowCount ?? 0;

    // Product Images — image_url
    const r2 = await db.update(productImages).set({ image_url: newUrl }).where(eq(productImages.image_url, oldUrl));
    updated += r2.rowCount ?? 0;

    // Categories — hero_image_url
    const r3 = await db.update(categories).set({ hero_image_url: newUrl }).where(eq(categories.hero_image_url, oldUrl));
    updated += r3.rowCount ?? 0;

    // Categories — carousel_images (jsonb array replace)
    await db.execute(sql`
      UPDATE categories
      SET carousel_images = (
        SELECT jsonb_agg(
          CASE WHEN elem::text = ${JSON.stringify(oldUrl)} THEN ${JSON.stringify(newUrl)}::jsonb ELSE elem END
        )
        FROM jsonb_array_elements(carousel_images) elem
      )
      WHERE carousel_images::text LIKE ${'%' + oldUrl + '%'}
    `);

    // Collections — hero_image_url
    const r5 = await db.update(collections).set({ hero_image_url: newUrl }).where(eq(collections.hero_image_url, oldUrl));
    updated += r5.rowCount ?? 0;

    // Collections — carousel_images
    await db.execute(sql`
      UPDATE collections
      SET carousel_images = (
        SELECT jsonb_agg(
          CASE WHEN elem::text = ${JSON.stringify(oldUrl)} THEN ${JSON.stringify(newUrl)}::jsonb ELSE elem END
        )
        FROM jsonb_array_elements(carousel_images) elem
      )
      WHERE carousel_images::text LIKE ${'%' + oldUrl + '%'}
    `);

    // Banners — image_url, image_url_mobile
    const r7 = await db.update(banners).set({ image_url: newUrl }).where(eq(banners.image_url, oldUrl));
    updated += r7.rowCount ?? 0;
    const r8 = await db.update(banners).set({ image_url_mobile: newUrl }).where(eq(banners.image_url_mobile, oldUrl));
    updated += r8.rowCount ?? 0;

    // Banners — images[]
    await db.execute(sql`
      UPDATE banners
      SET images = (
        SELECT jsonb_agg(
          CASE WHEN elem::text = ${JSON.stringify(oldUrl)} THEN ${JSON.stringify(newUrl)}::jsonb ELSE elem END
        )
        FROM jsonb_array_elements(images) elem
      )
      WHERE images::text LIKE ${'%' + oldUrl + '%'}
    `);

    // Pages — hero_image_url
    const r10 = await db.update(pages).set({ hero_image_url: newUrl }).where(eq(pages.hero_image_url, oldUrl));
    updated += r10.rowCount ?? 0;

    // Pages — images[]
    await db.execute(sql`
      UPDATE pages
      SET images = (
        SELECT jsonb_agg(
          CASE WHEN elem::text = ${JSON.stringify(oldUrl)} THEN ${JSON.stringify(newUrl)}::jsonb ELSE elem END
        )
        FROM jsonb_array_elements(images) elem
      )
      WHERE images::text LIKE ${'%' + oldUrl + '%'}
    `);

    // Testimonials — author_image_url
    const r12 = await db.update(testimonials).set({ author_image_url: newUrl }).where(eq(testimonials.author_image_url, oldUrl));
    updated += r12.rowCount ?? 0;

    // Media Assets — url, mime_type, filename, size_bytes
    const mediaUpdate: Record<string, unknown> = { url: newUrl, mime_type: 'image/webp' };
    if (newFilename) mediaUpdate.filename = newFilename;
    if (newSizeBytes != null) mediaUpdate.size_bytes = newSizeBytes;
    const r13 = await db.update(mediaAssets).set(mediaUpdate).where(eq(mediaAssets.url, oldUrl));
    updated += r13.rowCount ?? 0;

  } catch (dbError) {
    logger.error('Blob swap DB update failed — old blob preserved', { oldUrl: oldUrl.slice(-40), newUrl: newUrl.slice(-40), error: dbError });
    throw new Error('Failed to update database references — original images are safe');
  }

  // SAFETY: Only delete old blob AFTER all DB updates succeeded
  // Even if this fails, the new URL is already in the DB — the old blob just becomes an orphan
  // (the cleanup cron will eventually remove it)
  try {
    await del(oldUrl);
  } catch (e) {
    logger.warn('Failed to delete old blob after successful swap — will be cleaned up by cron', { oldUrl, error: e });
  }

  logger.info('Blob URL swapped successfully', { oldUrl: oldUrl.slice(-40), newUrl: newUrl.slice(-40), updated });

  return { updated };
}
