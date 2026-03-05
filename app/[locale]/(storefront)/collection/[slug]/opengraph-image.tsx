import { generateOgImage, OG_SIZE } from '@/lib/og-image';
import { db } from '@/lib/db';

export const alt = 'Collection — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function CollectionOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const collection = await db.query.collections.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
  });

  if (!collection) {
    return generateOgImage({ title: 'Collection', variant: 'collection' });
  }

  const images = (collection.carousel_images as string[] | null) ?? [];

  return generateOgImage({
    title: collection.name_en,
    subtitle: collection.description_en ?? undefined,
    badge: 'Collection',
    imageUrl: images[0] ?? undefined,
    variant: 'collection',
  });
}
