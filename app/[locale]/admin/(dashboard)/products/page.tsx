import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllProducts }    from '@/actions/products';
import { ProductTableClient } from '@/components/admin/ProductTableClient';
import Link from 'next/link';
import { Plus } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  let allProducts: Awaited<ReturnType<typeof getAllProducts>> = [];
  try { allProducts = await getAllProducts(); } catch { /* dev */ }

  return (
    <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-editorial text-3xl text-bengal-kajal mb-1">{t('products')}</h1>
          <p className="text-sm text-bengal-kajal/60">
            {allProducts.length} {t('products_count')}
          </p>
        </div>
        <Link
          href={`/${locale}/admin/products/new`}
          className="flex items-center gap-2 bg-bengal-sindoor text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide hover:bg-bengal-alta transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Product</span>
        </Link>
      </div>

      <ProductTableClient initialProducts={allProducts} locale={locale} />
    </div>
  );
}
