'use server';

import { revalidatePath } from 'next/cache';
import { db }             from '@/lib/db';
import { collections, collectionProducts }    from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { z }              from 'zod';

const CollectionSchema = z.object({
  name_en:            z.string().min(2).max(120),
  name_bn:            z.string().max(120).optional(),
  description_en:     z.string().max(2000).optional(),
  description_bn:     z.string().max(2000).optional(),
  hero_image_url:     z.string().url().optional().or(z.literal('')),
  seo_title_en:       z.string().max(120).optional(),
  seo_title_bn:       z.string().max(120).optional(),
  seo_description_en: z.string().max(300).optional(),
  seo_description_bn: z.string().max(300).optional(),
  status:             z.enum(['draft', 'scheduled', 'live', 'ended', 'archived']).default('draft'),
  is_featured:        z.boolean().default(false),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

export async function getAllCollections() {
  return db.query.collections.findMany({
    orderBy: (c, { desc }) => [desc(c.created_at)],
  });
}

export async function getPublishedCollections() {
  return db.query.collections.findMany({
    where: (c, { or, eq }) => or(eq(c.status, 'live'), eq(c.status, 'scheduled')),
    orderBy: (c, { desc }) => [desc(c.created_at)],
  });
}

export async function getFeaturedCollections() {
  return db.query.collections.findMany({
    where: (c, { and, or, eq }) => and(
      or(eq(c.status, 'live'), eq(c.status, 'scheduled')),
      eq(c.is_featured, true),
    ),
    orderBy: (c, { desc }) => [desc(c.created_at)],
  });
}

export async function getCollectionById(id: number) {
  return db.query.collections.findFirst({
    where: (c, { eq }) => eq(c.id, id),
    with: {
      productLinks: {
        orderBy: (pl, { asc }) => [asc(pl.sort_order)],
        with: {
          product: true,
        },
      },
    },
  });
}

export async function createCollection(formData: FormData) {
  const raw = {
    name_en:            formData.get('name_en') as string,
    name_bn:            (formData.get('name_bn') as string) || undefined,
    description_en:     (formData.get('description_en') as string) || undefined,
    description_bn:     (formData.get('description_bn') as string) || undefined,
    hero_image_url:     (formData.get('hero_image_url') as string) || undefined,
    seo_title_en:       (formData.get('seo_title_en') as string) || undefined,
    seo_title_bn:       (formData.get('seo_title_bn') as string) || undefined,
    seo_description_en: (formData.get('seo_description_en') as string) || undefined,
    seo_description_bn: (formData.get('seo_description_bn') as string) || undefined,
    status:             (formData.get('status') as string) || 'draft',
    is_featured:        formData.get('is_featured') === 'on' || formData.get('is_featured') === 'true',
  };

  const parsed = CollectionSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const slug = slugify(parsed.data.name_en);
  const data = parsed.data;

  const [collection] = await db.insert(collections).values({
    slug,
    name_en:            data.name_en,
    name_bn:            data.name_bn ?? null,
    description_en:     data.description_en ?? null,
    description_bn:     data.description_bn ?? null,
    hero_image_url:     data.hero_image_url || null,
    seo_title_en:       data.seo_title_en ?? null,
    seo_title_bn:       data.seo_title_bn ?? null,
    seo_description_en: data.seo_description_en ?? null,
    seo_description_bn: data.seo_description_bn ?? null,
    status:             data.status,
    is_featured:        data.is_featured,
  }).returning();

  const productIds = formData.getAll('product_ids') as string[];
  if (productIds.length > 0 && collection) {
    const colValues = productIds
      .map((id) => Number(id))
      .filter((id) => !isNaN(id))
      .map((prodId, idx) => ({
        collection_id: collection.id,
        product_id:    prodId,
        sort_order:    idx,
      }));

    if (colValues.length > 0) {
      await db.insert(collectionProducts).values(colValues);
    }
  }

  revalidatePath('/');
}

export async function updateCollection(id: number, formData: FormData) {
  const raw = {
    name_en:            formData.get('name_en') as string,
    name_bn:            (formData.get('name_bn') as string) || undefined,
    description_en:     (formData.get('description_en') as string) || undefined,
    description_bn:     (formData.get('description_bn') as string) || undefined,
    hero_image_url:     (formData.get('hero_image_url') as string) || undefined,
    seo_title_en:       (formData.get('seo_title_en') as string) || undefined,
    seo_title_bn:       (formData.get('seo_title_bn') as string) || undefined,
    seo_description_en: (formData.get('seo_description_en') as string) || undefined,
    seo_description_bn: (formData.get('seo_description_bn') as string) || undefined,
    status:             (formData.get('status') as string) || 'draft',
    is_featured:        formData.get('is_featured') === 'on' || formData.get('is_featured') === 'true',
  };

  const parsed = CollectionSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.update(collections).set({
    name_en:            data.name_en,
    name_bn:            data.name_bn ?? null,
    description_en:     data.description_en ?? null,
    description_bn:     data.description_bn ?? null,
    hero_image_url:     data.hero_image_url || null,
    seo_title_en:       data.seo_title_en ?? null,
    seo_title_bn:       data.seo_title_bn ?? null,
    seo_description_en: data.seo_description_en ?? null,
    seo_description_bn: data.seo_description_bn ?? null,
    status:             data.status,
    is_featured:        data.is_featured,
    updated_at:         new Date(),
  }).where(eq(collections.id, id));

  // Handle products assignment
  await db.delete(collectionProducts).where(eq(collectionProducts.collection_id, id));
  const productIds = formData.getAll('product_ids') as string[];
  if (productIds.length > 0) {
    const colValues = productIds
      .map((pid) => Number(pid))
      .filter((pid) => !isNaN(pid))
      .map((prodId, idx) => ({
        collection_id: id,
        product_id:    prodId,
        sort_order:    idx,
      }));

    if (colValues.length > 0) {
      await db.insert(collectionProducts).values(colValues);
    }
  }

  revalidatePath('/');
}

export async function deleteCollection(id: number) {
  await db.delete(collectionProducts).where(eq(collectionProducts.collection_id, id));
  await db.delete(collections).where(eq(collections.id, id));
  revalidatePath('/');
}
