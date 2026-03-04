import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { PageForm }      from '@/components/admin/PageForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';

type Props = { params: Promise<{ locale: string }> };

export default async function AddStory({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  return (
    <div className="px-4 pt-6 pb-6 max-w-3xl mx-auto">
      <Link prefetch={true}
        href={`/${locale}/admin/stories`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-sans font-semibold tracking-tight text-2xl text-foreground mb-6">
        Create New Story
      </h1>

      <PageForm locale={locale} basePath="stories" defaultPageType="story" />
    </div>
  );
}