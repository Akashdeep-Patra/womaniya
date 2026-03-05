import { generateOgImage, OG_SIZE } from '@/lib/og-image';

export const alt = 'About — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function AboutOgImage() {
  return generateOgImage({
    title: 'About Womaniya',
    subtitle: 'Preserving the living heritage of Bengal',
    badge: 'Our Story',
  });
}
