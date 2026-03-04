'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

function getBreadcrumbs(pathname: string): string[] {
  const parts = pathname.split('/').filter(Boolean);
  const localeIdx = 0;
  const adminIdx = parts.indexOf('admin');
  if (adminIdx === -1) return [];
  const crumbs = parts.slice(adminIdx + 1).filter((p) => !p.startsWith('('));
  return crumbs.length ? crumbs : ['Dashboard'];
}

export function AdminTopBar({ userName }: { userName?: string | null }) {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  return (
    <header className="h-14 lg:h-16 flex items-center justify-between px-4 lg:px-6 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">Admin</span>
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-muted-foreground/50">/</span>
            <span className="text-xs font-medium tracking-wider uppercase text-foreground capitalize">
              {crumb}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors touch-manipulation">
          <Search size={18} />
        </button>
        <button className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative touch-manipulation">
          <Bell size={18} />
        </button>
        <ThemeToggle />
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center ml-1">
          <span className="font-sans font-bold text-sm text-primary uppercase">
            {userName?.[0] ?? 'W'}
          </span>
        </div>
      </div>
    </header>
  );
}
