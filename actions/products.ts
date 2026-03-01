'use server';

import { revalidatePath } from 'next/cache';
import { db }             from '@/lib/db';
import { products }       from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { z }              from 'zod';
import { uploadImageToBlob } from './upload';

/* ── Validation Schemas ─────────────────────────────────────────── */
const CATEGORIES = ['Jamdani', 'Silk', 'Tant', 'Ready to Wear'] as const;

const CreateProductSchema = z.object({
  name_en:        z.string().min(2, 'Name must be at least 2 characters').max(120),
  name_bn:        z.string().max(120).optional(),
  price:          z.coerce.number().positive('Price must be greater than 0').max(999999),
  category:       z.enum(CATEGORIES, { message: 'Invalid category' }),
  description_en: z.string().max(1000).optional(),
  description_bn: z.string().max(1000).optional(),
  is_featured:    z.boolean().optional().default(false),
});

/* ── Helpers ────────────────────────────────────────────────────── */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

/* ── Actions ────────────────────────────────────────────────────── */
export async function createProduct(formData: FormData) {
  // Parse + validate with Zod
  const raw = {
    name_en:        formData.get('name_en'),
    name_bn:        formData.get('name_bn') || undefined,
    price:          formData.get('price'),
    category:       formData.get('category'),
    description_en: formData.get('description_en') || undefined,
    description_bn: formData.get('description_bn') || undefined,
    is_featured:    formData.get('is_featured') === 'on',
  };

  const parsed = CreateProductSchema.safeParse(raw);

  if (!parsed.success) {
    const messages = parsed.error.issues.map((i) => i.message).join(', ');
    throw new Error(messages);
  }

  const data = parsed.data;

  // Use pre-uploaded URL from client-side CameraUpload, or upload now
  const preUploaded = formData.get('image_uploaded_url') as string | null;
  const imageFile   = formData.get('image') as File | null;
  let image_url     = '/placeholder-saree.svg';

  if (preUploaded && preUploaded.startsWith('https://')) {
    image_url = preUploaded;
  } else if (imageFile && imageFile.size > 0) {
    const imgForm = new FormData();
    imgForm.set('file', imageFile);
    image_url = await uploadImageToBlob(imgForm);
  }

  const slug = `${slugify(data.name_en)}-${Date.now()}`;

  await db.insert(products).values({
    slug,
    name_en:        data.name_en,
    name_bn:        data.name_bn        ?? null,
    description_en: data.description_en ?? null,
    description_bn: data.description_bn ?? null,
    price:          String(data.price),
    category:       data.category,
    image_url,
    is_featured:    data.is_featured,
  });

  revalidatePath('/');
  revalidatePath('/en/shop');
  revalidatePath('/bn/shop');
}

export async function deleteProduct(id: number) {
  const parsed = z.number().int().positive().safeParse(id);
  if (!parsed.success) throw new Error('Invalid product ID');

  await db.delete(products).where(eq(products.id, parsed.data));

  revalidatePath('/');
  revalidatePath('/en/shop');
  revalidatePath('/bn/shop');
  revalidatePath('/en/admin/products');
  revalidatePath('/bn/admin/products');
}

export async function getFeaturedProducts() {
  return db.query.products.findMany({
    where:   (p, { eq }) => eq(p.is_featured, true),
    orderBy: (p, { desc }) => [desc(p.created_at)],
    limit:   6,
  });
}

export async function getAllProducts(category?: string) {
  if (category && category !== 'All') {
    return db.query.products.findMany({
      where:   (p, { eq }) => eq(p.category, category),
      orderBy: (p, { desc }) => [desc(p.created_at)],
    });
  }
  return db.query.products.findMany({
    orderBy: (p, { desc }) => [desc(p.created_at)],
  });
}

export async function getProductBySlug(slug: string) {
  const parsed = z.string().min(1).safeParse(slug);
  if (!parsed.success) return null;

  return db.query.products.findFirst({
    where: (p, { eq }) => eq(p.slug, parsed.data),
  });
}
