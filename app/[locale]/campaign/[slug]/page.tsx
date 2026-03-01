import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import Image from 'next/image';

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function CampaignPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const campaign = await db.query.campaigns.findFirst({
    where: (c, { eq }) => eq(c.slug, slug),
    with: {
      banners: true,
    }
  });

  if (!campaign || campaign.status === 'draft' || campaign.status === 'archived') notFound();

  return (
    <div className="min-h-screen bg-bengal-cream pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-editorial text-bengal-kajal mb-4 text-center">
          {locale === 'bn' ? campaign.name_bn || campaign.name_en : campaign.name_en}
        </h1>
        
        <p className="text-center max-w-2xl mx-auto mb-12 text-bengal-kajal/70 font-sans-en">
          {locale === 'bn' ? campaign.description_bn || campaign.description_en : campaign.description_en}
        </p>

        {campaign.banners && campaign.banners.length > 0 && (
          <div className="grid gap-8">
            {campaign.banners.map(b => (
              <div key={b.id} className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-2xl overflow-hidden shadow-lg">
                <Image src={b.image_url} alt={b.title_en || 'Campaign Banner'} fill className="object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}