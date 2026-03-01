import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { auth }             from '@/auth';
import { getAllProducts }    from '@/actions/products';
import Link                 from 'next/link';
import { PlusCircle }       from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export default async function AdminDashboard({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'admin' });
  const session = await auth();

  let allProducts: Awaited<ReturnType<typeof getAllProducts>> = [];
  try { allProducts = await getAllProducts(); } catch { /* dev */ }

  const featuredCount = allProducts.filter((p) => p.is_featured).length;

  return (
    <div className="px-4 pt-6 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 mb-0.5">
            Welcome back
          </p>
          <h1 className="font-editorial text-2xl text-bengal-kajal">{t('title')}</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-bengal-sindoor/15 flex items-center justify-center">
          <span className="text-bengal-sindoor font-editorial text-lg">
            {session?.user?.name?.[0] ?? 'W'}
          </span>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="bg-bengal-kajal rounded-sm p-4">
          <p className="text-bengal-kori/50 text-[10px] tracking-widest uppercase mb-1">
            {t('total_products')}
          </p>
          <p className="font-editorial text-4xl text-bengal-kansa">{allProducts.length}</p>
        </div>
        <div className="bg-bengal-sindoor/10 border border-bengal-sindoor/20 rounded-sm p-4">
          <p className="text-bengal-kajal/50 text-[10px] tracking-widest uppercase mb-1">
            {t('featured_count')}
          </p>
          <p className="font-editorial text-4xl text-bengal-sindoor">{featuredCount}</p>
        </div>
      </div>

      {/* Quick add CTA */}
      <Link
        href={`/${locale}/admin/add`}
        className="flex items-center justify-center gap-3 w-full h-14 bg-bengal-sindoor text-bengal-kori rounded-sm font-medium text-sm tracking-widest uppercase hover:bg-bengal-alta transition-colors"
      >
        <PlusCircle size={18} />
        {t('add_product')}
      </Link>

      {/* Recent products list */}
      {allProducts.length > 0 && (
        <div className="mt-8">
          <p className="text-[10px] tracking-widest uppercase text-bengal-kajal/50 mb-4">
            Recent Products
          </p>
          <div className="flex flex-col gap-0">
            {allProducts.slice(0, 5).map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-3 border-b border-bengal-kansa/15 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-bengal-kajal">{product.name_en}</p>
                  <p className="text-xs text-bengal-kajal/50">{product.category}</p>
                </div>
                <p className="font-editorial text-bengal-sindoor">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
