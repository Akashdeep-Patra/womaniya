import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getPublishedCollections } from '@/actions/collections';
import { getAllBanners } from '@/actions/banners';
import { BannerDisplay } from '@/components/storefront/BannerDisplay';
import type { Metadata }    from 'next';
import Link from 'next/link';
import Image from 'next/image';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { locale } = await params;
  const [tNav, tCols] = await Promise.all([
    getTranslations({ locale, namespace: 'nav' }),
    getTranslations({ locale, namespace: 'collections' }),
  ]);
  return {
    title: tNav('collections') || 'Collections',
    description: tCols('meta_description'),
  };
}

export default async function CollectionsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [t, collections, banners] = await Promise.all([
    getTranslations({ locale, namespace: 'collections' }),
    getPublishedCollections().catch(() => []),
    getAllBanners().catch(() => []),
  ]);

  const collectionBanners = banners.filter(b => b.placement === 'collection_hero' && b.status === 'published');
  const isBn = locale === 'bn';

  return (
    <main className="pt-24 pb-20 md:pt-32 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-12 md:mb-16 text-center">
        <h1 className={`text-4xl md:text-5xl text-bengal-kajal mb-4 ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
          {t('page_title')}
        </h1>
        <p className={`text-bengal-kansa max-w-2xl mx-auto ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
          {t('page_description')}
        </p>
      </header>

      {collectionBanners.length > 0 && (
        <div className="mb-12 md:mb-16">
          {collectionBanners.map(banner => (
            <BannerDisplay key={banner.id} banner={banner} locale={locale} />
          ))}
        </div>
      )}

      {collections.length === 0 ? (
        <div className="text-center py-20 text-bengal-kajal/50">
          {t('empty_state')}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => {
            const name = isBn && collection.name_bn ? collection.name_bn : collection.name_en;
            const desc = isBn && collection.description_bn ? collection.description_bn : collection.description_en;
            const coverImage = ((collection.carousel_images as string[] | null) ?? [])[0] ?? null;

            return (
              <Link prefetch={true}
                key={collection.id}
                href={`/${locale}/collection/${collection.slug}`}
                className="group block"
              >
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-bengal-mati mb-4">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-bengal-sindoor/10 to-bengal-kansa/10 flex items-center justify-center">
                      <span className="text-bengal-kansa/30 font-editorial text-2xl italic">{name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                </div>
                <h2 className={`text-xl text-bengal-kajal mb-2 group-hover:text-bengal-sindoor transition-colors ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
                  {name}
                </h2>
                {desc && (
                  <p className={`text-bengal-kajal/70 text-sm line-clamp-2 ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                    {desc}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
