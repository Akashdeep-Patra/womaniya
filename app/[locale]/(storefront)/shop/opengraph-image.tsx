import { generateOgImage, OG_SIZE } from '@/lib/og-image';

export const alt = 'Shop — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function ShopOgImage() {
  return generateOgImage({
    title: 'Shop Handlooms',
    subtitle: 'Jamdani · Tant · Chanderi · Ikkat · Ajrakh',
    badge: 'Shop',
    variant: 'product',
  });
}
