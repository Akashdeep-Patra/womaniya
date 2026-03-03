import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { Header }           from '@/components/layout/Header';
import { Footer }           from '@/components/layout/Footer';
import { BottomNav }        from '@/components/layout/BottomNav';
import { ShopGrid }         from '@/components/storefront/ShopGrid';
import { getPublishedProducts } from '@/actions/products';
import { getPublishedCategories } from '@/actions/categories';
import type { Metadata }    from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shop' });
  return {
    title:       t('title'),
    description: t('subtitle'),
    openGraph: {
      title: t('title'),
      description: t('subtitle'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('subtitle'),
    },
    alternates: {
      canonical: `/${locale}/shop`,
      languages: { en: '/en/shop', bn: '/bn/shop' },
    },
  };
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let allProducts: Awaited<ReturnType<typeof getPublishedProducts>> = [];
  let dbCategories: Awaited<ReturnType<typeof getPublishedCategories>> = [];
  try {
    [allProducts, dbCategories] = await Promise.all([
      getPublishedProducts(),
      getPublishedCategories(),
    ]);
  } catch {
    // DB not connected in dev
  }

  return (
    <main className="pt-14 md:pt-16">
      <ShopGrid products={allProducts} categories={dbCategories} />
    </main>
  );
}
