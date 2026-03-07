'use client';

import { useTranslations } from 'next-intl';

export function ShopGridSkeleton({ isCompact = false }: { isCompact?: boolean }) {
  const t = useTranslations('shop');

  // Let's mimic the masonry-like aspect ratio mix or just use portrait
  const skeletons = Array.from({ length: isCompact ? 4 : 8 }).map((_, i) => ({
    id: i,
    variant: 'aspect-4/5',
  }));

  return (
    <section className="px-4 sm:px-6 py-12 md:py-20 max-w-7xl mx-auto w-full animate-pulse">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
        <div>
          {isCompact ? (
            <h2 className="font-ancient text-4xl md:text-5xl text-foreground mb-2">
              {t('title')}
            </h2>
          ) : (
            <h1 className="font-ancient text-4xl md:text-5xl text-foreground mb-2">
              {t('title')}
            </h1>
          )}
          <div className="h-4 w-64 md:w-96 bg-muted rounded mt-2" />
        </div>
      </div>

      {/* Filters (only show if not compact, or match the grid layout) */}
      <div className="mb-8 md:mb-10">
        <div className="flex gap-2 overflow-hidden pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[34px] w-24 shrink-0 rounded-full bg-muted border border-border/40" />
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {skeletons.map((sk) => (
          <div key={sk.id} className="block group">
            <div className="flex flex-col">
              {/* Image */}
              <div className={`relative w-full ${sk.variant} bg-muted rounded-3xl ring-1 ring-border/50 mb-2.5 overflow-hidden`} />
              
              {/* Info */}
              <div className="pt-2.5 px-0.5 flex flex-col gap-2">
                <div className="h-2 w-16 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-2/3 bg-muted rounded" />
                <div className="h-4 w-20 bg-muted rounded mt-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
