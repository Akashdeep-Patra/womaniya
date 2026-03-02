'use client';

import { useTranslations } from 'next-intl';

export function ShopGridSkeleton() {
  const t = useTranslations('shop');

  // Create a mix of portrait and square skeletons for the masonry look
  const skeletons = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    variant: i % 3 === 2 ? 'aspect-square' : 'aspect-[3/4]',
  }));

  return (
    <section className="px-4 sm:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-6 md:mb-8">
        <h2 className="font-editorial text-3xl md:text-4xl text-bengal-kajal mb-2">
          {t('title')}
        </h2>
        <div className="h-4 w-64 bg-bengal-mati rounded-sm" />
      </div>

      {/* Filter Skeleton */}
      <div className="flex gap-2 overflow-hidden pb-6 -mx-4 px-4 md:mx-0 md:px-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-24 shrink-0 rounded-full bg-bengal-mati border border-bengal-kansa/10" />
        ))}
      </div>

      {/* Masonry Grid Skeleton */}
      <div className="masonry-grid">
        {skeletons.map((sk) => (
          <div key={sk.id} className="mb-6 break-inside-avoid w-full">
            <div className={`relative w-full ${sk.variant} bg-bengal-mati rounded-3xl overflow-hidden mb-3`} />
            <div className="flex flex-col gap-2 px-1">
              <div className="h-3 w-16 bg-bengal-mati rounded-sm" />
              <div className="h-5 w-3/4 bg-bengal-mati rounded-sm" />
              <div className="h-4 w-20 bg-bengal-mati rounded-sm" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
