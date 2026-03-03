'use client';

import { MagneticCursor } from '@/components/layout/MagneticCursor';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';

type Props = {
  locale:   string;
  messages: AbstractIntlMessages;
  children: React.ReactNode;
  waNumber?: string;
};

export function Providers({ locale, messages, children, waNumber }: Props) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Kolkata">
        <SmoothScrollProvider>
          <MagneticCursor />
          {children}
          <WhatsAppFloat waNumber={waNumber} />
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: 'bg-background text-foreground border-border font-sans rounded-2xl',
              },
            }}
          />
        </SmoothScrollProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
