import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { CampaignToast } from '@/components/storefront/CampaignToast';
import { getPublishedCategories } from '@/actions/categories';
import { getSetting } from '@/actions/settings';
import { getAllPages } from '@/actions/pages';
import { getAllCampaigns } from '@/actions/campaigns';
import { getLocale } from 'next-intl/server';

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: any[] = [];
  let staticPages: any[] = [];
  let serializableCampaigns: any[] = [];
  
  try {
    const [fetchedCategories, fetchedPages, fetchedCampaigns] = await Promise.all([
      getPublishedCategories(),
      getAllPages('static'),
      getAllCampaigns(),
    ]);
    const liveCampaigns = fetchedCampaigns.filter(c => c.status === 'live' && (c.announcement_text_en || c.announcement_text_bn));
    categories = fetchedCategories;
    staticPages = fetchedPages.filter(p => p.status === 'published');
    // Map Drizzle output to the expected format for the client
    serializableCampaigns = liveCampaigns.map(c => ({
      slug: c.slug,
      announcement_text_en: c.announcement_text_en,
      announcement_text_bn: c.announcement_text_bn,
      cta_url: c.cta_url
    }));
  } catch {
    // DB not yet connected in dev
  }

  const waNumber = await getSetting('whatsapp_number', '919143161829');
  
  const locale = await getLocale();
  const isBn = locale === 'bn';

  return (
    <>
      <Header />
      {children}
      <Footer />
      <BottomNav categories={categories} staticPages={staticPages} waNumber={waNumber} />
      {serializableCampaigns.length > 0 && (
        <CampaignToast 
          campaigns={serializableCampaigns}
          isBn={isBn}
          locale={locale}
        />
      )}
    </>
  );
}