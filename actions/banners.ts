'use server';

import { revalidatePath } from 'next/cache';
import { db }             from '@/lib/db';
import { banners }        from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { z }              from 'zod';
import { BANNER_STATUSES, BANNER_PLACEMENTS } from '@/db/enums';

const BannerSchema = z.object({
  campaign_id:      z.coerce.number().optional(),
  collection_id:    z.coerce.number().optional(),
  category_id:      z.coerce.number().optional(),
  placement:        z.enum([...BANNER_PLACEMENTS]),
  images:           z.array(z.string().url()).min(1, 'At least one image is required'),
  title_en:         z.string().max(120).optional(),
  title_bn:         z.string().max(120).optional(),
  subtitle_en:      z.string().max(200).optional(),
  subtitle_bn:      z.string().max(200).optional(),
  cta_text_en:      z.string().max(50).optional(),
  cta_text_bn:      z.string().max(50).optional(),
  cta_url:          z.string().optional(),
  sort_order:       z.coerce.number().default(0),
  status:           z.enum([...BANNER_STATUSES]).default('draft'),
  starts_at:        z.string().optional(),
  ends_at:          z.string().optional(),
});

export async function getAllBanners() {
  return db.query.banners.findMany({
    orderBy: (b, { asc }) => [asc(b.sort_order)],
  });
}

export async function getBannerById(id: number) {
  return db.query.banners.findFirst({
    where: (b, { eq }) => eq(b.id, id),
  });
}

export async function createBanner(formData: FormData) {
  const imagesRaw = formData.getAll('images') as string[];
  const raw = {
    campaign_id:      formData.get('campaign_id') || undefined,
    collection_id:    formData.get('collection_id') || undefined,
    category_id:      formData.get('category_id') || undefined,
    placement:        formData.get('placement'),
    images:           imagesRaw.filter(Boolean),
    title_en:         formData.get('title_en') || undefined,
    title_bn:         formData.get('title_bn') || undefined,
    subtitle_en:      formData.get('subtitle_en') || undefined,
    subtitle_bn:      formData.get('subtitle_bn') || undefined,
    cta_text_en:      formData.get('cta_text_en') || undefined,
    cta_text_bn:      formData.get('cta_text_bn') || undefined,
    cta_url:          formData.get('cta_url') || undefined,
    sort_order:       formData.get('sort_order') || 0,
    status:           formData.get('status') || 'draft',
    starts_at:        formData.get('starts_at') || undefined,
    ends_at:          formData.get('ends_at') || undefined,
  };

  const parsed = BannerSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.insert(banners).values({
    campaign_id:      data.campaign_id ?? null,
    collection_id:    data.collection_id ?? null,
    category_id:      data.category_id ?? null,
    placement:        data.placement,
    images:           data.images,
    image_url:        data.images[0] ?? '',
    image_url_mobile: data.images[1] ?? null,
    title_en:         data.title_en ?? null,
    title_bn:         data.title_bn ?? null,
    subtitle_en:      data.subtitle_en ?? null,
    subtitle_bn:      data.subtitle_bn ?? null,
    cta_text_en:      data.cta_text_en ?? null,
    cta_text_bn:      data.cta_text_bn ?? null,
    cta_url:          data.cta_url ?? null,
    sort_order:       data.sort_order,
    status:           data.status,
    starts_at:        data.starts_at ? new Date(data.starts_at) : null,
    ends_at:          data.ends_at ? new Date(data.ends_at) : null,
  });

  revalidatePath('/');
}

export async function updateBanner(id: number, formData: FormData) {
  const imagesRaw = formData.getAll('images') as string[];
  const raw = {
    campaign_id:      formData.get('campaign_id') || undefined,
    collection_id:    formData.get('collection_id') || undefined,
    category_id:      formData.get('category_id') || undefined,
    placement:        formData.get('placement'),
    images:           imagesRaw.filter(Boolean),
    title_en:         formData.get('title_en') || undefined,
    title_bn:         formData.get('title_bn') || undefined,
    subtitle_en:      formData.get('subtitle_en') || undefined,
    subtitle_bn:      formData.get('subtitle_bn') || undefined,
    cta_text_en:      formData.get('cta_text_en') || undefined,
    cta_text_bn:      formData.get('cta_text_bn') || undefined,
    cta_url:          formData.get('cta_url') || undefined,
    sort_order:       formData.get('sort_order') || 0,
    status:           formData.get('status') || 'draft',
    starts_at:        formData.get('starts_at') || undefined,
    ends_at:          formData.get('ends_at') || undefined,
  };

  const parsed = BannerSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.update(banners).set({
    campaign_id:      data.campaign_id ?? null,
    collection_id:    data.collection_id ?? null,
    category_id:      data.category_id ?? null,
    placement:        data.placement,
    images:           data.images,
    image_url:        data.images[0] ?? '',
    image_url_mobile: data.images[1] ?? null,
    title_en:         data.title_en ?? null,
    title_bn:         data.title_bn ?? null,
    subtitle_en:      data.subtitle_en ?? null,
    subtitle_bn:      data.subtitle_bn ?? null,
    cta_text_en:      data.cta_text_en ?? null,
    cta_text_bn:      data.cta_text_bn ?? null,
    cta_url:          data.cta_url ?? null,
    sort_order:       data.sort_order,
    status:           data.status,
    starts_at:        data.starts_at ? new Date(data.starts_at) : null,
    ends_at:          data.ends_at ? new Date(data.ends_at) : null,
  }).where(eq(banners.id, id));

  revalidatePath('/');
}

export async function deleteBanner(id: number) {
  await db.delete(banners).where(eq(banners.id, id));
  revalidatePath('/');
}
