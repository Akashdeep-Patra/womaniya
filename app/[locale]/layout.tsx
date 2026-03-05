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

import { CustomCursor } from '@/components/layout/CustomCursor';
import { NoiseOverlay } from '@/components/layout/NoiseOverlay';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

import '@/app/globals.css';

/* ── Google Fonts ─────────────────────────────────────────────── */
/* DM Serif Display — very thick, aesthetic, ancient heritage serif for English */
const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-playfair', // keep variable name mapping
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});
/* Jost — clean, elegant sans for English */
const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  display: 'swap',
});
/* Noto Serif Bengali — highly traditional, thick, heritage Bengali serif */
const notoSerifBn = Noto_Serif_Bengali({
  variable: '--font-noto-serif-bn',
  subsets: ['bengali'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});
/* Anek Bangla — clean but solid modern Bengali font */
const anekBn = Anek_Bangla({
  variable: '--font-anek-bn',
  subsets: ['bengali'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const fontVars = [
  dmSerifDisplay.variable,
  jost.variable,
  notoSerifBn.variable,
  anekBn.variable,
].join(' ');

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

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={fontVars}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <CustomCursor />
        <NoiseOverlay />
        <ScrollProgress />
        <Providers locale={locale} messages={messages} waNumber={waNumber}>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
        {process.env.NODE_ENV === 'development' && <VercelToolbar />}
      </body>
    </html>
  );
}
