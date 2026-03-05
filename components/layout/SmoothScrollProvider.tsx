'use client';

import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  if (isAdmin) return <>{children}</>;

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