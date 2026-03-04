import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllBanners } from '@/actions/banners';
import { BannerTableClient } from '@/components/admin/BannerTableClient';
import Link from 'next/link';
import { Plus } from 'lucide-react';

type Props = { params: Promise<{ locale: string }> };

export default async function BannersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  let allBanners: Awaited<ReturnType<typeof getAllBanners>> = [];
  try { allBanners = await getAllBanners(); } catch { /* dev */ }

  return (
    <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-sans font-bold tracking-tight text-3xl text-foreground mb-1">Banners</h1>
          <p className="text-sm text-foreground/60">
            {allBanners.length} banners
          </p>
        </div>
        <Link prefetch={true}
          href={`/${locale}/admin/banners/new`}
          className="flex items-center gap-2 bg-bengal-sindoor text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide hover:bg-bengal-alta transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Add Banner</span>
        </Link>
      </div>

      <BannerTableClient initialBanners={allBanners} locale={locale} />
    </div>
  );
}