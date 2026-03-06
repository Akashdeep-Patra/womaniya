'use client';

import { useTranslations } from 'next-intl';

export function ShopGridSkeleton() {
  const t = useTranslations('shop');

  const skeletons = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    variant: i % 3 === 2 ? 'aspect-square' : 'aspect-[3/4]',
  }));

  return (
    <section className="px-4 sm:px-6 py-8 md:py-12 max-w-7xl mx-auto w-full animate-pulse">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="font-editorial text-3xl md:text-4xl text-foreground mb-2">
          {t('title')}
        </h2>
        <div className="h-4 w-64 bg-muted rounded" />
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-hidden pb-6 -mx-4 px-4 md:mx-0 md:px-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-24 shrink-0 rounded-full bg-muted border border-border/40" />
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {skeletons.map((sk) => (
          <div key={sk.id} className="flex flex-col">
            <div className={`relative w-full ${sk.variant} bg-muted rounded-2xl mb-3`} />
            <div className="flex flex-col gap-1.5 px-1">
              <div className="h-3 w-16 bg-muted/60 rounded" />
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-4 w-20 bg-muted rounded" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
