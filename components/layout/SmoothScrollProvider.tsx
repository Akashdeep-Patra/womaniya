'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useMediaQuery } from '@/lib/use-media-query';

const ReactLenis = dynamic(
  () => import('lenis/react').then((m) => ({ default: m.ReactLenis })),
  { ssr: false },
);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const isAdmin = pathname.includes('/admin');

  if (isAdmin || !isDesktop) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 0,
      }}
    >
      {children}
    </ReactLenis>
  );
}
