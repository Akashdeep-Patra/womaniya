import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { CollectionForm }      from '@/components/admin/CollectionForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { getAllProducts }  from '@/actions/products';

type Props = { params: Promise<{ locale: string }> };

export default async function AddCollectionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const allProducts = await getAllProducts();

  return (
    <div className="px-4 pt-6 pb-6 max-w-2xl mx-auto">
      <Link prefetch={true}
        href={`/${locale}/admin/collections`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-sans font-semibold tracking-tight text-2xl text-foreground mb-6">
        Create Collection
      </h1>

      <CollectionForm allProducts={allProducts} />
    </div>
  );
}