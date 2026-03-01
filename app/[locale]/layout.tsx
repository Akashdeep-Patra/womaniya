import type { Metadata } from 'next';
import {
  Playfair_Display,
  Jost,
  Noto_Serif_Bengali,
  Anek_Bangla,
} from 'next/font/google';
import { notFound } from 'next/navigation';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers/Providers';
import '@/app/globals.css';

/* ── Google Fonts ─────────────────────────────────────────────── */
/* Playfair Display — highly elegant magazine/editorial serif */
const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});
/* Jost — modern, clean, elegant geometric sans */
const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});
/* Noto Serif Bengali — heritage Bengali display */
const notoSerifBn = Noto_Serif_Bengali({
  variable: '--font-noto-serif-bn',
  subsets: ['bengali'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});
/* Anek Bangla — bold, thick magazine-like Bengali sans for punchy body/subheads */
const anekBangla = Anek_Bangla({
  variable: '--font-anek-bn',
  subsets: ['bengali'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const fontVars = [
  playfair.variable,
  jost.variable,
  notoSerifBn.variable,
  anekBangla.variable,
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
