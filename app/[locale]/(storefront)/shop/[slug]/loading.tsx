import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { AlponaDivider } from '@/components/illustrations/AlponaDivider';
import { KanthaStitch } from '@/components/illustrations/KanthaStitch';

export default function ProductLoading() {
  return (
    <main id="main-content" className="pt-14 md:pt-20 pb-32 md:pb-16 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Skeleton */}
        <nav className="py-4 md:py-6">
          <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-muted-foreground opacity-50">
            <ArrowLeft size={14} strokeWidth={2} />
            <Skeleton className="w-16 h-3 rounded" />
          </div>
        </nav>

        {/* ── Product Layout Skeleton ── */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start animate-pulse">

          {/* ── Left: Image Gallery Skeleton ── */}
          <div className="w-full lg:w-3/5 xl:w-[58%]">
            <div className="relative w-full aspect-3/4 md:aspect-square lg:aspect-4/5 bg-muted/30 rounded-[2.5rem] overflow-hidden border border-border/40">
              <div className="absolute inset-0 bg-linear-to-tr from-muted/50 to-muted/10" />
            </div>
            {/* Thumbnails Skeleton */}
            <div className="flex gap-3 mt-4 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="w-20 h-24 rounded-2xl shrink-0" />
              ))}
            </div>
          </div>

          {/* ── Right: Product Details Skeleton ── */}
          <div className="w-full lg:w-2/5 xl:w-[42%] lg:sticky lg:top-20 flex flex-col pt-2 lg:pt-0">

            {/* Category + Stock Skeleton */}
            <div className="flex items-center gap-3 mb-5">
              <Skeleton className="w-20 h-6 rounded-full" />
              <Skeleton className="w-16 h-4 rounded-full" />
            </div>

            {/* Product Name Skeleton */}
            <Skeleton className="w-3/4 h-10 md:h-12 rounded-xl mb-4" />
            <Skeleton className="w-1/2 h-10 md:h-12 rounded-xl mb-4" />

            {/* Price Skeleton */}
            <Skeleton className="w-32 h-8 md:h-10 rounded-lg mt-2 mb-2" />
            <Skeleton className="w-40 h-3 rounded mb-6" />

            <AlponaDivider width={140} className="mb-8 opacity-20" />

            {/* Description Skeleton */}
            <div className="space-y-3 mb-8">
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-[90%] h-4 rounded" />
              <Skeleton className="w-[80%] h-4 rounded" />
            </div>

            {/* Attributes Grid Skeleton */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8 py-5 px-5 bg-muted/20 rounded-3xl border border-border/30">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <Skeleton className="w-12 h-2.5 rounded mb-2" />
                  <Skeleton className="w-24 h-4 rounded" />
                </div>
              ))}
            </div>

            {/* Order Section Skeleton */}
            <div className="mb-8 space-y-4">
               {/* Cart/Buy Buttons */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <Skeleton className="w-full h-14 rounded-full" />
                 <Skeleton className="w-full h-14 rounded-full" />
               </div>
            </div>

            {/* Response Time Skeleton */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="w-48 h-2.5 rounded" />
            </div>

            <KanthaStitch color="currentColor" width={240} rows={1} className="mx-auto mb-8 opacity-10 text-border" />

            {/* Trust Badges Skeleton */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-muted/20 border border-border/30">
                  <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                  <div className="space-y-2 w-full">
                    <Skeleton className="w-16 h-2 rounded" />
                    <Skeleton className="w-20 h-3 rounded" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
