import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { BannerForm }      from '@/components/admin/BannerForm';
import { ArrowLeft }        from 'lucide-react';
import Link                 from 'next/link';
import { notFound }         from 'next/navigation';
import { getBannerById }    from '@/actions/banners';
import { getAllCampaigns }  from '@/actions/campaigns';
import { getAllCollections } from '@/actions/collections';
import { getAllCategories }  from '@/actions/categories';

type Props = { params: Promise<{ locale: string; id: string }> };

export default async function EditBannerPage({ params }: Props) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  const bannerId = Number(id);
  if (isNaN(bannerId)) notFound();

  const [banner, campaigns, collections, categories] = await Promise.all([
    getBannerById(bannerId),
    getAllCampaigns(),
    getAllCollections(),
    getAllCategories(),
  ]);

  if (!banner) notFound();

  return (
    <div className="px-4 pt-6 pb-6 max-w-2xl mx-auto">
      <Link
        href={`/${locale}/admin/banners`}
        className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-bengal-kajal/50 hover:text-bengal-sindoor mb-6 transition-colors"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <h1 className="font-editorial text-2xl text-bengal-kajal mb-6">
        Edit Banner
      </h1>

      <BannerForm initialData={banner} locale={locale} refs={{ campaigns, collections, categories }} />
    </div>
  );
}