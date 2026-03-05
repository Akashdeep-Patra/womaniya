import { auth } from '@/auth';
import { AdminSidebar } from './AdminSidebar';
import { AdminMobileNav } from './AdminMobileNav';
import { AdminTopBar } from './AdminTopBar';
import { PageTransition } from './PageTransition';

type AdminShellProps = {
  locale: string;
  children: React.ReactNode;
};

export async function AdminShell({ locale, children }: AdminShellProps) {
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar locale={locale} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar userName={session?.user?.name} />
        <main className="flex-1 px-4 lg:px-8 py-4 pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-4">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
      <AdminMobileNav locale={locale} />
    </div>
  );
}
