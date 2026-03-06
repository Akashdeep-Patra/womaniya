// Storefront loading skeleton — mirrors the homepage layout structure
// to ensure zero layout shift when the page resolves.
export default function StorefrontLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero Skeleton ── */}
      <section className="relative w-full bg-background overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10" />
        <div className="absolute inset-0 bg-jamdani-lattice text-foreground pointer-events-none" />
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-6 md:px-8 lg:px-[6%] xl:px-[8%]">
          <div className="flex flex-col lg:flex-row lg:items-center min-h-svh pt-[140px] sm:pt-[160px] lg:pt-[140px] pb-12 lg:pb-0 gap-8 lg:gap-0">

            {/* Typography skeleton */}
            <div className="w-full lg:w-[42%] flex flex-col justify-center relative z-30 lg:pr-6 order-2 lg:order-1 mt-4 lg:mt-0 animate-pulse">
              {/* Badge line */}
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="w-8 md:w-12 h-px bg-primary/20" />
                <div className="h-3 w-32 bg-primary/10 rounded" />
              </div>

              {/* Headline blocks */}
              <div className="mb-6 md:mb-10 flex flex-col gap-2">
                <div className="h-12 sm:h-16 lg:h-20 w-[70%] bg-muted rounded-lg" />
                <div className="h-14 sm:h-20 lg:h-24 w-[85%] bg-primary/8 rounded-lg ml-4 sm:ml-8 lg:ml-14" />
                <div className="h-10 sm:h-14 lg:h-16 w-[60%] bg-muted rounded-lg" />
              </div>

              {/* Subtitle */}
              <div className="flex items-start gap-4 mb-8 md:mb-10 pl-2 lg:pl-4">
                <div className="w-0.5 h-12 bg-primary/10 shrink-0 mt-1" />
                <div className="flex flex-col gap-2 w-full max-w-[320px]">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-[80%] bg-muted rounded" />
                  <div className="h-4 w-[60%] bg-muted rounded" />
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex items-center gap-4 md:gap-7 pl-2 lg:pl-4">
                <div className="h-12 md:h-14 w-44 md:w-48 bg-foreground/10 rounded-full" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            </div>

            {/* Mobile collage skeleton */}
            <div className="w-full lg:hidden relative z-10 order-1 pt-6 pb-2">
              <div className="relative w-full max-w-[420px] mx-auto aspect-4/5 p-2">
                <div className="absolute bottom-2 left-2 w-[65%] h-[75%] rounded-4xl bg-muted border-[6px] border-background z-20 animate-pulse" />
                <div className="absolute top-2 right-2 w-[50%] h-[60%] rounded-3xl bg-muted/70 border-[6px] border-background z-10 animate-pulse" />
              </div>
            </div>

            {/* Desktop collage skeleton */}
            <div className="hidden lg:block w-[58%] h-full relative z-10 order-2 pt-12 pb-16 pl-12 pr-6 animate-pulse">
              <div className="relative w-full h-[600px] max-h-[80vh]">
                <div className="absolute left-0 top-[5%] w-[38%] h-[55%] rounded-3xl bg-muted" />
                <div className="absolute left-[30%] top-0 w-[40%] h-[65%] rounded-3xl bg-muted/80 z-10" />
                <div className="absolute right-0 top-[10%] w-[32%] h-[50%] rounded-3xl bg-muted/60 z-20" />
                <div className="absolute left-[15%] bottom-0 w-[35%] h-[40%] rounded-3xl bg-muted/70 z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Heritage Ticker Skeleton ── */}
      <div className="py-4 md:py-6 border-y border-border/50 bg-muted/20 overflow-hidden">
        <div className="flex gap-8 animate-pulse">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 w-28 bg-muted rounded shrink-0" />
          ))}
        </div>
      </div>

      {/* ── Features Section Skeleton ── */}
      <section className="py-16 md:py-24 bg-background relative">
        <div className="absolute inset-0 bg-alpona-grid text-foreground pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-pulse">
          <div className="text-center mb-12">
            <div className="h-3 w-24 bg-muted rounded mx-auto mb-4" />
            <div className="h-8 md:h-10 w-64 md:w-80 bg-muted rounded-lg mx-auto mb-3" />
            <div className="h-4 w-48 bg-muted/60 rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 md:p-8 rounded-2xl border border-border/40 bg-muted/20">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted mb-4" />
                <div className="h-4 w-24 bg-muted rounded mb-2" />
                <div className="h-3 w-32 bg-muted/60 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="flex justify-center py-8 bg-background">
        <div className="w-[140px] h-6 bg-muted/30 rounded" />
      </div>

      {/* ── Featured Collections Skeleton ── */}
      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-pulse">
          <div className="text-center mb-10">
            <div className="h-3 w-20 bg-muted rounded mx-auto mb-3" />
            <div className="h-8 md:h-10 w-56 md:w-72 bg-muted rounded-lg mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border/40 bg-muted/10">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-5 flex flex-col gap-2">
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-3 w-1/2 bg-muted/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Skeleton ── */}
      <section className="py-12 md:py-16 bg-muted/20 border-y border-border/50 relative">
        <div className="absolute inset-0 bg-kantha-dots text-foreground pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-pulse">
          <div className="text-center mb-8">
            <div className="h-3 w-20 bg-muted rounded mx-auto mb-3" />
            <div className="h-8 w-48 bg-muted rounded-lg mx-auto" />
          </div>
          <div className="flex gap-4 overflow-hidden md:grid md:grid-cols-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="shrink-0 w-[200px] md:w-auto rounded-2xl overflow-hidden border border-border/40 bg-background">
                <div className="aspect-[3/4] bg-muted" />
                <div className="p-4">
                  <div className="h-4 w-2/3 bg-muted rounded mb-2" />
                  <div className="h-3 w-1/3 bg-muted/60 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Grid Skeleton ── */}
      <section className="py-12 bg-muted/30 border-y border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-pulse">
          <div className="mb-8">
            <div className="h-8 w-48 bg-muted rounded-lg mb-2" />
            <div className="h-4 w-64 bg-muted/60 rounded" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <div className={`w-full ${i % 3 === 2 ? 'aspect-square' : 'aspect-[3/4]'} bg-muted rounded-2xl mb-3`} />
                <div className="flex flex-col gap-1.5 px-1">
                  <div className="h-3 w-16 bg-muted/60 rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-20 bg-muted rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
