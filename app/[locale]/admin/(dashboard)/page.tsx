import { setRequestLocale }     from 'next-intl/server';
import { auth }                 from '@/auth';
import { getDashboardStats, getRecentProducts, getUpcomingCollections, getLiveCampaigns } from '@/actions/dashboard';
import { AdminPageHeader }      from '@/components/admin/AdminPageHeader';
import { DashboardClient }      from '@/components/admin/DashboardClient';

type Props = { params: Promise<{ locale: string }> };

export default async function AdminDashboard({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const session = await auth();

  const [stats, recentProducts, upcomingCollections, liveCampaigns] = await Promise.all([
    getDashboardStats(),
    getRecentProducts(5),
    getUpcomingCollections(3),
    getLiveCampaigns(3),
  ]);

  return (
    <div>
      <AdminPageHeader
        title={`Welcome back, ${session?.user?.name ?? 'Admin'}`}
        description="Here's what's happening with your store today."
      />
      <DashboardClient
        stats={stats}
        recentProducts={recentProducts}
        upcomingCollections={upcomingCollections}
        liveCampaigns={liveCampaigns}
        locale={locale}
      />
    </div>
  );
}
