export default function CategoryLoading() {
  return (
    <div className="min-h-screen bg-bengal-cream pt-24 pb-12 animate-pulse">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Hero Image Skeleton */}
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-bengal-mati" />
        
        {/* Text Skeleton */}
        <div className="flex flex-col items-center mb-12">
          <div className="h-8 md:h-12 w-3/4 md:w-1/2 bg-bengal-mati rounded-sm mb-4" />
          <div className="h-4 w-full md:w-2/3 bg-bengal-mati rounded-sm mb-2" />
          <div className="h-4 w-4/5 md:w-1/2 bg-bengal-mati rounded-sm" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="aspect-[3/4] rounded-xl bg-bengal-mati mb-1" />
              <div className="h-4 w-3/4 bg-bengal-mati rounded-sm" />
              <div className="h-4 w-1/3 bg-bengal-mati rounded-sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
