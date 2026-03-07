import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { db }               from '@/lib/db';
import type { Metadata }    from 'next';
import { CampaignsClient }  from './CampaignsClient';

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
    <main className="pt-24 pb-20 md:pt-32 min-h-screen px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-background">
      <header className="mb-12 md:mb-20 text-center">
        <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full border border-border bg-card/50 backdrop-blur-sm shadow-sm text-xs font-medium uppercase tracking-widest text-muted-foreground">
           {isBn ? 'সংগ্রহ' : 'Collections'}
        </div>
        <h1 className={`text-5xl md:text-6xl lg:text-7xl text-foreground mb-6 tracking-tight ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}>
          {isBn ? 'আমাদের ক্যাম্পেইন' : 'Our Campaigns'}
        </h1>
        <p className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
          {isBn 
            ? 'আমাদের সর্বশেষ ইভেন্ট এবং অফার সম্পর্কে জানুন।' 
            : 'Discover our latest events, special collections, and featured showcases.'}
        </p>
      </header>

      <CampaignsClient campaigns={campaigns} locale={locale} isBn={isBn} />
    </main>
  );
}
