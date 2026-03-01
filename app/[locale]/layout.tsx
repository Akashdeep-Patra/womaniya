import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Source_Serif_4,
  Noto_Serif_Bengali,
  Hind_Siliguri,
} from 'next/font/google';
import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers/Providers';
import '@/app/globals.css';

/* ── Google Fonts ─────────────────────────────────────────────── */
/* Cormorant Garamond — bold heritage serif for editorial/display */
const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
});
/* Source Serif 4 — bold, readable body */
const sourceSerif = Source_Serif_4({
  variable: '--font-source-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700'],
});
/* Noto Serif Bengali — heritage Bengali display */
const notoSerifBn = Noto_Serif_Bengali({
  variable: '--font-noto-serif-bn',
  subsets: ['bengali'],
  display: 'swap',
  weight: ['500', '600', '700'],
});
/* Hind Siliguri — bold Bengali body */
const hindSiliguri = Hind_Siliguri({
  variable: '--font-hind-bn',
  subsets: ['bengali'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const fontVars = [
  cormorant.variable,
  sourceSerif.variable,
  notoSerifBn.variable,
  hindSiliguri.variable,
].join(' ');

/* ── Metadata ─────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    template: '%s | Womania',
    default:  'Womania — Authentic Bengali Handlooms',
  },
  description:
    'Discover exquisite handwoven Bengali sarees — Jamdani, Tant, Silk — crafted by master artisans.',
  keywords: ['Bengali handloom', 'Jamdani saree', 'Tant saree', 'Silk saree', 'Bengali saree online'],
  openGraph: {
    siteName: 'Womania',
    type: 'website',
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
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
