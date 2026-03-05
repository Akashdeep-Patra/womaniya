import { generateOgImage, OG_SIZE } from '@/lib/og-image';

export const alt = 'Campaigns — Womaniya';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function CampaignsOgImage() {
  return generateOgImage({
    title: 'Our Campaigns',
    subtitle: 'Special events & featured showcases',
    badge: 'Campaigns',
  });
}
