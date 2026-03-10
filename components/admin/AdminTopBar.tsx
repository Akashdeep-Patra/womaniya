'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { CommandPalette } from './CommandPalette';
import { ActivityDropdown } from './ActivityDropdown';

function getBreadcrumbs(pathname: string): string[] {
  const parts = pathname.split('/').filter(Boolean);
  const adminIdx = parts.indexOf('admin');
  if (adminIdx === -1) return [];
  const crumbs = parts.slice(adminIdx + 1).filter((p) => !p.startsWith('('));
  return crumbs.length ? crumbs : ['Dashboard'];
}

export function AdminTopBar({ userName, locale }: { userName?: string | null; locale: string }) {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);
  const [paletteOpen, setPaletteOpen] = useState(false);

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
        <button
          onClick={() => setPaletteOpen(true)}
          aria-label="Search"
          className="h-11 flex items-center gap-2 rounded-lg px-3 hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors touch-manipulation"
        >
          <Search size={18} />
          <kbd className="hidden lg:inline-flex h-5 items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
        <ActivityDropdown />
        <ThemeToggle />
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center ml-1">
          <span className="font-sans font-bold text-sm text-primary uppercase">
            {userName?.[0] ?? 'W'}
          </span>
        </div>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} locale={locale} />
    </header>
  );
}
