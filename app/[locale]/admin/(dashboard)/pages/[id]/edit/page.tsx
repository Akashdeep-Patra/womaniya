import { setRequestLocale } from 'next-intl/server';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { notFound }         from 'next/navigation';
import { getPageById }      from '@/actions/pages';
import { PageEditLayout }   from '@/components/admin/PageEditLayout';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const pageId = Number(id);
  if (isNaN(pageId)) notFound();

  const page = await getPageById(pageId);
  if (!page) notFound();

  return (
    <div className="pt-6 pb-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <Link prefetch={true}
          href={`/${locale}/admin/pages`}
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-bengal-sindoor transition-colors"
        >
          <ArrowLeft size={14} />
          Back
        </Link>

        <h1 className="font-sans font-semibold tracking-tight text-lg lg:text-2xl text-foreground">
          {page.title_en}
        </h1>

        <span
          className={`text-[9px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full border ${
            page.status === 'published'
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
              : 'text-amber-600 bg-amber-50 border-amber-200'
          }`}
        >
          {page.status ?? 'draft'}
        </span>
      </div>

      <PageEditLayout page={page} locale={locale} />
    </div>
  );
}
