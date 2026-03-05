import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllPages }      from '@/actions/pages';
import type { Page }        from '@/db/schema';
import type { Metadata }    from 'next';
import Link from 'next/link';
import Image from 'next/image';

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

const FALLBACK_BGS = [
  'bg-gradient-to-br from-bengal-sindoor/20 to-bengal-kansa/10',
  'bg-gradient-to-br from-bengal-kansa/20 to-bengal-sindoor/10',
  'bg-gradient-to-br from-bengal-mati/40 to-bengal-dust/30',
  'bg-gradient-to-br from-bengal-kajal/15 to-bengal-mati/20',
  'bg-gradient-to-br from-bengal-sindoor/15 to-bengal-kajal/10',
  'bg-gradient-to-br from-bengal-dust/30 to-bengal-kori/20',
];

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
    <main className="pt-24 pb-20 md:pt-32 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-12 md:mb-16 text-center">
        <h1 className={`text-4xl md:text-5xl text-bengal-kajal mb-4 ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
          {isBn ? 'আমাদের গল্প' : 'Our Stories'}
        </h1>
        <p className={`text-bengal-kansa max-w-2xl mx-auto ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
          {isBn 
            ? 'কারিগরদের জীবন এবং বুননের পিছনের কাহিনী।' 
            : 'Discover the heritage, the artisans, and the narratives woven into every thread.'}
        </p>
      </header>

      {stories.length === 0 ? (
        <div className="text-center py-20 text-bengal-kajal/50">
          {isBn ? 'কোনো গল্প পাওয়া যায়নি।' : 'No stories found.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, i) => {
            const title = isBn && story.title_bn ? story.title_bn : story.title_en;
            const fallbackBg = FALLBACK_BGS[i % FALLBACK_BGS.length];
            const coverImage = ((story.images as string[] | null) ?? [])[0] || story.hero_image_url || null;

            return (
              <Link prefetch={true}
                key={story.id}
                href={`/${locale}/stories/${story.slug}`}
                className="group block"
              >
                <div className={`relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 ${coverImage ? 'bg-bengal-mati' : fallbackBg}`}>
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="absolute inset-0 bg-hatch-pattern" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className={`text-2xl text-white mb-2 group-hover:text-bengal-kori transition-colors ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
                      {title}
                    </h2>
                    <span className="text-[10px] tracking-widest uppercase text-white/70 font-sans-en group-hover:text-white transition-colors">
                      {isBn ? 'গল্পটি পড়ুন' : 'Read Story'} &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
