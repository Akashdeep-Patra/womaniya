import { ShopGridSkeleton } from '@/components/storefront/ShopGridSkeleton';

export default function ShopLoading() {
  return (
    <main className="pt-14 md:pt-16 min-h-screen">
      <ShopGridSkeleton />
    </main>
  );
}
