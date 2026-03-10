'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

const CustomCursor = dynamic(
  () => import('@/components/layout/CustomCursor').then((mod) => mod.CustomCursor),
  { ssr: false },
);
const NoiseOverlay = dynamic(
  () => import('@/components/layout/NoiseOverlay').then((mod) => mod.NoiseOverlay),
  { ssr: false },
);
const ScrollProgress = dynamic(
  () => import('@/components/layout/ScrollProgress').then((mod) => mod.ScrollProgress),
  { ssr: false },
);

export function ClientOverlays() {
  const pathname = usePathname();
  const isAdmin = pathname?.includes('/admin');

  // Skip all decorative overlays on admin pages
  if (isAdmin) return null;

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <ScrollProgress />
    </>
  );
}
