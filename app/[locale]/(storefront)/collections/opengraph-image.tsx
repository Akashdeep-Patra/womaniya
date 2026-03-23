import { generateOgImage, OG_SIZE } from '@/lib/og-image';

export const alt = 'Collections — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function CollectionsOgImage() {
  return await generateOgImage({
    title: 'Our Collections',
    subtitle: 'Curated stories woven in thread',
    badge: 'Collections',
    variant: 'collection',
  });
}
