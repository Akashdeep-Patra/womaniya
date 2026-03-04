import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getPageById }      from '@/actions/pages';
import { PageForm }         from '@/components/admin/PageForm';
import { notFound }         from 'next/navigation';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditStory({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const pageId = parseInt(id, 10);
  if (isNaN(pageId)) notFound();

  const story = await getPageById(pageId);
  if (!story) notFound();

  return (
    <div className="px-4 pt-6 pb-6 max-w-3xl mx-auto">
      <Link
        href={`/${locale}/admin/stories`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-sans font-semibold tracking-tight text-2xl text-foreground">
          Edit Story
        </h1>
        <a
          href={`/${locale}/stories/${story.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-widest uppercase text-bengal-sindoor hover:text-bengal-alta transition-colors font-semibold bg-bengal-sindoor/10 px-3 py-1.5 rounded-full"
        >
          View Live ↗
        </a>
      </div>

      <PageForm initialData={story} locale={locale} basePath="stories" defaultPageType="story" />
    </div>
  );
}