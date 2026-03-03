'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';

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
    <header className="h-14 lg:h-16 flex items-center justify-between px-4 lg:px-6 border-b border-[#C5A059]/10 bg-[#FDFAF5]/80 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-2">
        <span className="text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40">Admin</span>
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-[#1A1918]/20">/</span>
            <span className="text-[10px] tracking-[0.15em] text-[#1A1918]/70 capitalize">
              {crumb}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#1A1918]/5 text-[#1A1918]/40 transition-colors touch-manipulation">
          <Search size={18} />
        </button>
        <button className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-[#1A1918]/5 text-[#1A1918]/40 transition-colors relative touch-manipulation">
          <Bell size={18} />
        </button>
        <div className="w-9 h-9 rounded-full bg-[#8A1C14]/15 flex items-center justify-center ml-0.5">
          <span className="font-editorial text-sm text-[#8A1C14]">
            {userName?.[0] ?? 'W'}
          </span>
        </div>
      </div>
    </header>
  );
}
