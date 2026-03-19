// Storefront loading skeleton — mirrors the homepage layout structure exactly
// to prevent layout shift (CLS) when the real page resolves.
export default function StorefrontLoading() {
  return (
    <main className="min-h-screen bg-background">
      {/* ── Hero Skeleton ── */}
      <section className="relative w-full bg-background overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10" />
        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-6 md:px-8 lg:px-[6%] xl:px-[8%]">
          {/* Matches HeroSection: flex-col on mobile, lg:flex-row on desktop */}
          {/* min-height: none on mobile (height is driven by content), lg uses max(700px,100svh) */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:min-h-[max(700px,100svh)] pt-[100px] sm:pt-[110px] lg:pt-[140px] pb-8 lg:pb-0 gap-0">

            {/* ── Mobile: text block (order-1 on mobile) ── */}
            <div className="w-full lg:hidden order-1 animate-pulse mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-primary/20" />
                <div className="h-2.5 w-24 bg-primary/10 rounded" />
              </div>
              <div className="mb-6 flex flex-col gap-1.5">
                <div className="h-11 w-[72%] bg-muted rounded-lg" />
                <div className="h-13 w-[88%] bg-primary/8 rounded-lg ml-2" />
                <div className="h-10 w-[60%] bg-muted rounded-lg" />
              </div>
            </div>

            {/* ── Mobile: 12-col image mosaic skeleton (order-1, after text) ── */}
            <div className="w-full lg:hidden relative z-10 order-1 mb-6 animate-pulse">
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7 aspect-3/4 rounded-2xl bg-muted" />
                <div className="col-span-5 flex flex-col gap-2">
                  <div className="aspect-square rounded-2xl bg-muted/80" />
                  <div className="aspect-4/3 rounded-2xl bg-muted/70" />
                </div>
                <div className="col-span-5 aspect-3/4 rounded-2xl bg-muted/70 mt-2" />
                <div className="col-span-7 aspect-7/5 rounded-2xl bg-muted/60 mt-2" />
              </div>
            </div>

            {/* ── Mobile: CTA row (order-1, below mosaic) ── */}
            <div className="w-full lg:hidden order-1 mb-4 animate-pulse">
              <div className="flex items-start gap-3 mb-6">
                <div className="w-0.5 h-10 bg-primary/10 shrink-0 mt-1" />
                <div className="flex flex-col gap-2 w-full max-w-[340px]">
                  <div className="h-3.5 w-full bg-muted rounded" />
                  <div className="h-3.5 w-[80%] bg-muted rounded" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-11 w-40 bg-foreground/10 rounded-full" />
                <div className="h-3.5 w-24 bg-muted rounded" />
              </div>
            </div>

            {/* ── Desktop: typography column (order-1) ── */}
            <div className="hidden lg:flex w-[42%] flex-col justify-center lg:pr-6 order-1 animate-pulse">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-px bg-primary/20" />
                <div className="h-3 w-32 bg-primary/10 rounded" />
              </div>
              <div className="mb-10 flex flex-col gap-2">
                <div className="h-20 w-[70%] bg-muted rounded-lg" />
                <div className="h-24 w-[85%] bg-primary/8 rounded-lg ml-14" />
                <div className="h-16 w-[60%] bg-muted rounded-lg" />
              </div>
              <div className="flex items-start gap-4 mb-10 pl-4">
                <div className="w-0.5 h-12 bg-primary/10 shrink-0 mt-1" />
                <div className="flex flex-col gap-2 w-full max-w-[380px]">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-[80%] bg-muted rounded" />
                  <div className="h-4 w-[60%] bg-muted rounded" />
                </div>
              </div>
              <div className="flex items-center gap-7 pl-4">
                <div className="h-14 w-48 bg-foreground/10 rounded-full" />
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            </div>

            {/* ── Desktop: collage (order-2) — matches HeroSection desktop collage ── */}
            <div className="hidden lg:block w-[58%] h-full relative z-10 order-2 pt-12 pb-16 pl-12 pr-6 animate-pulse">
              <div className="relative w-full h-[82vh] max-h-[850px]">
                <div className="absolute top-[12%] left-[2%] w-[38%] h-[55%] rounded-4xl bg-muted" />
                <div className="absolute bottom-[2%] left-[12%] w-[45%] h-[75%] rounded-[2.5rem] bg-muted/80 z-10" />
                <div className="absolute top-[8%] right-[5%] w-[42%] h-[60%] rounded-4xl bg-muted/70 z-10" />
                <div className="absolute bottom-[4%] right-[2%] w-[35%] h-[45%] rounded-2xl bg-muted/60 z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Heritage Ticker Skeleton — matches bg-foreground, py-3, height ~45px ── */}
      <div className="bg-foreground border-y border-primary/20" style={{ height: '45px' }} />

      {/* ── Features Section Skeleton ── */}
      <section className="py-16 md:py-24 bg-background relative">
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
                <div className="aspect-4/3 bg-muted" />
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-pulse">
          <div className="text-center mb-8">
            <div className="h-3 w-20 bg-muted rounded mx-auto mb-3" />
            <div className="h-8 w-48 bg-muted rounded-lg mx-auto" />
          </div>
          <div className="flex gap-4 overflow-hidden md:grid md:grid-cols-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="shrink-0 w-[200px] md:w-auto rounded-2xl overflow-hidden border border-border/40 bg-background">
                <div className="aspect-3/4 bg-muted" />
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
                <div className={`w-full ${i % 3 === 2 ? 'aspect-square' : 'aspect-3/4'} bg-muted rounded-2xl mb-3`} />
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
