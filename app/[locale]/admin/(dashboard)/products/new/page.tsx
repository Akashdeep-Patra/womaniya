import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { ProductForm }      from '@/components/admin/ProductForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { getAllCategories }  from '@/actions/categories';
import { getAllCollections } from '@/actions/collections';

type Props = { params: Promise<{ locale: string }> };

export default async function AddProductPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  // Parallel fetch for references
  const [categories, collections] = await Promise.all([
    getAllCategories(),
    getAllCollections()
  ]);

  return (
    <div className="px-4 pt-6 pb-6 max-w-2xl mx-auto">
      {/* Back */}
      <Link prefetch={true}
        href={`/${locale}/admin/products`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-sans font-semibold tracking-tight text-2xl text-foreground mb-6">
        {t('add_product')}
      </h1>

      <ProductForm categories={categories} collections={collections} />
    </div>
  );
}