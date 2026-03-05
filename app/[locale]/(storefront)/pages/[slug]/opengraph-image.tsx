import { generateOgImage, OG_SIZE } from '@/lib/og-image';
import { db } from '@/lib/db';

export const alt = 'Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function PageOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  const page = await db.query.pages.findFirst({
    where: (p, { eq }) => eq(p.slug, slug),
  });

  if (!page) {
    return generateOgImage({ title: 'Womaniya' });
  }

  const coverImage =
    ((page.images as string[] | null) ?? [])[0] || page.hero_image_url || undefined;

  return generateOgImage({
    title: page.title_en,
    subtitle: page.seo_description_en ?? undefined,
    imageUrl: coverImage,
  });
}
