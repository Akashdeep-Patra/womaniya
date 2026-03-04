import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { BannerForm }      from '@/components/admin/BannerForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { getAllCampaigns }  from '@/actions/campaigns';
import { getAllCollections } from '@/actions/collections';
import { getAllCategories }  from '@/actions/categories';

type Props = { params: Promise<{ locale: string }> };

export default async function AddBannerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const [campaigns, collections, categories] = await Promise.all([
    getAllCampaigns(),
    getAllCollections(),
    getAllCategories(),
  ]);

  return (
    <div className="px-4 pt-6 pb-6 max-w-2xl mx-auto">
      <Link
        href={`/${locale}/admin/banners`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-foreground/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-sans font-semibold tracking-tight text-2xl text-foreground mb-6">
        Create Banner
      </h1>

      <BannerForm locale={locale} refs={{ campaigns, collections, categories }} />
    </div>
  );
}