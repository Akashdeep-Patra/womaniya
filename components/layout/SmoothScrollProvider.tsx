'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const ReactLenis = dynamic(
  () => import('lenis/react').then((m) => ({ default: m.ReactLenis })),
  { ssr: false },
);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.includes('/admin');

  // Use a mounted state so SSR and first client render always agree (both false),
  // then after mount we check the real viewport — avoids hydration mismatch.
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Before mount: always render bare children so SSR HTML matches client first paint
  if (!mounted || isAdmin || !isDesktop) return <>{children}</>;

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
