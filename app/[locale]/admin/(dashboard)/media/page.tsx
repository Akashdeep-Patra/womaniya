import { setRequestLocale } from 'next-intl/server';
import { getTranslations }  from 'next-intl/server';
import { getAllMedia, getMediaUsageMap, syncMediaFromEntities } from '@/actions/media';
import type { MediaUsage } from '@/actions/media';
import { MediaLibraryClient } from '@/components/admin/MediaLibraryClient';

type Props = { params: Promise<{ locale: string }> };

export default async function MediaLibraryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'admin' });

  // Auto-sync: backfill any entity-referenced images not yet in media_assets
  try { await syncMediaFromEntities(); } catch { /* non-critical */ }

  let allMedia: Awaited<ReturnType<typeof getAllMedia>> = [];
  let usageMap: Record<string, MediaUsage[]> = {};
  try {
    [allMedia, usageMap] = await Promise.all([getAllMedia(), getMediaUsageMap()]);
  } catch { /* dev */ }

  return (
    <div className="px-4 md:px-8 py-8 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-sans font-bold tracking-tight text-3xl text-foreground mb-1">Media Library</h1>
          <p className="text-sm text-foreground/60">
            {allMedia.length} assets
          </p>
        </div>
      </div>

      <MediaLibraryClient initialMedia={allMedia} usageMap={usageMap} />
    </div>
  );
}