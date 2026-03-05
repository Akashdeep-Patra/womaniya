export default function StorefrontLoading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-4 animate-pulse pt-20">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <p className="text-muted-foreground text-sm font-medium tracking-widest uppercase">
        Loading...
      </p>
    </div>
  );
}
