import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { CollectionForm }      from '@/components/admin/CollectionForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { notFound }         from 'next/navigation';
import { getCollectionById } from '@/actions/collections';
import { getAllProducts }  from '@/actions/products';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditCollectionPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const collectionId = Number(id);
  if (isNaN(collectionId)) notFound();

  const [collection, allProducts] = await Promise.all([
    getCollectionById(collectionId),
    getAllProducts()
  ]);

  if (!collection) notFound();

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
        Edit {collection.name_en}
      </h1>

      <CollectionForm initialData={collection} allProducts={allProducts} />
    </div>
  );
}