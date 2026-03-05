import { generateOgImage, OG_SIZE } from '@/lib/og-image';
import { db } from '@/lib/db';

export const alt = 'Category — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function CategoryOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const category = await db.query.categories.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
  });

  if (!category) {
    return generateOgImage({ title: 'Category', variant: 'category' });
  }

  const images = (category.carousel_images as string[] | null) ?? [];

  return generateOgImage({
    title: category.name_en,
    subtitle: category.description_en ?? undefined,
    badge: 'Category',
    imageUrl: images[0] ?? undefined,
    variant: 'category',
  });
}
