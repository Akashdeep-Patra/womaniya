'use server';
import { auth } from '@/auth';

import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import { db }             from '@/lib/db';
import { mediaAssets, products, productImages, categories, collections, banners, pages, testimonials } from '@/db/schema';
import { eq, sql }        from 'drizzle-orm';
import { z }              from 'zod';
import { logger }         from '@/lib/logger';
import { logActivity }    from '@/lib/activity-logger';

const UpdateMediaSchema = z.object({
  alt_en: z.string().max(300).optional(),
  alt_bn: z.string().max(300).optional(),
  tags:   z.string().optional(),
});

export type MediaUsage = { entity: string; name: string; id: number };

export async function getAllMedia() {
  return db.query.mediaAssets.findMany({
    orderBy: (m, { desc }) => [desc(m.created_at)],
  });
}

/** Returns a map of blob URL → list of entities referencing it */
export async function getMediaUsageMap(): Promise<Record<string, MediaUsage[]>> {
  const usage: Record<string, MediaUsage[]> = {};

  const push = (url: string, entry: MediaUsage) => {
    if (!url) return;
    if (!usage[url]) usage[url] = [];
    usage[url].push(entry);
  };

  // Products
  const prods = await db.select({ id: products.id, name: products.name_en, url: products.image_url }).from(products);
  for (const p of prods) push(p.url, { entity: 'Product', name: p.name, id: p.id });

  // Product Images
  const pImgs = await db.select({ id: productImages.id, url: productImages.image_url, product_id: productImages.product_id }).from(productImages);
  for (const pi of pImgs) push(pi.url, { entity: 'Product Image', name: `Product #${pi.product_id}`, id: pi.id });

  // Categories
  const cats = await db.select({ id: categories.id, name: categories.name_en, hero: categories.hero_image_url, carousel: categories.carousel_images }).from(categories);
  for (const c of cats) {
    if (c.hero) push(c.hero, { entity: 'Category', name: c.name, id: c.id });
    if (Array.isArray(c.carousel)) for (const u of c.carousel) push(u, { entity: 'Category', name: c.name, id: c.id });
  }

  // Collections
  const colls = await db.select({ id: collections.id, name: collections.name_en, hero: collections.hero_image_url, carousel: collections.carousel_images }).from(collections);
  for (const c of colls) {
    if (c.hero) push(c.hero, { entity: 'Collection', name: c.name, id: c.id });
    if (Array.isArray(c.carousel)) for (const u of c.carousel) push(u, { entity: 'Collection', name: c.name, id: c.id });
  }

  // Banners
  const bnrs = await db.select({ id: banners.id, title: banners.title_en, url: banners.image_url, mobile: banners.image_url_mobile, images: banners.images }).from(banners);
  for (const b of bnrs) {
    const name = b.title || `Banner #${b.id}`;
    if (b.url) push(b.url, { entity: 'Banner', name, id: b.id });
    if (b.mobile) push(b.mobile, { entity: 'Banner', name, id: b.id });
    if (Array.isArray(b.images)) for (const u of b.images) push(u, { entity: 'Banner', name, id: b.id });
  }

  // Pages
  const pgs = await db.select({ id: pages.id, title: pages.title_en, hero: pages.hero_image_url, images: pages.images }).from(pages);
  for (const p of pgs) {
    if (p.hero) push(p.hero, { entity: 'Page', name: p.title, id: p.id });
    if (Array.isArray(p.images)) for (const u of p.images) push(u, { entity: 'Page', name: p.title, id: p.id });
  }

  // Testimonials
  const tests = await db.select({ id: testimonials.id, author: testimonials.author_name, url: testimonials.author_image_url }).from(testimonials);
  for (const t of tests) {
    if (t.url) push(t.url, { entity: 'Testimonial', name: t.author, id: t.id });
  }

  return usage;
}

export async function deleteMedia(id: number) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const parsed = z.number().int().positive().safeParse(id);
  if (!parsed.success) throw new Error('Invalid media ID');
  const asset = await db.query.mediaAssets.findFirst({
    where: eq(mediaAssets.id, parsed.data),
    columns: { url: true },
  });

  if (asset?.url) {
    try {
      await del(asset.url);
    } catch (e) {
      logger.warn('Failed to delete blob, removing DB record anyway', { url: asset.url, error: e });
    }
  }

  await db.delete(mediaAssets).where(eq(mediaAssets.id, parsed.data));

  logActivity({ action: 'deleted', entity_type: 'media', entity_id: id, entity_name: asset?.url ? asset.url.split('/').pop() ?? `Media #${id}` : `Media #${id}` }).catch(() => {});

  revalidatePath('/');
}

export async function updateMediaMetadata(id: number, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const raw = {
    alt_en: formData.get('alt_en') as string || undefined,
    alt_bn: formData.get('alt_bn') as string || undefined,
    tags:   formData.get('tags') as string || undefined,
  };

  const parsed = UpdateMediaSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.update(mediaAssets).set({
    alt_en: data.alt_en ?? null,
    alt_bn: data.alt_bn ?? null,
    tags: data.tags ?? null,
  }).where(eq(mediaAssets.id, id));

  logActivity({ action: 'updated', entity_type: 'media', entity_id: id, entity_name: `Media #${id}` }).catch(() => {});

  revalidatePath('/');
}

const isRemoteUrl = (url: string) => url.startsWith('https://') || url.startsWith('http://');
const addIfMissing = (map: Map<string, string>, existingUrls: Set<string>, url: string, fallback: string) => {
  if (url && isRemoteUrl(url) && !existingUrls.has(url)) map.set(url, url.split('/').pop() || fallback);
};

/** Backfill media_assets from all entity tables — finds blob URLs not yet tracked */
export async function syncMediaFromEntities(): Promise<{ added: number }> {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  // Cleanup: remove duplicate rows (keep lowest id) and local/relative path entries
  await db.execute(sql`
    DELETE FROM media_assets
    WHERE id NOT IN (SELECT MIN(id) FROM media_assets GROUP BY url)
       OR url NOT LIKE 'http%'
  `);

  // Get all URLs currently in media_assets
  const existing = await db.select({ url: mediaAssets.url }).from(mediaAssets);
  const existingUrls = new Set(existing.map(r => r.url));

  // Collect all remote blob URLs from all entities (skip local/relative paths)
  const allUrls = new Map<string, string>();

  const prods = await db.select({ url: products.image_url }).from(products);
  for (const p of prods) addIfMissing(allUrls, existingUrls, p.url, 'product-image');

  const pImgs = await db.select({ url: productImages.image_url }).from(productImages);
  for (const pi of pImgs) addIfMissing(allUrls, existingUrls, pi.url, 'product-image');

  const cats = await db.select({ hero: categories.hero_image_url, carousel: categories.carousel_images }).from(categories);
  for (const c of cats) {
    if (c.hero) addIfMissing(allUrls, existingUrls, c.hero, 'category-hero');
    if (Array.isArray(c.carousel)) for (const u of c.carousel) addIfMissing(allUrls, existingUrls, u, 'category-carousel');
  }

  const colls = await db.select({ hero: collections.hero_image_url, carousel: collections.carousel_images }).from(collections);
  for (const c of colls) {
    if (c.hero) addIfMissing(allUrls, existingUrls, c.hero, 'collection-hero');
    if (Array.isArray(c.carousel)) for (const u of c.carousel) addIfMissing(allUrls, existingUrls, u, 'collection-carousel');
  }

  const bnrs = await db.select({ url: banners.image_url, mobile: banners.image_url_mobile, images: banners.images }).from(banners);
  for (const b of bnrs) {
    if (b.url) addIfMissing(allUrls, existingUrls, b.url, 'banner');
    if (b.mobile) addIfMissing(allUrls, existingUrls, b.mobile, 'banner-mobile');
    if (Array.isArray(b.images)) for (const u of b.images) addIfMissing(allUrls, existingUrls, u, 'banner');
  }

  const pgs = await db.select({ hero: pages.hero_image_url, images: pages.images }).from(pages);
  for (const p of pgs) {
    if (p.hero) addIfMissing(allUrls, existingUrls, p.hero, 'page-hero');
    if (Array.isArray(p.images)) for (const u of p.images) addIfMissing(allUrls, existingUrls, u, 'page');
  }

  const tests = await db.select({ url: testimonials.author_image_url }).from(testimonials);
  for (const t of tests) if (t.url) addIfMissing(allUrls, existingUrls, t.url, 'testimonial');

  // Batch insert missing entries
  if (allUrls.size > 0) {
    const values = [...allUrls.entries()].map(([url, filename]) => ({
      url,
      filename,
      mime_type: url.endsWith('.webp') ? 'image/webp' : url.endsWith('.avif') ? 'image/avif' : null,
    }));

    for (let i = 0; i < values.length; i += 50) {
      await db.insert(mediaAssets).values(values.slice(i, i + 50));
    }
  }

  logger.info('Media sync complete', { added: allUrls.size });
  revalidatePath('/');
  return { added: allUrls.size };
}

/** Delete all media assets that are not referenced by any entity */
export async function deleteUnlinkedMedia(): Promise<{ deleted: number; freedBytes: number }> {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  // Build the set of all URLs referenced by entities
  const usageMap = await getMediaUsageMap();
  const linkedUrls = new Set(Object.keys(usageMap));

  // Find media_assets not in the linked set
  const allMedia = await db.select({ id: mediaAssets.id, url: mediaAssets.url, size_bytes: mediaAssets.size_bytes }).from(mediaAssets);
  const unlinked = allMedia.filter(m => !linkedUrls.has(m.url));

  if (unlinked.length === 0) return { deleted: 0, freedBytes: 0 };

  let freedBytes = 0;

  for (const m of unlinked) {
    // Delete blob
    try {
      await del(m.url);
    } catch (e) {
      logger.warn('Failed to delete unlinked blob, removing DB record anyway', { url: m.url, error: e });
    }
    // Delete DB record
    await db.delete(mediaAssets).where(eq(mediaAssets.id, m.id));
    freedBytes += m.size_bytes ?? 0;
  }

  logger.info('Unlinked media cleanup complete', { deleted: unlinked.length, freedBytes });
  logActivity({ action: 'deleted', entity_type: 'media', entity_id: 0, entity_name: `Cleaned up ${unlinked.length} unlinked media` }).catch(() => {});

  revalidatePath('/');
  return { deleted: unlinked.length, freedBytes };
}

// uploadImageToBlob is used via upload.ts, but let's record it in media_assets
export async function recordMediaAsset(data: {
  url: string;
  filename: string;
  mime_type?: string;
  size_bytes?: number;
}) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  await db.insert(mediaAssets).values({
    url:        data.url,
    filename:   data.filename,
    mime_type:  data.mime_type ?? null,
    size_bytes: data.size_bytes ?? null,
  });
  revalidatePath('/');
}
