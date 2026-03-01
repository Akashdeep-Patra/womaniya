import { setRequestLocale }    from 'next-intl/server';
import { getTranslations }     from 'next-intl/server';
import type { Metadata }       from 'next';

import { Header }              from '@/components/layout/Header';
import { Footer }              from '@/components/layout/Footer';
import { BottomNav }           from '@/components/layout/BottomNav';
import { HeroSection }         from '@/components/storefront/HeroSection';
import { HeritageTicker }      from '@/components/storefront/HeritageTicker';
import { FeaturesSection }     from '@/components/storefront/FeaturesSection';
import { CategoriesSection }   from '@/components/storefront/CategoriesSection';
import { ShopGrid }            from '@/components/storefront/ShopGrid';
import { AboutSection }        from '@/components/storefront/AboutSection';
import { WhatsAppSection }     from '@/components/storefront/WhatsAppSection';
import { getFeaturedProducts } from '@/actions/products';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title:       'Womaniya — Authentic Handloom Heritage',
    description: t('subtitle'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let featured: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  try {
    featured = await getFeaturedProducts();
  } catch {
    // DB not yet connected in dev
  }

  return (
    <>
      <Header />

      <main className="mb-bottom-nav md:mb-0">
        {/* 1. Hero — editorial full-screen */}
        <HeroSection />

        {/* 2. Heritage ticker — animated strip */}
        <HeritageTicker />

        {/* 3. Features — The Womaniya Way */}
        <FeaturesSection />

        {/* 4. Categories — visual editorial grid */}
        <CategoriesSection />

        {/* 5. Featured products (if any) */}
        {featured.length > 0 && (
          <div className="bg-bengal-cream">
            <ShopGrid products={featured} />
          </div>
        )}

        {/* 6. About / Story — rich editorial layout */}
        <AboutSection />

        {/* 7. WhatsApp CTA */}
        <WhatsAppSection />
      </main>

      <Footer />
      <BottomNav />
    </>
  );
}
