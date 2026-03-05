import { generateOgImage, OG_SIZE } from '@/lib/og-image';

export const alt = 'Womaniya — Authentic Bengali Handlooms';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function TwitterImage() {
  return generateOgImage({
    title: 'WOMANIYA',
    subtitle: 'Authentic Bengali Handlooms',
  });
}
