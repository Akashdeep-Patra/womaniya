export default function PageLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">

      {/* Hero banner skeleton — mirrors the real hero image section */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] bg-muted overflow-hidden">
        {/* Gradient overlay hint */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
        {/* Centred title skeleton */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 gap-3">
          <div className="h-10 sm:h-14 w-64 sm:w-96 bg-muted-foreground/20 rounded-xl" />
          <div className="h-4 w-48 bg-muted-foreground/15 rounded-lg" />
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col gap-14 sm:gap-20 pt-14 pb-20">

        {/* Rich text block skeleton */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full space-y-4">
          <div className="h-8 w-56 bg-muted rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted/70 rounded" />
            <div className="h-4 w-[95%] bg-muted/70 rounded" />
            <div className="h-4 w-[88%] bg-muted/70 rounded" />
            <div className="h-4 w-[92%] bg-muted/70 rounded" />
          </div>
          <div className="h-7 w-48 bg-muted rounded-lg mt-6" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted/70 rounded" />
            <div className="h-4 w-[90%] bg-muted/70 rounded" />
            <div className="h-4 w-[80%] bg-muted/70 rounded" />
          </div>
          {/* Bullet list hint */}
          <div className="space-y-2 pl-4">
            {[75, 85, 70, 80].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-muted/60 shrink-0" />
                <div className={`h-4 bg-muted/60 rounded`} style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA block skeleton */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
          <div className="bg-muted rounded-3xl px-8 sm:px-14 py-12 sm:py-16 flex flex-col items-center gap-5">
            <div className="h-10 w-3/4 bg-muted-foreground/20 rounded-xl" />
            <div className="h-4 w-2/3 bg-muted-foreground/15 rounded-lg" />
            <div className="h-4 w-1/2 bg-muted-foreground/15 rounded-lg" />
            <div className="h-12 w-52 bg-muted-foreground/25 rounded-full mt-2" />
          </div>
        </div>

      </div>
    </div>
  );
}
