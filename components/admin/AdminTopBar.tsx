'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Search, LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
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
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    if (avatarOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [avatarOpen]);

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
        <div className="relative" ref={avatarRef}>
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center ml-1 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
            aria-label="Account menu"
            aria-expanded={avatarOpen}
            aria-haspopup="true"
          >
            <span className="font-sans font-bold text-sm text-primary uppercase">
              {userName?.[0] ?? 'W'}
            </span>
          </button>
          {avatarOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-50 py-1">
              {userName && (
                <div className="px-3 py-2 border-b border-border">
                  <p className="text-sm font-medium text-foreground truncate">{userName}</p>
                </div>
              )}
              <button
                onClick={() => signOut({ callbackUrl: `/${locale}/admin/login` })}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/5 cursor-pointer transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} locale={locale} />
    </header>
  );
}
