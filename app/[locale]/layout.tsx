import type { Metadata } from 'next';
import {
  DM_Serif_Display,
  Jost,
  Noto_Serif_Bengali,
  Anek_Bangla,
} from 'next/font/google';
import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers/Providers';
import { getSetting } from '@/actions/settings';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { VercelToolbar } from '@vercel/toolbar/next';
import { WebVitalsReporter } from '@/components/providers/WebVitalsReporter';
import { ClientOverlays } from '@/components/layout/ClientOverlays';

import '@/app/globals.css';

/* ── Google Fonts ─────────────────────────────────────────────── */
const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});
const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  display: 'swap',
});
const notoSerifBn = Noto_Serif_Bengali({
  variable: '--font-noto-serif-bn',
  subsets: ['bengali'],
  display: 'optional',
  weight: ['400', '500', '600', '700', '800'],
});
const anekBn = Anek_Bangla({
  variable: '--font-anek-bn',
  subsets: ['bengali'],
  display: 'optional',
  weight: ['300', '400', '500', '600', '700'],
});

const baseFontVars = [dmSerifDisplay.variable, jost.variable].join(' ');
const bnFontVars = [notoSerifBn.variable, anekBn.variable].join(' ');

/* ── Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://womaniya.in'),
  title: {
    template: '%s | Womaniya',
    default:  'Womaniya — Authentic Handloom Heritage',
  },
  description:
    'Discover exquisite handwoven sarees, blouses & more — Jamdani, Tant, Chanderi, Ikkat, Ajrakh — crafted by master artisans in Kolkata.',
  keywords: ['Womaniya', 'handloom', 'Jamdani saree', 'Tant saree', 'Chanderi blouse', 'Ikkat', 'Ajrakh', 'Kolkata fashion', 'handwoven saree'],
  openGraph: {
    siteName: 'Womaniya',
    type: 'website',
    title: 'Womaniya — Authentic Handloom Heritage',
    description: 'Discover exquisite handwoven sarees, blouses & more — Jamdani, Tant, Chanderi, Ikkat, Ajrakh — crafted by master artisans in Kolkata.',
    url: '/',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Womaniya — Authentic Handloom Heritage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@womaniya2019',
    title: 'Womaniya — Authentic Handloom Heritage',
    description: 'Discover exquisite handwoven sarees, blouses & more — Jamdani, Tant, Chanderi, Ikkat, Ajrakh — crafted by master artisans in Kolkata.',
    images: ['/twitter-image'],
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ── Layout ───────────────────────────────────────────────────── */
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  // Must be fetched server-side and passed to the client provider
  const messages = await getMessages();
  const waNumber = await getSetting('whatsapp_number', '919143161829');

  const fontVars = locale === 'bn' ? `${baseFontVars} ${bnFontVars}` : baseFontVars;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={fontVars}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
        <ClientOverlays />
        <Providers locale={locale} messages={messages} waNumber={waNumber}>
          {children}
        </Providers>
        <WebVitalsReporter />
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === 'development' && <VercelToolbar />}
      </body>
    </html>
  );
}
