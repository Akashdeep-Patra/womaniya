import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { ProductForm }      from '@/components/admin/ProductForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';

type Props = { params: Promise<{ locale: string }> };

export default async function AddProductPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  return (
    <div className="px-4 pt-6 pb-6 max-w-md mx-auto">
      {/* Back */}
      <Link
        href={`/${locale}/admin`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bengal-kajal/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-editorial text-2xl text-bengal-kajal mb-6">
        {t('add_product')}
      </h1>

      <ProductForm />
    </div>
  );
}
