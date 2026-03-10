import { generateOgImage, OG_SIZE } from '@/lib/og-image';
import { db } from '@/lib/db';

export const alt = 'Story — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function StoryOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  let page;
  try {
    page = await db.query.pages.findFirst({
      where: (p, { eq }) => eq(p.slug, slug),
    });
  } catch {
    /* fallback */
  }

  if (!page) {
    return generateOgImage({ title: 'Story', variant: 'story' });
  }

  const coverImage =
    ((page.images as string[] | null) ?? [])[0] || page.hero_image_url || undefined;

  return generateOgImage({
    title: page.title_en,
    subtitle: page.seo_description_en ?? undefined,
    badge: 'Story',
    imageUrl: coverImage,
    variant: 'story',
  });
}
