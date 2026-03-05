import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { db }               from '@/lib/db';
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
    title: t('campaigns') || 'Campaigns',
    description: 'Explore our latest campaigns and collections at Womaniya.',
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

export default async function CampaignsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let campaigns: any[] = [];
  try {
    campaigns = await db.query.campaigns.findMany({
      where: (c, { inArray }) => inArray(c.status, ['live', 'ended']),
      with: { banners: true },
      orderBy: (c, { desc }) => [desc(c.created_at)],
    });
  } catch {
    // dev fallback
  }

  const isBn = locale === 'bn';

  return (
    <main className="pt-24 pb-20 md:pt-32 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="mb-12 md:mb-16 text-center">
        <h1 className={`text-4xl md:text-5xl text-bengal-kajal mb-4 ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
          {isBn ? 'আমাদের ক্যাম্পেইন' : 'Our Campaigns'}
        </h1>
        <p className={`text-bengal-kansa max-w-2xl mx-auto ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
          {isBn 
            ? 'আমাদের সর্বশেষ ইভেন্ট এবং অফার সম্পর্কে জানুন।' 
            : 'Discover our latest events, special collections, and featured showcases.'}
        </p>
      </header>

      {campaigns.length === 0 ? (
        <div className="text-center py-20 text-bengal-kajal/50">
          {isBn ? 'কোনো ক্যাম্পেইন পাওয়া যায়নি।' : 'No campaigns found.'}
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {campaigns.map((campaign, i) => {
            const name = isBn && campaign.name_bn ? campaign.name_bn : campaign.name_en;
            const desc = isBn && campaign.description_bn ? campaign.description_bn : campaign.description_en;
            const fallbackBg = FALLBACK_BGS[i % FALLBACK_BGS.length];
            
            // Try to find a banner image
            let coverImage = null;
            if (campaign.banners && campaign.banners.length > 0) {
              const banner = campaign.banners[0];
              coverImage = ((banner.images as string[] | null) ?? [])[0] || banner.image_url || null;
            }

            return (
              <Link prefetch={true}
                key={campaign.id}
                href={`/${locale}/campaign/${campaign.slug}`}
                className="group block"
              >
                <div className={`relative w-full aspect-21/9 md:aspect-3/1 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow mb-6 ${coverImage ? 'bg-bengal-mati' : fallbackBg}`}>
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="absolute inset-0 bg-hatch-pattern" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    {campaign.status === 'live' && (
                      <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-[10px] tracking-widest uppercase font-sans-en font-medium rounded-full mb-3 shadow-sm">
                        Live Now
                      </span>
                    )}
                    <h2 className={`text-2xl md:text-4xl text-white mb-2 group-hover:text-bengal-kori transition-colors ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
                      {name}
                    </h2>
                    {desc && (
                      <p className={`text-white/80 max-w-3xl line-clamp-2 md:text-lg ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
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
  );
}
