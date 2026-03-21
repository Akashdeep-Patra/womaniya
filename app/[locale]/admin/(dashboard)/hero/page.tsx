import { getHeroImages } from '@/actions/hero-images';
import { HeroImageManagerClient } from '@/components/admin/HeroImageManagerClient';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Hero Images — Admin' };

export default async function HeroAdminPage() {
  const images = await getHeroImages();
  return <HeroImageManagerClient initialImages={images} />;
}
