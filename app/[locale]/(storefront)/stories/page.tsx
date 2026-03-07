import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllPages }      from '@/actions/pages';
import type { Page }        from '@/db/schema';
import type { Metadata }    from 'next';
import { StoriesClient }    from './StoriesClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: t('stories') || 'Stories',
    description: 'Read the stories behind our artisanal handloom crafts.',
  };
}

export default async function StoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let stories: Page[] = [];
  try {
    const allStories = await getAllPages('story');
    stories = allStories.filter(p => p.status === 'published');
  } catch {
    // dev fallback
  }

  const isBn = locale === 'bn';

  return (
    <main className="pt-24 pb-20 md:pt-32 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-background">
      <header className="mb-12 md:mb-20 text-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-border bg-card/50 backdrop-blur-sm shadow-sm text-xs font-medium uppercase tracking-widest text-muted-foreground">
           {isBn ? 'ঐতিহ্য' : 'Heritage'}
        </div>
        <h1 className={`text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 tracking-tight ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
          {isBn ? 'আমাদের গল্প' : 'Our Stories'}
        </h1>
        <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
          {isBn 
            ? 'কারিগরদের জীবন এবং বুননের পিছনের কাহিনী।' 
            : 'Discover the heritage, the artisans, and the narratives woven into every thread.'}
        </p>
      </header>

      <StoriesClient stories={stories} locale={locale} isBn={isBn} />
    </main>
  );
}
