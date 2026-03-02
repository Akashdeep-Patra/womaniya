import type { Metadata } from 'next';
import {
  Yeseva_One,
  Outfit,
  Baloo_Da_2,
  Hind_Siliguri,
} from 'next/font/google';
import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers/Providers';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { CustomCursor } from '@/components/layout/CustomCursor';
import { NoiseOverlay } from '@/components/layout/NoiseOverlay';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

import '@/app/globals.css';

/* ── Google Fonts ─────────────────────────────────────────────── */
/* Yeseva One — very thick, rounded, feminine, modern serif */
const yesevaOne = Yeseva_One({
  variable: '--font-playfair', // keep variable name mapping so we don't need to change tailwind and globals
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
});
/* Outfit — clean, thick, slightly rounded geometric sans */
const outfit = Outfit({
  variable: '--font-jost',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});
/* Baloo Da 2 — thick, extremely rounded, modern Bengali font */
const balooDa2 = Baloo_Da_2({
  variable: '--font-noto-serif-bn',
  subsets: ['bengali'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});
/* Hind Siliguri — clean, modern Bengali sans */
const hindSiliguri = Hind_Siliguri({
  variable: '--font-anek-bn',
  subsets: ['bengali'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

/* Cinzel Decorative — ancient English vibe */
const cinzelDecorative = Cinzel_Decorative({
  variable: '--font-cinzel',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700', '900'],
  preload: false,
});

const fontVars = [
  yesevaOne.variable,
  outfit.variable,
  balooDa2.variable,
  hindSiliguri.variable,
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

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={fontVars}
    >
      <body className="min-h-screen bg-bengal-kori text-bengal-kajal antialiased">
        <CustomCursor />
        <NoiseOverlay />
        <ScrollProgress />
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
