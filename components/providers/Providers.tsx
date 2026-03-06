'use client';

import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import type { AbstractIntlMessages } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { WhatsAppProvider } from '@/lib/whatsapp-context';

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
        <WhatsAppProvider>
        <SmoothScrollProvider>
          {children}
          <WhatsAppFloat waNumber={waNumber} />
          <Toaster />
        </SmoothScrollProvider>
        </WhatsAppProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
}
