'use client';

import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider }    from 'next-intl';
import { SmoothScrollProvider }      from '@/components/layout/SmoothScrollProvider';
import { MagneticCursor }            from '@/components/layout/MagneticCursor';
import { WhatsAppFloat }             from '@/components/layout/WhatsAppFloat';
import { Toaster }                   from '@/components/ui/sonner';

type Props = {
  locale:   string;
  messages: AbstractIntlMessages;
  children: React.ReactNode;
};

export function Providers({ locale, messages, children }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SmoothScrollProvider>
        <MagneticCursor />
        {children}
        <WhatsAppFloat />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background:  '#F9F6F0',
              color:       '#1A1918',
              border:      '1px solid rgba(197,160,89,0.4)',
              fontFamily:  'var(--font-outfit)',
              borderRadius: '16px',
            },
          }}
        />
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  );
}
