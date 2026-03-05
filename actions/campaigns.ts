'use server';

import { revalidatePath } from 'next/cache';
import { db }             from '@/lib/db';
import { campaigns }      from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { z }              from 'zod';
import { CAMPAIGN_STATUSES } from '@/db/enums';

const CampaignSchema = z.object({
  name_en:              z.string().min(2).max(120),
  name_bn:              z.string().max(120).optional(),
  description_en:       z.string().max(2000).optional(),
  description_bn:       z.string().max(2000).optional(),
  starts_at:            z.string().optional(), // Expected format YYYY-MM-DDTHH:mm
  ends_at:              z.string().optional(),
  status:               z.enum([...CAMPAIGN_STATUSES]).default('draft'),
  announcement_text_en: z.string().max(300).optional(),
  announcement_text_bn: z.string().max(300).optional(),
  cta_url:              z.string().optional(),
});

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');
}

export async function getAllCampaigns() {
  return db.query.campaigns.findMany({
    orderBy: (c, { desc }) => [desc(c.created_at)],
  });
}

export async function getCampaignById(id: number) {
  return db.query.campaigns.findFirst({
    where: (c, { eq }) => eq(c.id, id),
    with: {
      banners: true,
    },
  });
}

export async function createCampaign(formData: FormData) {
  const raw = {
    name_en:              formData.get('name_en') as string,
    name_bn:              (formData.get('name_bn') as string) || undefined,
    description_en:       (formData.get('description_en') as string) || undefined,
    description_bn:       (formData.get('description_bn') as string) || undefined,
    starts_at:            (formData.get('starts_at') as string) || undefined,
    ends_at:              (formData.get('ends_at') as string) || undefined,
    status:               (formData.get('status') as string) || 'draft',
    announcement_text_en: (formData.get('announcement_text_en') as string) || undefined,
    announcement_text_bn: (formData.get('announcement_text_bn') as string) || undefined,
    cta_url:              (formData.get('cta_url') as string) || undefined,
  };

  const parsed = CampaignSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const slug = slugify(parsed.data.name_en);
  const data = parsed.data;

  await db.insert(campaigns).values({
    slug,
    name_en:              data.name_en,
    name_bn:              data.name_bn ?? null,
    description_en:       data.description_en ?? null,
    description_bn:       data.description_bn ?? null,
    starts_at:            data.starts_at ? new Date(data.starts_at) : null,
    ends_at:              data.ends_at ? new Date(data.ends_at) : null,
    status:               data.status,
    announcement_text_en: data.announcement_text_en ?? null,
    announcement_text_bn: data.announcement_text_bn ?? null,
    cta_url:              data.cta_url ?? null,
  });

  revalidatePath('/');
}

export async function updateCampaign(id: number, formData: FormData) {
  const raw = {
    name_en:              formData.get('name_en') as string,
    name_bn:              (formData.get('name_bn') as string) || undefined,
    description_en:       (formData.get('description_en') as string) || undefined,
    description_bn:       (formData.get('description_bn') as string) || undefined,
    starts_at:            (formData.get('starts_at') as string) || undefined,
    ends_at:              (formData.get('ends_at') as string) || undefined,
    status:               (formData.get('status') as string) || 'draft',
    announcement_text_en: (formData.get('announcement_text_en') as string) || undefined,
    announcement_text_bn: (formData.get('announcement_text_bn') as string) || undefined,
    cta_url:              (formData.get('cta_url') as string) || undefined,
  };

  const parsed = CampaignSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.update(campaigns).set({
    name_en:              data.name_en,
    name_bn:              data.name_bn ?? null,
    description_en:       data.description_en ?? null,
    description_bn:       data.description_bn ?? null,
    starts_at:            data.starts_at ? new Date(data.starts_at) : null,
    ends_at:              data.ends_at ? new Date(data.ends_at) : null,
    status:               data.status,
    announcement_text_en: data.announcement_text_en ?? null,
    announcement_text_bn: data.announcement_text_bn ?? null,
    cta_url:              data.cta_url ?? null,
    updated_at:           new Date(),
  }).where(eq(campaigns.id, id));

  revalidatePath('/');
}

export async function deleteCampaign(id: number) {
  await db.delete(campaigns).where(eq(campaigns.id, id));
  revalidatePath('/');
}
