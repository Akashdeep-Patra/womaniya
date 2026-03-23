import { generateOgImage, OG_SIZE } from '@/lib/og-image';

export const alt = 'Stories — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function StoriesOgImage() {
  return await generateOgImage({
    title: 'Our Stories',
    subtitle: 'Heritage, artisans & narratives woven into every thread',
    badge: 'Stories',
    variant: 'story',
  });
}
