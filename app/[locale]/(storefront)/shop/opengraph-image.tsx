import { generateOgImage, OG_SIZE } from '@/lib/og-image';
import { getPublishedCategories } from '@/actions/categories';

export const alt = 'Shop — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function ShopOgImage() {
  const categories = await getPublishedCategories();
  const categoryLine = categories.length > 0
    ? categories.slice(0, 5).map(c => c.name_en).join(' · ')
    : 'Handwoven Heritage';

  return await generateOgImage({
    title: 'Shop Handlooms',
    subtitle: categoryLine,
    badge: 'Shop',
    variant: 'product',
  });
}
