'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Package, Tags, FolderOpen, Megaphone,
  Image as ImageIcon, FileText, BookOpen, Settings, Flag,
  PanelLeftClose, PanelLeft, Quote,
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

function getNavGroups(locale: string): NavGroup[] {
  const base = `/${locale}/admin`;
  return [
    {
      title: '',
      items: [
        { label: 'Dashboard', href: base, icon: LayoutDashboard },
      ],
    },
    {
      title: 'Catalog',
      items: [
        { label: 'Products',    href: `${base}/products`,    icon: Package },
        { label: 'Categories',  href: `${base}/categories`,  icon: Tags },
        { label: 'Collections', href: `${base}/collections`, icon: FolderOpen },
      ],
    },
    {
      title: 'Merchandising',
      items: [
        { label: 'Campaigns', href: `${base}/campaigns`, icon: Megaphone },
        { label: 'Banners',   href: `${base}/banners`,   icon: Flag },
      ],
    },
    {
      title: 'Content',
      items: [
        { label: 'Pages',        href: `${base}/pages`,        icon: FileText },
        { label: 'Stories',      href: `${base}/stories`,      icon: BookOpen },
        { label: 'Testimonials', href: `${base}/testimonials`, icon: Quote },
      ],
    },
    {
      title: '',
      items: [
        { label: 'Media Library', href: `${base}/media`, icon: ImageIcon },
        { label: 'Settings',      href: `${base}/settings`, icon: Settings },
      ],
    },
  ];
}

export function AdminSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const navGroups = getNavGroups(locale);

  const isActive = (href: string) => {
    if (href === `/${locale}/admin`) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col h-screen sticky top-0 bg-card border-r border-border transition-all duration-300 z-40',
        collapsed ? 'w-[68px]' : 'w-[260px]',
      )}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center px-4 border-b border-border">
        {!collapsed && (
          <Link prefetch={true} href={`/${locale}/admin`} className="flex items-center gap-2">
            <span className="font-sans font-bold text-xl text-foreground">Womaniya</span>
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              Admin
            </span>
          </Link>
        )}
        {collapsed && (
          <Link prefetch={true} href={`/${locale}/admin`} className="mx-auto flex items-center justify-center w-8 h-8 bg-primary/10 rounded-md">
            <span className="font-sans font-bold text-xl text-primary">W</span>
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navGroups.map((group, gi) => (
          <div key={gi} className={cn(group.title && 'mt-6')}>
            {group.title && !collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                {group.title}
              </p>
            )}
            {group.title && collapsed && (
              <div className="mx-auto w-6 border-t border-border my-2" />
            )}
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link prefetch={true} key={item.href}
                  href={item.href}
                  
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors relative group',
                    collapsed && 'justify-center px-2',
                    active
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full"
                    />
                  )}
                  <item.icon size={18} strokeWidth={active ? 2 : 1.5} />
                  {!collapsed && <span>{item.label}</span>}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border shadow-sm rounded text-xs text-popover-foreground opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                      {item.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 flex items-center justify-center border-t border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
      >
        {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
      </button>
    </aside>
  );
}
