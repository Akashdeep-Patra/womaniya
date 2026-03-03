'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Package, Tags, FolderOpen, Megaphone,
  Image as ImageIcon, FileText, BookOpen, Settings,
  ChevronLeft, ChevronRight, Layers, Flag, PanelLeftClose, PanelLeft,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
        { label: 'Pages',   href: `${base}/pages`,   icon: FileText },
        { label: 'Stories', href: `${base}/stories`, icon: BookOpen },
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
        'hidden lg:flex flex-col h-screen sticky top-0 bg-[#1A1918] border-r border-[#C5A059]/10 transition-all duration-300 z-40',
        collapsed ? 'w-[68px]' : 'w-[260px]',
      )}
    >
      {/* Logo area */}
      <div className="h-16 flex items-center px-4 border-b border-[#C5A059]/10">
        {!collapsed && (
          <Link prefetch={true} href={`/${locale}/admin`} className="flex items-center gap-2">
            <span className="font-editorial text-xl text-[#C5A059]">W</span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#F9F6F0]/60">
              Womaniya
            </span>
          </Link>
        )}
        {collapsed && (
          <Link prefetch={true} href={`/${locale}/admin`} className="mx-auto">
            <span className="font-editorial text-xl text-[#C5A059]">W</span>
          </Link>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {navGroups.map((group, gi) => (
          <div key={gi} className={cn(group.title && 'mt-4')}>
            {group.title && !collapsed && (
              <p className="px-3 mb-2 text-[9px] tracking-[0.2em] uppercase text-[#F9F6F0]/30 font-medium">
                {group.title}
              </p>
            )}
            {group.title && collapsed && (
              <div className="mx-auto w-6 border-t border-[#C5A059]/10 my-2" />
            )}
            {group.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors relative group',
                    collapsed && 'justify-center px-2',
                    active
                      ? 'bg-[#C5A059]/15 text-[#C5A059]'
                      : 'text-[#F9F6F0]/50 hover:text-[#F9F6F0] hover:bg-[#2A2928]',
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#C5A059] rounded-r-full"
                    />
                  )}
                  <item.icon size={18} strokeWidth={active ? 2 : 1.5} />
                  {!collapsed && <span>{item.label}</span>}
                  {collapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-[#1A1918] border border-[#C5A059]/20 rounded text-xs text-[#F9F6F0] opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
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
        className="h-12 flex items-center justify-center border-t border-[#C5A059]/10 text-[#F9F6F0]/40 hover:text-[#F9F6F0] transition-colors"
      >
        {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
      </button>
    </aside>
  );
}
