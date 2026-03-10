import { generateOgImage, OG_SIZE } from '@/lib/og-image';
import { db } from '@/lib/db';

export const alt = 'Campaign — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function CampaignOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;

  let campaign;
  try {
    campaign = await db.query.campaigns.findFirst({
      where: (c, { eq }) => eq(c.slug, slug),
      with: { banners: true },
    });
  } catch {
    /* fallback */
  }

  if (!campaign) {
    return generateOgImage({ title: 'Campaign', variant: 'default' });
  }

  let coverImage: string | undefined;
  if (campaign.banners && campaign.banners.length > 0) {
    const banner = campaign.banners[0];
    const bannerImages = (banner.images as string[] | null) ?? [];
    coverImage = bannerImages[0] || banner.image_url || undefined;
  }

  return generateOgImage({
    title: campaign.name_en,
    subtitle: campaign.description_en ?? undefined,
    badge: campaign.status === 'live' ? 'Live Campaign' : 'Campaign',
    imageUrl: coverImage,
    variant: 'default',
  });
}
