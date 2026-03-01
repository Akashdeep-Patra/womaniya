'use client';

import { NextIntlClientProvider } from 'next-intl';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { MagneticCursor } from '@/components/layout/MagneticCursor';
import { Toaster } from '@/components/ui/sonner';

type Props = {
  locale: string;
  children: React.ReactNode;
};

export function Providers({ locale, children }: Props) {
  return (
    <NextIntlClientProvider locale={locale}>
      <SmoothScrollProvider>
        <MagneticCursor />
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#F9F6F0',
              color: '#1A1918',
              border: '1px solid rgba(197,160,89,0.4)',
              fontFamily: 'var(--font-outfit)',
            },
          }}
        />
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
