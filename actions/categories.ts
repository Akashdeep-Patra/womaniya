'use server';
import { auth } from '@/auth';

import { revalidatePath } from 'next/cache';
import { db }             from '@/lib/db';
import { categories }     from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { z }              from 'zod';
import { CATEGORY_STATUSES } from '@/db/enums';
import { logger } from '@/lib/logger';
import { logActivity } from '@/lib/activity-logger';

const CategorySchema = z.object({
  name_en:            z.string().min(2).max(120),
  name_bn:            z.string().max(120).optional(),
  description_en:     z.string().max(2000).optional(),
  description_bn:     z.string().max(2000).optional(),
  carousel_images:    z.array(z.string().url()).default([]),
  seo_title_en:       z.string().max(120).optional(),
  seo_title_bn:       z.string().max(120).optional(),
  seo_description_en: z.string().max(300).optional(),
  seo_description_bn: z.string().max(300).optional(),
  status:             z.enum([...CATEGORY_STATUSES]).default('draft'),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

export async function getAllCategories() {
  try {
    const res = await db.query.categories.findMany({
      orderBy: (c, { asc }) => [asc(c.sort_order), asc(c.name_en)],
    });
    return res || [];
  } catch (e) {
    logger.error('Failed to get all categories', { error: e });
    return [];
  }
}

export async function getPublishedCategories() {
  try {
    const res = await db.query.categories.findMany({
      where: (c, { eq }) => eq(c.status, 'published'),
      orderBy: (c, { asc }) => [asc(c.sort_order), asc(c.name_en)],
    });
    return res || [];
  } catch (e) {
    logger.error('Failed to get published categories', { error: e });
    return [];
  }
}

export async function getCategoryBySlug(slug: string) {
  return db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
  });
}

export async function getCategoryById(id: number) {
  return db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.id, id),
  });
}

export async function createCategory(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const carouselRaw = formData.getAll('carousel_images') as string[];
  const raw = {
    name_en:            formData.get('name_en') as string,
    name_bn:            (formData.get('name_bn') as string) || undefined,
    description_en:     (formData.get('description_en') as string) || undefined,
    description_bn:     (formData.get('description_bn') as string) || undefined,
    carousel_images:    carouselRaw.filter(Boolean),
    seo_title_en:       (formData.get('seo_title_en') as string) || undefined,
    seo_title_bn:       (formData.get('seo_title_bn') as string) || undefined,
    seo_description_en: (formData.get('seo_description_en') as string) || undefined,
    seo_description_bn: (formData.get('seo_description_bn') as string) || undefined,
    status:             (formData.get('status') as string) || 'draft',
  };

  const parsed = CategorySchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const slug = slugify(parsed.data.name_en);
  const data = parsed.data;

  await db.insert(categories).values({
    slug,
    name_en:            data.name_en,
    name_bn:            data.name_bn ?? null,
    description_en:     data.description_en ?? null,
    description_bn:     data.description_bn ?? null,
    hero_image_url:     data.carousel_images[0] ?? null,
    carousel_images:    data.carousel_images,
    seo_title_en:       data.seo_title_en ?? null,
    seo_title_bn:       data.seo_title_bn ?? null,
    seo_description_en: data.seo_description_en ?? null,
    seo_description_bn: data.seo_description_bn ?? null,
    status:             data.status,
  });

  logActivity({ action: 'created', entity_type: 'category', entity_name: data.name_en }).catch(() => {});

  revalidatePath('/');
}

export async function updateCategory(id: number, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const carouselRaw = formData.getAll('carousel_images') as string[];
  const raw = {
    name_en:            formData.get('name_en') as string,
    name_bn:            (formData.get('name_bn') as string) || undefined,
    description_en:     (formData.get('description_en') as string) || undefined,
    description_bn:     (formData.get('description_bn') as string) || undefined,
    carousel_images:    carouselRaw.filter(Boolean),
    seo_title_en:       (formData.get('seo_title_en') as string) || undefined,
    seo_title_bn:       (formData.get('seo_title_bn') as string) || undefined,
    seo_description_en: (formData.get('seo_description_en') as string) || undefined,
    seo_description_bn: (formData.get('seo_description_bn') as string) || undefined,
    status:             (formData.get('status') as string) || 'draft',
  };

  const parsed = CategorySchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.update(categories).set({
    name_en:            data.name_en,
    name_bn:            data.name_bn ?? null,
    description_en:     data.description_en ?? null,
    description_bn:     data.description_bn ?? null,
    hero_image_url:     data.carousel_images[0] ?? null,
    carousel_images:    data.carousel_images,
    seo_title_en:       data.seo_title_en ?? null,
    seo_title_bn:       data.seo_title_bn ?? null,
    seo_description_en: data.seo_description_en ?? null,
    seo_description_bn: data.seo_description_bn ?? null,
    status:             data.status,
    updated_at:         new Date(),
  }).where(eq(categories.id, id));

  logActivity({ action: 'updated', entity_type: 'category', entity_id: id, entity_name: data.name_en }).catch(() => {});

  revalidatePath('/');
}

export async function deleteCategory(id: number) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const parsed = z.number().int().positive().safeParse(id);
  if (!parsed.success) throw new Error('Invalid category ID');
  await db.delete(categories).where(eq(categories.id, parsed.data));

  logActivity({ action: 'deleted', entity_type: 'category', entity_id: id, entity_name: `Category #${id}` }).catch(() => {});

  revalidatePath('/');
}

export async function reorderCategories(orderedIds: number[]) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const parsed = z.array(z.number().int().positive()).max(200).safeParse(orderedIds);
  if (!parsed.success) throw new Error('Invalid category IDs');

  for (let i = 0; i < parsed.data.length; i++) {
    await db.update(categories)
      .set({ sort_order: i })
      .where(eq(categories.id, parsed.data[i]));
  }
  revalidatePath('/');
}
