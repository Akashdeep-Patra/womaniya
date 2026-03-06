'use server';
import { auth } from '@/auth';

import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { db }             from '@/lib/db';
import { pages, pageSections } from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { z }              from 'zod';
import { PAGE_STATUSES, PAGE_TYPES } from '@/db/enums';
import { logActivity } from '@/lib/activity-logger';

const PageSchema = z.object({
  title_en:           z.string().min(2).max(120),
  title_bn:           z.string().max(120).optional(),
  page_type:          z.enum([...PAGE_TYPES]).default('static'),
  images:             z.array(z.string().url()).default([]),
  status:             z.enum([...PAGE_STATUSES]).default('draft'),
  seo_title_en:       z.string().max(120).optional(),
  seo_title_bn:       z.string().max(120).optional(),
  seo_description_en: z.string().max(300).optional(),
  seo_description_bn: z.string().max(300).optional(),
});

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-');
}

const _getAllPages = unstable_cache(
  async (page_type?: string) => {
    return db.query.pages.findMany({
      where: page_type ? (p, { eq }) => eq(p.page_type, page_type as 'static' | 'story' | 'landing') : undefined,
      orderBy: (p, { desc }) => [desc(p.created_at)],
    });
  },
  ['all-pages'],
  { revalidate: 60, tags: ['pages'] },
);

export async function getAllPages(page_type?: 'static' | 'story' | 'landing') {
  return _getAllPages(page_type);
}

export async function getNonStoryPages() {
  return db.query.pages.findMany({
    where: (p, { ne }) => ne(p.page_type, 'story'),
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
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const imagesRaw = formData.getAll('images') as string[];
  const raw = {
    title_en:           formData.get('title_en') as string,
    title_bn:           (formData.get('title_bn') as string) || undefined,
    page_type:          (formData.get('page_type') as string) || 'static',
    images:             imagesRaw.filter(Boolean),
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
    images:             data.images,
    hero_image_url:     data.images[0] ?? null,
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

  logActivity({ action: 'created', entity_type: 'page', entity_id: page?.id, entity_name: data.title_en }).catch(() => {});

  revalidateTag('pages');
  revalidatePath('/');
}

export async function updatePage(id: number, formData: FormData, sectionsJson: string) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const imagesRaw = formData.getAll('images') as string[];
  const raw = {
    title_en:           formData.get('title_en') as string,
    title_bn:           (formData.get('title_bn') as string) || undefined,
    page_type:          (formData.get('page_type') as string) || 'static',
    images:             imagesRaw.filter(Boolean),
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
    images:             data.images,
    hero_image_url:     data.images[0] ?? null,
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

  logActivity({ action: 'updated', entity_type: 'page', entity_id: id, entity_name: data.title_en }).catch(() => {});

  revalidateTag('pages');
  revalidatePath('/');
}

export async function deletePage(id: number) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const parsed = z.number().int().positive().safeParse(id);
  if (!parsed.success) throw new Error('Invalid page ID');
  await db.delete(pageSections).where(eq(pageSections.page_id, parsed.data));
  await db.delete(pages).where(eq(pages.id, parsed.data));

  logActivity({ action: 'deleted', entity_type: 'page', entity_id: id, entity_name: `Page #${id}` }).catch(() => {});

  revalidateTag('pages');
  revalidatePath('/');
}
