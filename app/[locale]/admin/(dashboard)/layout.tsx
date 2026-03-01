import { redirect }     from 'next/navigation';
import { auth }         from '@/auth';
import { AdminShell }   from '@/components/admin/AdminShell';

type Props = {
  children: React.ReactNode;
  params:   Promise<{ locale: string }>;
};

export default async function AdminDashboardLayout({ children, params }: Props) {
  const { locale } = await params;
  const session    = await auth();

  if (!session) {
    redirect(`/${locale}/admin/login`);
  }

  return <AdminShell locale={locale}>{children}</AdminShell>;
}
