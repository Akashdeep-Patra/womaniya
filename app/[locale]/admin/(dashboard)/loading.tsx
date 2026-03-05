export default function AdminLoading() {
  return (
    <div className="flex-1 w-full h-full flex flex-col gap-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-muted rounded-md" />
        <div className="h-10 w-32 bg-muted rounded-md" />
      </div>

      {/* Stats/Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-muted rounded-xl md:rounded-2xl" />
        ))}
      </div>

      {/* Table/Content Skeleton */}
      <div className="bg-card border border-border rounded-xl md:rounded-2xl overflow-hidden mt-2 flex-1 min-h-[300px]">
        <div className="border-b border-border p-4">
          <div className="h-6 w-32 bg-muted rounded-md" />
        </div>
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-4 items-center">
              <div className="h-12 w-12 bg-muted rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/3 bg-muted rounded" />
                <div className="h-3 w-1/4 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
