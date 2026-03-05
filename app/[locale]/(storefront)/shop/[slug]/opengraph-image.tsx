import { generateOgImage, OG_SIZE } from '@/lib/og-image';
import { getProductBySlug } from '@/actions/products';

export const alt = 'Product — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function ProductOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    /* fallback */
  }

  if (!product) {
    return generateOgImage({ title: 'Product Not Found', variant: 'product' });
  }

  return generateOgImage({
    title: product.name_en,
    subtitle: product.description_en ?? undefined,
    badge: product.category ?? undefined,
    imageUrl: product.image_url,
    variant: 'product',
    price: `₹${Number(product.price).toLocaleString('en-IN')}`,
  });
}
