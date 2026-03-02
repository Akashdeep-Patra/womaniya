import { setRequestLocale }    from 'next-intl/server';
import { getTranslations }     from 'next-intl/server';
import type { Metadata }       from 'next';
import dynamic from 'next/dynamic';

import { Header }              from '@/components/layout/Header';
import { Footer }              from '@/components/layout/Footer';
import { BottomNav }           from '@/components/layout/BottomNav';
import { HeroSection }         from '@/components/storefront/HeroSection';
import { getFeaturedProducts } from '@/actions/products';
import { getPublishedCategories } from '@/actions/categories';
import { getFeaturedCollections } from '@/actions/collections';

/* Below-fold sections: dynamic import to reduce initial JS and improve LCP */
const HeritageTicker = dynamic(
  () => import('@/components/storefront/HeritageTicker').then((m) => ({ default: m.HeritageTicker })),
  { ssr: true }
);

const FeaturesSection = dynamic(
  () => import('@/components/storefront/FeaturesSection').then((m) => ({ default: m.FeaturesSection })),
  { ssr: true }
);

const ManifestoSection = dynamic(
  () => import('@/components/storefront/ManifestoSection').then((m) => ({ default: m.ManifestoSection })),
  { ssr: true }
);

const FeaturedCollectionsSection = dynamic(
  () => import('@/components/storefront/FeaturedCollectionsSection').then((m) => ({ default: m.FeaturedCollectionsSection })),
  { ssr: true }
);

const GlimpsesSection = dynamic(
  () => import('@/components/storefront/GlimpsesSection').then((m) => ({ default: m.GlimpsesSection })),
  { ssr: true }
);

const ArtisanVoicesSection = dynamic(
  () => import('@/components/storefront/ArtisanVoicesSection').then((m) => ({ default: m.ArtisanVoicesSection })),
  { ssr: true }
);

const CategoriesSection = dynamic(
  () => import('@/components/storefront/CategoriesSection').then((m) => ({ default: m.CategoriesSection })),
  { ssr: true }
);

const ShopGrid = dynamic(
  () => import('@/components/storefront/ShopGrid').then((m) => ({ default: m.ShopGrid })),
  { ssr: true }
);

const ProcessSection = dynamic(
  () => import('@/components/storefront/ProcessSection').then((m) => ({ default: m.ProcessSection })),
  { ssr: true }
);

const AboutSection = dynamic(
  () => import('@/components/storefront/AboutSection').then((m) => ({ default: m.AboutSection })),
  { ssr: true }
);

const WhatsAppSection = dynamic(
  () => import('@/components/storefront/WhatsAppSection').then((m) => ({ default: m.WhatsAppSection })),
  { ssr: true }
);

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title:       'Womaniya — Authentic Handloom Heritage',
    description: t('subtitle'),
    openGraph: {
      title: 'Womaniya — Authentic Handloom Heritage',
      description: t('subtitle'),
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
      title: 'Womaniya — Authentic Handloom Heritage',
      description: t('subtitle'),
      images: ['/twitter-image'],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: { en: '/en', bn: '/bn' },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let featured: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  let categories: Awaited<ReturnType<typeof getPublishedCategories>> = [];
  let collections: Awaited<ReturnType<typeof getFeaturedCollections>> = [];
  try {
    [featured, categories, collections] = await Promise.all([
      getFeaturedProducts(),
      getPublishedCategories(),
      getFeaturedCollections(),
    ]);
  } catch {
    // DB not yet connected in dev
  }

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Womaniya',
    url: 'https://womaniya.in',
    logo: 'https://womaniya.in/logo.png',
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Womaniya',
    url: 'https://womaniya.in',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://womaniya.in/shop?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      <Header />

      <main className="min-h-screen">
        <HeroSection />
        <HeritageTicker categories={categories} />
        
        <ManifestoSection />
        
        <FeaturesSection />
        <FeaturedCollectionsSection collections={collections} />
        
        <GlimpsesSection />
        <ArtisanVoicesSection />
        <CategoriesSection categories={categories} />

        {featured.length > 0 && (
          <div className="bg-bengal-cream">
            <ShopGrid products={featured} categories={categories} />
          </div>
        )}

        <ProcessSection />
        <AboutSection />
        <WhatsAppSection />
      </main>

      <Footer />
      <BottomNav categories={categories} />
    </>
  );
}
