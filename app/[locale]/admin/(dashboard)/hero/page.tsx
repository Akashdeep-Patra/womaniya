import { getHeroImages } from '@/actions/hero-images';
import { HeroImageManagerClient } from '@/components/admin/HeroImageManagerClient';
import type { Metadata } from 'next';
import type { HeroImage } from '@/db/schema';

export const metadata: Metadata = { title: 'Hero Images — Admin' };

export default async function HeroAdminPage() {
  const images = await getHeroImages().catch(() => [] as HeroImage[]);
  return <HeroImageManagerClient initialImages={images} />;
}
