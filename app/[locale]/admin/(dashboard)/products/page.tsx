import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllProducts }    from '@/actions/products';
import { ProductList }      from '@/components/admin/ProductList';

type Props = { params: Promise<{ locale: string }> };

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  let allProducts: Awaited<ReturnType<typeof getAllProducts>> = [];
  try { allProducts = await getAllProducts(); } catch { /* dev */ }

  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-editorial text-2xl text-bengal-kajal">{t('products')}</h1>
        <span className="text-xs text-bengal-kajal/50">
          {allProducts.length} {t('products_count')}
        </span>
      </div>

      <ProductList initialProducts={allProducts} />
    </div>
  );
}
