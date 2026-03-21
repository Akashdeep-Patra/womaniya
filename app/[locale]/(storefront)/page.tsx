import { setRequestLocale }    from 'next-intl/server';
import { getTranslations }     from 'next-intl/server';
import type { Metadata }       from 'next';
import dynamic from 'next/dynamic';
import { getHeroImages } from '@/actions/hero-images';

const HeroSection = dynamic(
  () => import('@/components/storefront/HeroSection').then((m) => ({ default: m.HeroSection })),
  {
    ssr: true,
    loading: () => (
      <section className="relative w-full bg-background overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10" />
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-6 md:px-8 lg:px-[6%] xl:px-[8%]">
          {/* Skeleton layout mirrors the real HeroSection exactly to avoid CLS */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:min-h-[max(700px,100svh)] pt-[100px] sm:pt-[110px] lg:pt-[140px] pb-8 lg:pb-0 gap-0">
            {/* Mobile text skeleton — order-1 on mobile to match real component */}
            <div className="w-full lg:hidden order-1 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-primary/20" />
                <div className="h-2.5 w-24 bg-primary/10 rounded" />
              </div>
              <div className="mb-6 flex flex-col gap-1.5">
                <div className="h-11 w-[72%] bg-muted rounded-lg" />
                <div className="h-13 w-[88%] bg-primary/8 rounded-lg ml-2" />
                <div className="h-10 w-[60%] bg-muted rounded-lg" />
              </div>
            </div>
            {/* Mobile image mosaic skeleton — 12-col grid matching real mosaic */}
            <div className="w-full lg:hidden relative z-10 order-1 mb-6 animate-pulse">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7 aspect-3/4 rounded-2xl bg-muted" />
                <div className="col-span-5 flex flex-col gap-2">
                  <div className="aspect-square rounded-2xl bg-muted/80" />
                  <div className="aspect-4/3 rounded-2xl bg-muted/70" />
                </div>
                <div className="col-span-5 aspect-3/4 rounded-2xl bg-muted/70" />
                <div className="col-span-7 aspect-7/5 rounded-2xl bg-muted/60" />
              </div>
            </div>
            {/* Desktop text column */}
            <div className="hidden lg:flex w-[42%] flex-col justify-center lg:pr-6 order-1 animate-pulse">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-primary/20" />
                <div className="h-3 w-32 bg-primary/10 rounded" />
              </div>
              <div className="mb-10 flex flex-col gap-2">
                <div className="h-20 w-[70%] bg-muted rounded-lg" />
                <div className="h-24 w-[85%] bg-primary/8 rounded-lg ml-14" />
                <div className="h-16 w-[60%] bg-muted rounded-lg" />
              </div>
              <div className="flex items-start gap-4 mb-10 pl-4">
                <div className="w-0.5 h-12 bg-primary/10 shrink-0 mt-1" />
                <div className="flex flex-col gap-2 w-full max-w-[380px]">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-[80%] bg-muted rounded" />
                </div>
              </div>
              <div className="flex items-center gap-7 pl-4">
                <div className="h-14 w-44 bg-foreground/10 rounded-full" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            </div>
            {/* Desktop collage skeleton */}
            <div className="hidden lg:block w-[58%] relative z-10 order-2 pt-12 pb-16 pl-12 pr-6 animate-pulse">
              <div className="relative w-full h-[82vh] max-h-[850px]">
                <div className="absolute top-[12%] left-[2%] w-[38%] h-[55%] rounded-3xl bg-muted" />
                <div className="absolute bottom-[2%] left-[12%] w-[45%] h-[75%] rounded-[2.5rem] bg-muted/80 z-10" />
                <div className="absolute top-[8%] right-[5%] w-[42%] h-[60%] rounded-3xl bg-muted/60 z-10" />
                <div className="absolute bottom-[4%] right-[2%] w-[35%] h-[45%] rounded-3xl bg-muted/50 z-10" />
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
  {
    ssr: true,
    // Reserve exact height so no layout shift when JS hydrates
    loading: () => (
      <div className="bg-foreground border-y border-primary/20" style={{ height: '45px' }} />
    ),
  }
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

const HowMadeSection = dynamic(
  () => import('@/components/storefront/HowMadeSection').then((m) => ({ default: m.HowMadeSection })),
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
  const isBn = locale === 'bn';

  // Fetch admin overrides + live DB data in parallel
  const [seoTitle, seoDesc, storeName, categories, featured] = await Promise.all([
    getSetting('seo_home_title'),
    getSetting('seo_home_description'),
    getSetting('store_name'),
    getPublishedCategories(),
    getFeaturedProducts(),
  ]).catch(() => [null, null, null, [], []] as const);

  const brand = storeName || 'Womaniya';

  // Dynamic title from store name (admin-set) — kept generic, no product assumptions
  const dynamicTitle = `${brand} — Handcrafted Textiles`;

  // Dynamic description from actual published categories + featured product count
  const catNames = categories.slice(0, 3)
    .map(c => (isBn && c.name_bn ? c.name_bn : c.name_en))
    .join(', ');
  const n = featured.length;
  const dynamicDesc = catNames
    ? `${catNames}${n > 0 ? ` and more — ${n} featured piece${n !== 1 ? 's' : ''}` : ''}. Direct from artisans in Kolkata.`
    : 'Handcrafted textiles direct from artisans. Shipped from Kolkata.';

  // Admin setting is explicit override; DB-derived is the default
  const titleStr = seoTitle || dynamicTitle;
  const descStr = seoDesc || dynamicDesc;
  return {
    title: { absolute: titleStr },
    description: descStr,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: { absolute: titleStr },
      description: descStr,
      // No manual images — Next.js auto-detects opengraph-image.tsx in this route segment
      // and generates a stable hashed URL that always resolves correctly
    },
    twitter: {
      card: 'summary_large_image',
      title: { absolute: titleStr },
      description: descStr,
      // Auto-detected from opengraph-image.tsx
    },
    alternates: {
      canonical: `https://www.womaniyakolkata.in/${locale}`,
      languages: {
        'en': 'https://www.womaniyakolkata.in/en',
        'bn': 'https://www.womaniyakolkata.in/bn',
        'x-default': 'https://www.womaniyakolkata.in/en',
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isBn = locale === 'bn';
  const tCampaigns = await getTranslations({ locale, namespace: 'campaigns' });

  let featured: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  let categories: Awaited<ReturnType<typeof getPublishedCategories>> = [];
  let collections: Awaited<ReturnType<typeof getFeaturedCollections>> = [];
  let testimonials: Awaited<ReturnType<typeof getPublishedTestimonials>> = [];
  let banners: Awaited<ReturnType<typeof getAllBanners>> = [];
  let waNumber = '919143161829';
  let orgDesc = 'Handcrafted textiles direct from artisans. Shipped from Kolkata.';
  try {
    [featured, categories, collections, testimonials, banners, waNumber, orgDesc] = await Promise.all([
      getFeaturedProducts(),
      getPublishedCategories(),
      getFeaturedCollections(),
      getPublishedTestimonials(),
      getAllBanners(),
      getSetting('whatsapp_number', '919143161829'),
      getSetting('seo_home_description', 'Handcrafted textiles direct from artisans. Shipped from Kolkata.'),
    ]);
  } catch {
    // DB not yet connected in dev
  }

  const heroBanners = banners.filter(b => b.placement === 'hero' && b.status === 'published');

  const heroImages = await getHeroImages().catch(() => []);

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://womaniyakolkata.in';

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Womaniya',
    url: baseUrl,
    logo: `${baseUrl}/opengraph-image`,
    description: orgDesc,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Bengali'],
    },
    sameAs: [
      'https://www.instagram.com/womaniya2019/',
      'https://www.facebook.com/womaniya2019/',
    ],
  };

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Womaniya',
    description: orgDesc,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd).replace(/</g, '\\u003c') }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd).replace(/</g, '\\u003c') }} />
      
      <main id="main-content" className="min-h-screen touch-pan-y">
        <HeroSection heroImages={heroImages} />
        
        {heroBanners.length > 0 && (
          <section className="py-16 md:py-24 bg-background relative z-20 border-b border-border/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12">
                <p className="text-[10px] tracking-[0.28em] uppercase text-accent mb-3 font-sans-en">
                  {tCampaigns('highlights_label')}
                </p>
                <h2 className={`font-editorial text-3xl md:text-5xl text-foreground ${isBn ? 'font-bengali-serif' : ''}`}>
                  {tCampaigns('highlights_title')}
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
        <HowMadeSection />
        <AboutSection />
        <WhatsAppSection waNumber={waNumber} />
      </main>
    </>
  );
}
