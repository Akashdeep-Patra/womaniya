export default function CollectionLoading() {
  return (
    <div className="min-h-screen bg-background pt-14 md:pt-20 pb-32 md:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 animate-pulse">

        {/* Hero Image Skeleton */}
        <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-2xl overflow-hidden mb-8 bg-muted mt-6" />

        {/* Title & Description Skeleton */}
        <div className="flex flex-col items-center mb-12">
          <div className="h-8 md:h-12 w-3/4 md:w-1/2 bg-muted rounded-lg mb-4" />
          <div className="h-4 w-full md:w-2/3 bg-muted/60 rounded mb-2" />
          <div className="h-4 w-4/5 md:w-1/2 bg-muted/60 rounded" />
        </div>

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="aspect-3/4 rounded-2xl bg-muted" />
              <div className="h-3 w-16 bg-muted/60 rounded" />
              <div className="h-4 w-3/4 bg-muted rounded" />
              <div className="h-4 w-20 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
