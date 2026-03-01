import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { PageForm }      from '@/components/admin/PageForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { notFound }         from 'next/navigation';
import { getPageById }      from '@/actions/pages';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const pageId = Number(id);
  if (isNaN(pageId)) notFound();

  const page = await getPageById(pageId);

  if (!page) notFound();

  return (
    <div className="px-4 pt-6 pb-6 max-w-3xl mx-auto">
      <Link
        href={`/${locale}/admin/pages`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bengal-kajal/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-editorial text-2xl text-bengal-kajal mb-6">
        Edit {page.title_en}
      </h1>

      <PageForm initialData={page} locale={locale} />
    </div>
  );
}