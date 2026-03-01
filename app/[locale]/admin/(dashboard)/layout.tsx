import { redirect }         from 'next/navigation';
import { auth }             from '@/auth';
import { AdminBottomNav }   from '@/components/admin/AdminBottomNav';

type Props = {
  children: React.ReactNode;
  params:   Promise<{ locale: string }>;
};

export default async function AdminDashboardLayout({ children, params }: Props) {
  const { locale } = await params;
  const session   = await auth();

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <div className="min-h-screen bg-bengal-kori flex flex-col">
      <main className="flex-1 pb-[calc(3.5rem+env(safe-area-inset-bottom))]">
        {children}
      </main>
      <AdminBottomNav locale={locale} />
    </div>
  );
}
