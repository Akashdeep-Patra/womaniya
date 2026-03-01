import { setRequestLocale }    from 'next-intl/server';
import { getTranslations }     from 'next-intl/server';
import { HeroSection }         from '@/components/storefront/HeroSection';
import { ShopGrid }            from '@/components/storefront/ShopGrid';
import { Header }              from '@/components/layout/Header';
import { Footer }              from '@/components/layout/Footer';
import { BottomNav }           from '@/components/layout/BottomNav';
import { getFeaturedProducts } from '@/actions/products';
import type { Metadata }       from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });
  return {
    title:       'Womania — Authentic Bengali Handlooms',
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
    // DB not connected in dev — use empty array
  }

  return (
    <>
      <Header />
      <main>
        <HeroSection />

        {/* Featured products — shown on homepage */}
        {featured.length > 0 && (
          <ShopGrid products={featured} />
        )}

        {/* Our Story section */}
        <StorySection locale={locale} />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

async function StorySection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'story' });
  const isBn = locale === 'bn';

  return (
    <section id="story" className="bg-bengal-kajal text-bengal-kori py-16 md:py-24 mb-bottom-nav md:mb-0">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-bengal-kansa text-[10px] tracking-[0.3em] uppercase mb-4">
          {isBn ? 'আমাদের গল্প' : 'Our Story'}
        </p>
        <h2 className={`font-editorial text-4xl md:text-5xl mb-6 leading-tight ${isBn ? 'font-bengali-serif' : ''}`}>
          {t('title')}
        </h2>
        <p className={`text-bengal-kori/70 text-base md:text-lg leading-relaxed ${isBn ? 'font-bengali' : ''}`}>
          {t('body')}
        </p>
        {/* Decorative motif */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <div className="h-px flex-1 bg-bengal-kansa/30" />
          <span className="font-editorial text-bengal-kansa text-2xl">✦</span>
          <div className="h-px flex-1 bg-bengal-kansa/30" />
        </div>
      </div>
    </section>
  );
}
