import { Header }    from '@/components/layout/Header';
import { Footer }    from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ShopGridSkeleton } from '@/components/storefront/ShopGridSkeleton';

export default function ShopLoading() {
  return (
    <>
      <Header />
      <main className="pt-14 md:pt-16 min-h-screen">
        <ShopGridSkeleton />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
