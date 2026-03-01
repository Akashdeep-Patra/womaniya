import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { Header }           from '@/components/layout/Header';
import { Footer }           from '@/components/layout/Footer';
import { BottomNav }        from '@/components/layout/BottomNav';
import { ShopGrid }         from '@/components/storefront/ShopGrid';
import { getAllProducts }    from '@/actions/products';
import type { Metadata }    from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shop' });
  return {
    title:       t('title'),
    description: t('subtitle'),
  };
}

export default async function ShopPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let allProducts: Awaited<ReturnType<typeof getAllProducts>> = [];
  try {
    allProducts = await getAllProducts();
  } catch {
    // DB not connected in dev
  }

  return (
    <>
      <Header />
      <main className="pt-14 md:pt-16">
        <ShopGrid products={allProducts} />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
