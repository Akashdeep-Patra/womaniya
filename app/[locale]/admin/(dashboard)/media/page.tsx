import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllMedia }      from '@/actions/media';
import { MediaLibraryClient } from '@/components/admin/MediaLibraryClient';

type Props = { params: Promise<{ locale: string }> };

export default async function MediaLibraryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  let allMedia: Awaited<ReturnType<typeof getAllMedia>> = [];
  try { allMedia = await getAllMedia(); } catch { /* dev */ }

  return (
    <div className="px-4 md:px-8 py-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-editorial text-3xl text-bengal-kajal mb-1">Media Library</h1>
          <p className="text-sm text-bengal-kajal/60">
            {allMedia.length} assets
          </p>
        </div>
      </div>

      <MediaLibraryClient initialMedia={allMedia} />
    </div>
  );
}