'use server';

import { revalidatePath } from 'next/cache';
import { db }             from '@/lib/db';
import { products }       from '@/db/schema';
import { eq }             from 'drizzle-orm';
import { uploadImageToBlob } from './upload';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

export async function createProduct(formData: FormData) {
  const name_en   = formData.get('name_en')   as string;
  const name_bn   = formData.get('name_bn')   as string | null;
  const price     = formData.get('price')     as string;
  const category  = formData.get('category')  as string;
  const desc_en   = formData.get('description_en') as string | null;
  const desc_bn   = formData.get('description_bn') as string | null;
  const featured  = formData.get('is_featured') === 'on';
  const imageFile = formData.get('image') as File | null;

  if (!name_en || !price || !category) {
    throw new Error('Name, price, and category are required');
  }

  // Upload image
  let image_url = '/placeholder-saree.svg';
  if (imageFile && imageFile.size > 0) {
    const imgForm = new FormData();
    imgForm.set('file', imageFile);
    image_url = await uploadImageToBlob(imgForm);
  }

  // Generate unique slug
  const baseSlug = slugify(name_en);
  const slug     = `${baseSlug}-${Date.now()}`;

  await db.insert(products).values({
    slug,
    name_en,
    name_bn:        name_bn   || null,
    description_en: desc_en   || null,
    description_bn: desc_bn   || null,
    price:          price,
    category,
    image_url,
    is_featured:    featured,
  });

  revalidatePath('/');
  revalidatePath('/en/shop');
  revalidatePath('/bn/shop');
}

export async function deleteProduct(id: number) {
  await db.delete(products).where(eq(products.id, id));

  revalidatePath('/');
  revalidatePath('/en/shop');
  revalidatePath('/bn/shop');
  revalidatePath('/en/admin/products');
  revalidatePath('/bn/admin/products');
}

export async function getFeaturedProducts() {
  return db.query.products.findMany({
    where: (p, { eq }) => eq(p.is_featured, true),
    orderBy: (p, { desc }) => [desc(p.created_at)],
    limit: 6,
  });
}

export async function getAllProducts(category?: string) {
  if (category && category !== 'All') {
    return db.query.products.findMany({
      where: (p, { eq }) => eq(p.category, category),
      orderBy: (p, { desc }) => [desc(p.created_at)],
    });
  }
  return db.query.products.findMany({
    orderBy: (p, { desc }) => [desc(p.created_at)],
  });
}

export async function getProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
  });
}
