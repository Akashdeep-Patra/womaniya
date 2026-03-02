import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { Header }           from '@/components/layout/Header';
import { Footer }           from '@/components/layout/Footer';
import { BottomNav }        from '@/components/layout/BottomNav';
import { getPublishedCategories } from '@/actions/categories';
import type { Metadata }    from 'next';
import Link from 'next/link';
import Image from 'next/image';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });
  return {
    title: t('categories') || 'Categories',
    description: 'Browse our artisanal categories and handloom crafts.',
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

export default async function CategoriesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let categories: Awaited<ReturnType<typeof getPublishedCategories>> = [];
  try {
    categories = await getPublishedCategories();
  } catch {
    // dev fallback
  }

  const isBn = locale === 'bn';

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 md:pt-32 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-12 md:mb-16 text-center">
          <h1 className={`text-4xl md:text-5xl text-bengal-kajal mb-4 ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
            {isBn ? 'কারুকাজ অনুযায়ী' : 'The Living Crafts'}
          </h1>
          <p className={`text-bengal-kansa max-w-2xl mx-auto ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
            {isBn 
              ? 'শাড়ির ধরন এবং প্রাচীন কারুশিল্পের বৈচিত্র্য।' 
              : 'Browse our diverse range of traditional weaves and artisanal craftsmanship.'}
          </p>
        </header>

        {categories.length === 0 ? (
          <div className="text-center py-20 text-bengal-kajal/50">
            {isBn ? 'কোনো ক্যাটাগরি পাওয়া যায়নি।' : 'No categories found.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, i) => {
              const name = isBn && category.name_bn ? category.name_bn : category.name_en;
              const desc = isBn && category.description_bn ? category.description_bn : category.description_en;
              const fallbackBg = FALLBACK_BGS[i % FALLBACK_BGS.length];
              
              return (
                <Link
                  key={category.id}
                  href={`/${locale}/category/${category.slug}`}
                  className="group block"
                >
                  <div className={`relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 ${category.hero_image_url ? 'bg-bengal-mati' : fallbackBg}`}>
                    {category.hero_image_url ? (
                      <Image
                        src={category.hero_image_url}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center opacity-30">
                        <div className="absolute inset-0" style={{
                          backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
                          backgroundSize: '20px 20px',
                        }} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h2 className={`text-xl text-white mb-1 group-hover:text-bengal-kori transition-colors ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
                        {name}
                      </h2>
                      {desc && (
                        <p className={`text-white/80 text-xs line-clamp-1 ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                          {desc}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
