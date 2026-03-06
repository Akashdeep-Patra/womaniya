'use server';
import { auth } from '@/auth';

import { revalidatePath } from 'next/cache';
import { db }             from '@/lib/db';
import { testimonials }   from '@/db/schema';
import { eq, asc }        from 'drizzle-orm';
import { z }              from 'zod';
import { TESTIMONIAL_SOURCES, TESTIMONIAL_STATUSES } from '@/db/enums';
import { logActivity } from './activity-log';

const TestimonialSchema = z.object({
  quote_en:         z.string().min(1, 'Quote (EN) is required').max(1000),
  quote_bn:         z.string().max(1000).optional().or(z.literal('')),
  author_name:      z.string().min(1, 'Author name is required').max(120),
  author_title:     z.string().max(200).optional().or(z.literal('')),
  author_image_url: z.string().url().optional().or(z.literal('')),
  source:           z.enum([...TESTIMONIAL_SOURCES]).default('anecdotal'),
  source_url:       z.string().url().optional().or(z.literal('')),
  rating:           z.coerce.number().min(1).max(5).optional(),
  sort_order:       z.coerce.number().default(0),
  status:           z.enum([...TESTIMONIAL_STATUSES]).default('published'),
});

export async function getAllTestimonials() {
  return db.query.testimonials.findMany({
    orderBy: (t, { asc }) => [asc(t.sort_order)],
  });
}

export async function getPublishedTestimonials() {
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.status, 'published'))
    .orderBy(asc(testimonials.sort_order));
}

export async function getTestimonialById(id: number) {
  return db.query.testimonials.findFirst({
    where: (t, { eq }) => eq(t.id, id),
  });
}

export async function createTestimonial(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const raw = {
    quote_en:         formData.get('quote_en'),
    quote_bn:         formData.get('quote_bn') || undefined,
    author_name:      formData.get('author_name'),
    author_title:     formData.get('author_title') || undefined,
    author_image_url: formData.get('author_image_url') || undefined,
    source:           formData.get('source') || 'anecdotal',
    source_url:       formData.get('source_url') || undefined,
    rating:           formData.get('rating') || undefined,
    sort_order:       formData.get('sort_order') || 0,
    status:           formData.get('status') || 'published',
  };

  const parsed = TestimonialSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.insert(testimonials).values({
    quote_en:         data.quote_en,
    quote_bn:         data.quote_bn || null,
    author_name:      data.author_name,
    author_title:     data.author_title || null,
    author_image_url: data.author_image_url || null,
    source:           data.source,
    source_url:       data.source_url || null,
    rating:           data.rating ?? null,
    sort_order:       data.sort_order,
    status:           data.status,
  });

  try { await logActivity({ action: 'created', entity_type: 'testimonial', entity_name: data.author_name }); } catch {}

  revalidatePath('/');
}

export async function updateTestimonial(id: number, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const raw = {
    quote_en:         formData.get('quote_en'),
    quote_bn:         formData.get('quote_bn') || undefined,
    author_name:      formData.get('author_name'),
    author_title:     formData.get('author_title') || undefined,
    author_image_url: formData.get('author_image_url') || undefined,
    source:           formData.get('source') || 'anecdotal',
    source_url:       formData.get('source_url') || undefined,
    rating:           formData.get('rating') || undefined,
    sort_order:       formData.get('sort_order') || 0,
    status:           formData.get('status') || 'published',
  };

  const parsed = TestimonialSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  await db.update(testimonials).set({
    quote_en:         data.quote_en,
    quote_bn:         data.quote_bn || null,
    author_name:      data.author_name,
    author_title:     data.author_title || null,
    author_image_url: data.author_image_url || null,
    source:           data.source,
    source_url:       data.source_url || null,
    rating:           data.rating ?? null,
    sort_order:       data.sort_order,
    status:           data.status,
    updated_at:       new Date(),
  }).where(eq(testimonials.id, id));

  try { await logActivity({ action: 'updated', entity_type: 'testimonial', entity_id: id, entity_name: data.author_name }); } catch {}

  revalidatePath('/');
}

export async function deleteTestimonial(id: number) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  await db.delete(testimonials).where(eq(testimonials.id, id));

  try { await logActivity({ action: 'deleted', entity_type: 'testimonial', entity_id: id, entity_name: `Testimonial #${id}` }); } catch {}

  revalidatePath('/');
}
