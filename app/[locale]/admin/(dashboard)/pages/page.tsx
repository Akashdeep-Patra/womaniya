import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllPages } from '@/actions/pages';
import { PageTableClient } from '@/components/admin/PageTableClient';
import Link from 'next/link';
import { Plus } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export default async function PagesIndex({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  let allPages: Awaited<ReturnType<typeof getAllPages>> = [];
  try { allPages = await getAllPages(); } catch { /* dev */ }

  return (
    <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-editorial text-3xl text-bengal-kajal mb-1">Pages</h1>
          <p className="text-sm text-bengal-kajal/60">
            {allPages.length} pages
          </p>
        </div>
        <Link
          href={`/${locale}/admin/pages/new`}
          className="flex items-center gap-2 bg-bengal-sindoor text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide hover:bg-bengal-alta transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Create Page</span>
        </Link>
      </div>

      <PageTableClient initialPages={allPages} locale={locale} />
    </div>
  );
}