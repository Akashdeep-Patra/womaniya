import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { getPublishedCategories } from '@/actions/categories';
import { getSetting } from '@/actions/settings';

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

  const waNumber = await getSetting('whatsapp_number', '919143161829');

  return (
    <>
      <Header />
      {children}
      <Footer />
      <BottomNav categories={categories} waNumber={waNumber} />
    </>
  );
}
