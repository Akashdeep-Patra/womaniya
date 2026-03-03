import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { getPublishedCategories } from '@/actions/categories';

export default async function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: any[] = [];
  try {
    categories = await getPublishedCategories();
  } catch {
    // DB not yet connected in dev
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <BottomNav categories={categories} />
    </>
  );
}
