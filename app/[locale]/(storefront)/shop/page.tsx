import { setRequestLocale } from 'next-intl/server';
import { ShopGrid }         from '@/components/storefront/ShopGrid';
import { getPublishedProducts } from '@/actions/products';
import { getPublishedCategories } from '@/actions/categories';
import { getAllBanners } from '@/actions/banners';
import { getSetting } from '@/actions/settings';
import type { Metadata }    from 'next';
import { WhatsAppContextSetter } from '@/lib/whatsapp-context';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { locale } = await params;
  const [seoTitle, seoDesc] = await Promise.all([
    getSetting('seo_shop_title'),
    getSetting('seo_shop_description'),
  ]);
  const titleStr = seoTitle || 'Shop | Womaniya';
  const description = seoDesc || 'Browse our handloom collection.';
  return {
    title: { absolute: titleStr },
    description,
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
    openGraph: { title: titleStr, description },
    twitter: { card: 'summary_large_image' as const, title: titleStr, description },
    alternates: {
      canonical: `https://www.womaniyakolkata.in/${locale}/shop`,
      languages: {
        'en': 'https://www.womaniyakolkata.in/en/shop',
        'bn': 'https://www.womaniyakolkata.in/bn/shop',
        'x-default': 'https://www.womaniyakolkata.in/en/shop',
      },
    },
  };
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let allProducts: Awaited<ReturnType<typeof getPublishedProducts>> = [];
  let dbCategories: Awaited<ReturnType<typeof getPublishedCategories>> = [];
  let banners: Awaited<ReturnType<typeof getAllBanners>> = [];
  try {
    [allProducts, dbCategories, banners] = await Promise.all([
      getPublishedProducts(),
      getPublishedCategories(),
      getAllBanners(),
    ]);
  } catch {
    // DB not connected in dev
  }

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Womaniya Shop',
    url: `https://womaniyakolkata.in/${locale}/shop`,
    numberOfItems: allProducts.length,
    itemListElement: allProducts.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://womaniyakolkata.in/${locale}/shop/${p.slug}`,
      name: p.name_en,
      image: p.image_url,
    })),
  };

  return (
    <>
      <WhatsAppContextSetter context={{ type: 'shop' }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd).replace(/</g, '\\u003c') }} />
      <main id="main-content" className="pt-14 md:pt-16">
        <ShopGrid products={allProducts} categories={dbCategories} banners={banners} />
      </main>
    </>
  );
}
