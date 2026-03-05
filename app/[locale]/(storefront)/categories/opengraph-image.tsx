import { generateOgImage, OG_SIZE } from '@/lib/og-image';

export const alt = 'Categories — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function CategoriesOgImage() {
  return generateOgImage({
    title: 'The Living Crafts',
    subtitle: 'Traditional weaves & artisanal craftsmanship',
    badge: 'Categories',
    variant: 'category',
  });
}
