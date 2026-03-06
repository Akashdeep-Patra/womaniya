'use server';
import { auth } from '@/auth';

import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache';
import { db }             from '@/lib/db';
import { products, productImages, collectionProducts } from '@/db/schema';
import { eq, desc, and, inArray } from 'drizzle-orm';
import { z }              from 'zod';
import { PRODUCT_STATUSES, STOCK_STATUSES } from '@/db/enums';
import { uploadImageToBlob } from './upload';
import { logActivity } from '@/lib/activity-logger';

const ProductSchema = z.object({
  name_en:            z.string().min(2).max(120),
  name_bn:            z.string().max(120).optional(),
  price:              z.coerce.number().positive().max(999999),
  category:           z.string().min(1),
  category_id:        z.coerce.number().int().optional(),
  description_en:     z.string().max(5000).optional(),
  description_bn:     z.string().max(5000).optional(),
  is_featured:        z.boolean().optional().default(false),
  status:             z.enum([...PRODUCT_STATUSES]).default('draft'),
  seo_title_en:       z.string().max(120).optional(),
  seo_description_en: z.string().max(300).optional(),
  sizes:              z.array(z.string()).default([]),
  colors:             z.array(z.string()).default([]),
  fabric:             z.string().optional(),
  weight:             z.string().optional(),
  care_instructions:  z.string().optional(),
  origin:             z.string().optional(),
  sku:                z.string().optional(),
  stock_status:       z.enum([...STOCK_STATUSES]).default('in_stock'),
  delivery_info:      z.string().optional(),
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-');
}

function revalidateAll() {
  revalidateTag('products');
  revalidatePath('/');
  revalidatePath('/en/shop');
  revalidatePath('/bn/shop');
  revalidatePath('/en/admin/products');
  revalidatePath('/bn/admin/products');
}

export async function createProduct(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const raw = {
    name_en:            formData.get('name_en'),
    name_bn:            formData.get('name_bn') || undefined,
    price:              formData.get('price'),
    category:           formData.get('category'),
    category_id:        formData.get('category_id') ? Number(formData.get('category_id')) : undefined,
    description_en:     formData.get('description_en') || undefined,
    description_bn:     formData.get('description_bn') || undefined,
    is_featured:        formData.get('is_featured') === 'on' || formData.get('is_featured') === 'true',
    status:             (formData.get('status') as string) || 'draft',
    seo_title_en:       formData.get('seo_title_en') || undefined,
    seo_description_en: formData.get('seo_description_en') || undefined,
    sizes:              formData.getAll('sizes'),
    colors:             formData.getAll('colors'),
    fabric:             formData.get('fabric') || undefined,
    weight:             formData.get('weight') || undefined,
    care_instructions:  formData.get('care_instructions') || undefined,
    origin:             formData.get('origin') || undefined,
    sku:                formData.get('sku') || undefined,
    stock_status:       formData.get('stock_status') || 'in_stock',
    delivery_info:      formData.get('delivery_info') || undefined,
  };

  const parsed = ProductSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

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

  const [product] = await db.insert(products).values({
    slug,
    name_en:            data.name_en,
    name_bn:            data.name_bn ?? null,
    description_en:     data.description_en ?? null,
    description_bn:     data.description_bn ?? null,
    price:              String(data.price),
    category:           data.category,
    category_id:        data.category_id ?? null,
    image_url,
    is_featured:        data.is_featured,
    status:             data.status,
    seo_title_en:       data.seo_title_en ?? null,
    seo_description_en: data.seo_description_en ?? null,
    sizes:              data.sizes,
    colors:             data.colors,
    fabric:             data.fabric ?? null,
    weight:             data.weight ?? null,
    care_instructions:  data.care_instructions ?? null,
    origin:             data.origin ?? null,
    sku:                data.sku ?? null,
    stock_status:       data.stock_status,
    delivery_info:      data.delivery_info ?? null,
  }).returning();

  // Handle additional images
  const additionalImages = formData.getAll('additional_images') as string[];
  if (additionalImages.length > 0 && product) {
    const imageValues = additionalImages
      .filter((url) => url.startsWith('https://'))
      .map((url, idx) => ({
        product_id: product.id,
        image_url:  url,
        sort_order: idx + 1,
        is_primary: false,
      }));

    if (imageValues.length > 0) {
      await db.insert(productImages).values(imageValues);
    }
  }

  // Handle collection assignments
  const collectionIds = formData.getAll('collection_ids') as string[];
  if (collectionIds.length > 0 && product) {
    const colValues = collectionIds
      .map((id) => Number(id))
      .filter((id) => !isNaN(id))
      .map((colId, idx) => ({
        collection_id: colId,
        product_id:    product.id,
        sort_order:    idx,
      }));

    if (colValues.length > 0) {
      await db.insert(collectionProducts).values(colValues);
    }
  }

  logActivity({ action: 'created', entity_type: 'product', entity_id: product?.id, entity_name: data.name_en }).catch(() => {});

  revalidateAll();
}

export async function updateProduct(id: number, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const raw = {
    name_en:            formData.get('name_en'),
    name_bn:            formData.get('name_bn') || undefined,
    price:              formData.get('price'),
    category:           formData.get('category'),
    category_id:        formData.get('category_id') ? Number(formData.get('category_id')) : undefined,
    description_en:     formData.get('description_en') || undefined,
    description_bn:     formData.get('description_bn') || undefined,
    is_featured:        formData.get('is_featured') === 'on' || formData.get('is_featured') === 'true',
    status:             (formData.get('status') as string) || 'draft',
    seo_title_en:       formData.get('seo_title_en') || undefined,
    seo_description_en: formData.get('seo_description_en') || undefined,
    sizes:              formData.getAll('sizes'),
    colors:             formData.getAll('colors'),
    fabric:             formData.get('fabric') || undefined,
    weight:             formData.get('weight') || undefined,
    care_instructions:  formData.get('care_instructions') || undefined,
    origin:             formData.get('origin') || undefined,
    sku:                formData.get('sku') || undefined,
    stock_status:       formData.get('stock_status') || 'in_stock',
    delivery_info:      formData.get('delivery_info') || undefined,
  };

  const parsed = ProductSchema.safeParse(raw);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '));
  }

  const data = parsed.data;

  const preUploaded = formData.get('image_uploaded_url') as string | null;
  const updateData: Record<string, unknown> = {
    name_en:            data.name_en,
    name_bn:            data.name_bn ?? null,
    description_en:     data.description_en ?? null,
    description_bn:     data.description_bn ?? null,
    price:              String(data.price),
    category:           data.category,
    category_id:        data.category_id ?? null,
    is_featured:        data.is_featured,
    status:             data.status,
    seo_title_en:       data.seo_title_en ?? null,
    seo_description_en: data.seo_description_en ?? null,
    sizes:              data.sizes,
    colors:             data.colors,
    fabric:             data.fabric ?? null,
    weight:             data.weight ?? null,
    care_instructions:  data.care_instructions ?? null,
    origin:             data.origin ?? null,
    sku:                data.sku ?? null,
    stock_status:       data.stock_status,
    delivery_info:      data.delivery_info ?? null,
    updated_at:         new Date(),
  };

  if (preUploaded && preUploaded.startsWith('https://')) {
    updateData.image_url = preUploaded;
  }

  await db.update(products).set(updateData).where(eq(products.id, id));

  // Handle additional images (Replace all)
  await db.delete(productImages).where(eq(productImages.product_id, id));
  const additionalImages = formData.getAll('additional_images') as string[];
  if (additionalImages.length > 0) {
    const imageValues = additionalImages
      .filter((url) => url.startsWith('https://'))
      .map((url, idx) => ({
        product_id: id,
        image_url:  url,
        sort_order: idx + 1,
        is_primary: false,
      }));

    if (imageValues.length > 0) {
      await db.insert(productImages).values(imageValues);
    }
  }

  // Handle collection assignments (Replace all)
  await db.delete(collectionProducts).where(eq(collectionProducts.product_id, id));
  const collectionIds = formData.getAll('collection_ids') as string[];
  if (collectionIds.length > 0) {
    const colValues = collectionIds
      .map((cid) => Number(cid))
      .filter((cid) => !isNaN(cid))
      .map((colId, idx) => ({
        collection_id: colId,
        product_id:    id,
        sort_order:    idx,
      }));

    if (colValues.length > 0) {
      await db.insert(collectionProducts).values(colValues);
    }
  }

  logActivity({ action: 'updated', entity_type: 'product', entity_id: id, entity_name: data.name_en }).catch(() => {});

  revalidateAll();
}

export async function deleteProduct(id: number) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');
  const parsed = z.number().int().positive().safeParse(id);
  if (!parsed.success) throw new Error('Invalid product ID');

  await db.delete(productImages).where(eq(productImages.product_id, parsed.data));
  await db.delete(collectionProducts).where(eq(collectionProducts.product_id, parsed.data));
  await db.delete(products).where(eq(products.id, parsed.data));

  logActivity({ action: 'deleted', entity_type: 'product', entity_id: parsed.data, entity_name: `Product #${parsed.data}` }).catch(() => {});

  revalidateAll();
}

const _getFeaturedProducts = unstable_cache(
  async () => {
    return db.query.products.findMany({
      where:   (p, { and, eq }) => and(eq(p.is_featured, true), eq(p.status, 'published')),
      orderBy: (p, { desc }) => [desc(p.created_at)],
      limit:   6,
    });
  },
  ['featured-products'],
  { revalidate: 60, tags: ['products'] },
);

export async function getFeaturedProducts() {
  return _getFeaturedProducts();
}

export async function getPublishedProducts(category?: string) {
  if (category && category !== 'All') {
    return db.query.products.findMany({
      where:   (p, { and, eq }) => and(eq(p.category, category), eq(p.status, 'published')),
      orderBy: (p, { desc }) => [desc(p.created_at)],
    });
  }
  return db.query.products.findMany({
    where:   (p, { eq }) => eq(p.status, 'published'),
    orderBy: (p, { desc }) => [desc(p.created_at)],
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

export async function getProductById(id: number) {
  return db.query.products.findFirst({
    where: (p, { eq }) => eq(p.id, id),
    with: {
      collectionLinks: true,
    },
  });
}

export async function getProductBySlug(slug: string) {
  const parsed = z.string().min(1).safeParse(slug);
  if (!parsed.success) return null;

  return db.query.products.findFirst({
    where: (p, { eq }) => eq(p.slug, parsed.data),
  });
}

export async function getProductImages(productId: number) {
  return db.query.productImages.findMany({
    where: (pi, { eq }) => eq(pi.product_id, productId),
    orderBy: (pi, { asc }) => [asc(pi.sort_order)],
  });
}
