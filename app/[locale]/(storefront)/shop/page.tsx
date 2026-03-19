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
  const isBn = locale === 'bn';

  // Fetch admin override + live DB data in parallel
  const [seoTitle, seoDesc, storeName, categories, products] = await Promise.all([
    getSetting('seo_shop_title'),
    getSetting('seo_shop_description'),
    getSetting('store_name'),
    getPublishedCategories(),
    getPublishedProducts(),
  ]).catch(() => [null, null, null, [], []] as const);

  const brand = storeName || 'Womaniya';

  // Dynamic title — built from actual published category names in the DB
  const catNames = categories.slice(0, 5)
    .map(c => (isBn && c.name_bn ? c.name_bn : c.name_en))
    .join(' · ');
  const dynamicTitle = catNames ? `${catNames} | ${brand}` : `Shop | ${brand}`;

  // Dynamic description — actual product count + category names
  const n = products.length;
  const dynamicDesc = catNames && n > 0
    ? `${n} handcrafted piece${n !== 1 ? 's' : ''} across ${catNames}. Direct from artisans.`
    : `Handcrafted textiles by ${brand}. Direct from artisans.`;

  // Admin setting is an explicit override; DB data is the default
  const titleStr = seoTitle || dynamicTitle;
  const description = seoDesc || dynamicDesc;
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
