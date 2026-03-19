import { generateOgImage, OG_SIZE } from '@/lib/og-image';
import { getSetting } from '@/actions/settings';

export const alt = 'Womaniya — Handwoven Heritage';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function TwitterImage() {
  const subtitle = await getSetting('seo_og_subtitle') || 'Handwoven Heritage';

  return generateOgImage({
    title: 'WOMANIYA',
    subtitle,
  });
}
