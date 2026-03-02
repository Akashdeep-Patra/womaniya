import { setRequestLocale }    from 'next-intl/server';
import { getTranslations }     from 'next-intl/server';
import type { Metadata }       from 'next';

import { Header }              from '@/components/layout/Header';
import { Footer }              from '@/components/layout/Footer';
import { BottomNav }           from '@/components/layout/BottomNav';
import { HeroSection }         from '@/components/storefront/HeroSection';
import { HeritageTicker }     from '@/components/storefront/HeritageTicker';
import { FeaturesSection }    from '@/components/storefront/FeaturesSection';
import { GlimpsesSection }    from '@/components/storefront/GlimpsesSection';
import { CategoriesSection }  from '@/components/storefront/CategoriesSection';
import { ShopGrid }           from '@/components/storefront/ShopGrid';
import { ProcessSection }     from '@/components/storefront/ProcessSection';
import { AboutSection }       from '@/components/storefront/AboutSection';
import { WhatsAppSection }    from '@/components/storefront/WhatsAppSection';
import { getFeaturedProducts } from '@/actions/products';
import { getPublishedCategories } from '@/actions/categories';

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
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Womaniya — Authentic Handloom Heritage',
      description: t('subtitle'),
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
  try {
    [featured, categories] = await Promise.all([
      getFeaturedProducts(),
      getPublishedCategories(),
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

      <main className="mb-bottom-nav md:mb-0">
        <HeroSection />
        <HeritageTicker categories={categories} />
        <FeaturesSection />
        <GlimpsesSection />
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
