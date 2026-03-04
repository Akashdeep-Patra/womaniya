import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllCollections } from '@/actions/collections';
import { CollectionTableClient } from '@/components/admin/CollectionTableClient';
import Link from 'next/link';
import { Plus } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export default async function CollectionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  let allCollections: Awaited<ReturnType<typeof getAllCollections>> = [];
  try { allCollections = await getAllCollections(); } catch { /* dev */ }

  return (
    <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-sans font-bold tracking-tight text-3xl text-foreground mb-1">Collections</h1>
          <p className="text-sm text-foreground/60">
            {allCollections.length} collections
          </p>
        </div>
        <Link
          href={`/${locale}/admin/collections/new`}
          className="flex items-center gap-2 bg-bengal-sindoor text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide hover:bg-bengal-alta transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Collection</span>
        </Link>
      </div>

      <CollectionTableClient initialCollections={allCollections} locale={locale} />
    </div>
  );
}