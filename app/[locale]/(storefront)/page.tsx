import { setRequestLocale }    from 'next-intl/server';
import { getTranslations }     from 'next-intl/server';
import type { Metadata }       from 'next';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(
  () => import('@/components/storefront/HeroSection').then((m) => ({ default: m.HeroSection })),
  {
    ssr: true,
    loading: () => (
      <section className="relative w-full bg-background overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10" />
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-6 md:px-8 lg:px-[6%] xl:px-[8%]">
          <div className="flex flex-col lg:flex-row lg:items-center min-h-svh pt-[140px] sm:pt-[160px] lg:pt-[140px] pb-12 lg:pb-0 gap-8 lg:gap-0">
            <div className="w-full lg:w-[42%] flex flex-col justify-center lg:pr-6 order-2 lg:order-1 mt-4 lg:mt-0 animate-pulse">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-8 md:w-12 h-px bg-primary/20" />
                <div className="h-3 w-32 bg-primary/10 rounded" />
              </div>
              <div className="mb-6 md:mb-10 flex flex-col gap-2">
                <div className="h-12 sm:h-16 lg:h-20 w-[70%] bg-muted rounded-lg" />
                <div className="h-14 sm:h-20 lg:h-24 w-[85%] bg-primary/8 rounded-lg ml-4 sm:ml-8 lg:ml-14" />
                <div className="h-10 sm:h-14 lg:h-16 w-[60%] bg-muted rounded-lg" />
              </div>
              <div className="flex items-start gap-4 mb-8 md:mb-10 pl-2 lg:pl-4">
                <div className="w-0.5 h-12 bg-primary/10 shrink-0 mt-1" />
                <div className="flex flex-col gap-2 w-full max-w-[320px]">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-[80%] bg-muted rounded" />
                </div>
              </div>
              <div className="flex items-center gap-4 pl-2 lg:pl-4">
                <div className="h-12 md:h-14 w-44 bg-foreground/10 rounded-full" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            </div>
            <div className="w-full lg:hidden relative z-10 order-1 pt-6 pb-2">
              <div className="relative w-full max-w-[420px] mx-auto aspect-4/5 p-2">
                <div className="absolute bottom-2 left-2 w-[65%] h-[75%] rounded-4xl bg-muted border-[6px] border-background z-20 animate-pulse" />
                <div className="absolute top-2 right-2 w-[50%] h-[60%] rounded-3xl bg-muted/70 border-[6px] border-background z-10 animate-pulse" />
              </div>
            </div>
            <div className="hidden lg:block w-[58%] relative z-10 order-2 pt-12 pb-16 pl-12 pr-6 animate-pulse">
              <div className="relative w-full h-[600px] max-h-[80vh]">
                <div className="absolute left-0 top-[5%] w-[38%] h-[55%] rounded-3xl bg-muted" />
                <div className="absolute left-[30%] top-0 w-[40%] h-[65%] rounded-3xl bg-muted/80 z-10" />
                <div className="absolute right-0 top-[10%] w-[32%] h-[50%] rounded-3xl bg-muted/60 z-20" />
              </div>
            </div>
          </div>
        </div>
      </section>
    ),
  }
);
import { getFeaturedProducts } from '@/actions/products';
import { getPublishedCategories } from '@/actions/categories';
import { getFeaturedCollections } from '@/actions/collections';
import { getSetting } from '@/actions/settings';
import { getPublishedTestimonials } from '@/actions/testimonials';
import { getAllBanners } from '@/actions/banners';
import { BannerDisplay } from '@/components/storefront/BannerDisplay';
import { AlponaDivider }       from '@/components/illustrations/AlponaDivider';

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
          width: 600,
          height: 315,
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
  const isBn = locale === 'bn';

  let featured: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  let categories: Awaited<ReturnType<typeof getPublishedCategories>> = [];
  let collections: Awaited<ReturnType<typeof getFeaturedCollections>> = [];
  let testimonials: Awaited<ReturnType<typeof getPublishedTestimonials>> = [];
  let banners: Awaited<ReturnType<typeof getAllBanners>> = [];
  let waNumber = '919143161829';
  try {
    [featured, categories, collections, testimonials, banners, waNumber] = await Promise.all([
      getFeaturedProducts(),
      getPublishedCategories(),
      getFeaturedCollections(),
      getPublishedTestimonials(),
      getAllBanners(),
      getSetting('whatsapp_number', '919143161829'),
    ]);
  } catch {
    // DB not yet connected in dev
  }

  const heroBanners = banners.filter(b => b.placement === 'hero' && b.status === 'published');

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://womaniyakolkata.in';

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Womaniya',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    sameAs: [
      'https://www.instagram.com/womaniya2019/',
      'https://www.facebook.com/womaniya2019/',
    ],
  };

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Womaniya',
    description: 'Authentic handwoven sarees, blouses & more — Jamdani, Tant, Chanderi, Ikkat, Ajrakh — crafted by master artisans in Kolkata.',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}/opengraph-image`,
    telephone: '+919143161829',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.5726,
      longitude: 88.3639,
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '20:00',
    },
  };

  const websiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Womaniya',
    url: baseUrl,
    inLanguage: ['en', 'bn'],
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/shop?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      
      <main id="main-content" className="min-h-screen touch-pan-y">
        <HeroSection />
        
        {heroBanners.length > 0 && (
          <section className="py-16 md:py-24 bg-background relative z-20 border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent mb-3 font-sans-en">
                  {isBn ? 'হাইলাইটস' : 'Highlights'}
                </p>
                <h2 className={`font-editorial text-3xl md:text-5xl text-foreground ${isBn ? 'font-bengali-serif' : ''}`}>
                  {isBn ? 'বিশেষ আয়োজন' : 'Featured Campaigns'}
                </h2>
              </div>
              <div className={`grid gap-8 ${
                heroBanners.length === 1 ? "grid-cols-1" : 
                "grid-cols-1 lg:grid-cols-2"
              }`}>
                {heroBanners.slice(0, 2).map((banner) => (
                  <BannerDisplay 
                    key={banner.id} 
                    banner={banner} 
                    locale={locale} 
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <HeritageTicker categories={categories} />
        
        <FeaturesSection />
        
        <div className="flex justify-center py-8 bg-background">
          <AlponaDivider color="currentColor" className="text-primary opacity-40" width={140} />
        </div>
        
        <FeaturedCollectionsSection collections={collections} isCompact={true} />
        
        <div className="flex justify-center bg-background pb-12 pt-4">
          <AlponaDivider color="currentColor" className="text-primary opacity-40" width={140} />
        </div>
        
        <GlimpsesSection />
        <ArtisanVoicesSection testimonials={testimonials} />
        <CategoriesSection categories={categories} isCompact={true} />

        {featured.length > 0 && (
          <div className="bg-muted/30 pb-12 pt-12 border-y border-border/50">
            <ShopGrid products={featured} categories={categories} isCompact={true} />
          </div>
        )}

        <ManifestoSection />
        <AboutSection />
        <WhatsAppSection waNumber={waNumber} />
      </main>
    </>
  );
}
