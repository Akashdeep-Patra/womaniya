'use server';

import { revalidatePath } from 'next/cache';
import { db }             from '@/lib/db';
import { pages, pageSections } from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { z }              from 'zod';

const PageSchema = z.object({
  title_en:           z.string().min(2).max(120),
  title_bn:           z.string().max(120).optional(),
  page_type:          z.enum(['static', 'story', 'landing']).default('static'),
  hero_image_url:     z.string().url().optional().or(z.literal('')),
  status:             z.enum(['draft', 'published', 'archived']).default('draft'),
  seo_title_en:       z.string().max(120).optional(),
  seo_title_bn:       z.string().max(120).optional(),
  seo_description_en: z.string().max(300).optional(),
  seo_description_bn: z.string().max(300).optional(),
});

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');
}

export async function getAllPages() {
  return db.query.pages.findMany({
    orderBy: (p, { desc }) => [desc(p.created_at)],
  });
}

export async function getPageById(id: number) {
  return db.query.pages.findFirst({
    where: (p, { eq }) => eq(p.id, id),
    with: {
      sections: {
        orderBy: (s, { asc }) => [asc(s.sort_order)],
      },
    },
  });
}

export async function createPage(formData: FormData, sectionsJson: string) {
  const raw = {
    title_en:           formData.get('title_en') as string,
    title_bn:           (formData.get('title_bn') as string) || undefined,
    page_type:          (formData.get('page_type') as string) || 'static',
    hero_image_url:     (formData.get('hero_image_url') as string) || undefined,
    status:             (formData.get('status') as string) || 'draft',
    seo_title_en:       (formData.get('seo_title_en') as string) || undefined,
    seo_title_bn:       (formData.get('seo_title_bn') as string) || undefined,
    seo_description_en: (formData.get('seo_description_en') as string) || undefined,
    seo_description_bn: (formData.get('seo_description_bn') as string) || undefined,
  };

  const parsed = PageSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const slug = slugify(parsed.data.title_en);
  const data = parsed.data;

  const [page] = await db.insert(pages).values({
    slug,
    title_en:           data.title_en,
    title_bn:           data.title_bn ?? null,
    page_type:          data.page_type,
    hero_image_url:     data.hero_image_url || null,
    seo_title_en:       data.seo_title_en ?? null,
    seo_title_bn:       data.seo_title_bn ?? null,
    seo_description_en: data.seo_description_en ?? null,
    seo_description_bn: data.seo_description_bn ?? null,
    status:             data.status,
    published_at:       data.status === 'published' ? new Date() : null,
  }).returning();

  if (sectionsJson && page) {
    const sections = JSON.parse(sectionsJson);
    if (sections.length > 0) {
      const sectionValues = sections.map((s: { type: string; content: unknown }, idx: number) => ({
        page_id:      page.id,
        section_type: s.type,
        content_json: s.content,
        sort_order:   idx,
      }));
      await db.insert(pageSections).values(sectionValues);
    }
  }

  revalidatePath('/');
}

export async function updatePage(id: number, formData: FormData, sectionsJson: string) {
  const raw = {
    title_en:           formData.get('title_en') as string,
    title_bn:           (formData.get('title_bn') as string) || undefined,
    page_type:          (formData.get('page_type') as string) || 'static',
    hero_image_url:     (formData.get('hero_image_url') as string) || undefined,
    status:             (formData.get('status') as string) || 'draft',
    seo_title_en:       (formData.get('seo_title_en') as string) || undefined,
    seo_title_bn:       (formData.get('seo_title_bn') as string) || undefined,
    seo_description_en: (formData.get('seo_description_en') as string) || undefined,
    seo_description_bn: (formData.get('seo_description_bn') as string) || undefined,
  };

  const parsed = PageSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.update(pages).set({
    title_en:           data.title_en,
    title_bn:           data.title_bn ?? null,
    page_type:          data.page_type,
    hero_image_url:     data.hero_image_url || null,
    seo_title_en:       data.seo_title_en ?? null,
    seo_title_bn:       data.seo_title_bn ?? null,
    seo_description_en: data.seo_description_en ?? null,
    seo_description_bn: data.seo_description_bn ?? null,
    status:             data.status,
    updated_at:         new Date(),
  }).where(eq(pages.id, id));

  await db.delete(pageSections).where(eq(pageSections.page_id, id));

  if (sectionsJson) {
    const sections = JSON.parse(sectionsJson);
    if (sections.length > 0) {
      const sectionValues = sections.map((s: { type: string; content: unknown }, idx: number) => ({
        page_id:      id,
        section_type: s.type,
        content_json: s.content,
        sort_order:   idx,
      }));
      await db.insert(pageSections).values(sectionValues);
    }
  }

  revalidatePath('/');
}

export async function deletePage(id: number) {
  await db.delete(pageSections).where(eq(pageSections.page_id, id));
  await db.delete(pages).where(eq(pages.id, id));
  revalidatePath('/');
}
