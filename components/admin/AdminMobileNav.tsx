'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Package, PlusCircle, FileText, MoreHorizontal,
  Tags, FolderOpen, Megaphone, Flag, Image as ImageIcon, BookOpen, Settings,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AdminMobileNav({ locale }: { locale: string }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const base = `/${locale}/admin`;

  const isActive = (href: string) => {
    if (href === base) return pathname === href;
    return pathname.startsWith(href);
  };

  const mainTabs = [
    { href: base, label: 'Home', icon: LayoutDashboard },
    { href: `${base}/products`, label: 'Catalog', icon: Package },
    { href: `${base}/products/new`, label: 'Add', icon: PlusCircle },
    { href: `${base}/pages`, label: 'Content', icon: FileText },
  ];

  const moreItems = [
    { href: `${base}/categories`, label: 'Categories', icon: Tags },
    { href: `${base}/collections`, label: 'Collections', icon: FolderOpen },
    { href: `${base}/campaigns`, label: 'Campaigns', icon: Megaphone },
    { href: `${base}/banners`, label: 'Banners', icon: Flag },
    { href: `${base}/stories`, label: 'Stories', icon: BookOpen },
    { href: `${base}/media`, label: 'Media', icon: ImageIcon },
    { href: `${base}/settings`, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      <AnimatePresence>
        {moreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-[3.5rem] left-0 right-0 z-50 bg-[#1A1918] border-t border-[#C5A059]/20 rounded-t-2xl pb-2 lg:hidden"
            >
              <div className="w-10 h-1 bg-[#F9F6F0]/20 rounded-full mx-auto mt-3 mb-4" />
              <div className="grid grid-cols-4 gap-1 px-3 pb-2">
                {moreItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 py-3 rounded-lg text-[10px] tracking-wider uppercase transition-colors',
                        active
                          ? 'text-[#C5A059] bg-[#C5A059]/10'
                          : 'text-[#F9F6F0]/50 hover:text-[#F9F6F0]',
                      )}
                    >
                      <item.icon 
                        size={22} 
                        strokeWidth={active ? 2.5 : 2} 
                        className={cn(
                          "transition-all duration-300 drop-shadow-sm",
                          active ? "fill-[#C5A059]/20" : "fill-transparent"
                        )} 
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1918] border-t border-[#C5A059]/15 lg:hidden">
        <div className="grid grid-cols-5 h-[3.5rem]" style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}>
          {mainTabs.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 min-h-[44px]',
                  'text-[10px] tracking-wider uppercase font-medium transition-colors',
                  active ? 'text-[#C5A059]' : 'text-[#F9F6F0]/40 hover:text-[#F9F6F0]',
                )}
              >
                <tab.icon 
                  size={20} 
                  strokeWidth={active ? 2.5 : 2} 
                  className={cn(
                    "transition-all duration-300 drop-shadow-sm",
                    active ? "fill-[#C5A059]/20" : "fill-transparent"
                  )} 
                />
                <span>{tab.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 min-h-[44px]',
              'text-[10px] tracking-wider uppercase font-medium transition-colors',
              moreOpen ? 'text-[#C5A059]' : 'text-[#F9F6F0]/40 hover:text-[#F9F6F0]',
            )}
          >
            <MoreHorizontal 
              size={20} 
              strokeWidth={moreOpen ? 2.5 : 2} 
              className={cn(
                "transition-all duration-300 drop-shadow-sm",
                moreOpen ? "fill-[#C5A059]/20" : "fill-transparent"
              )} 
            />
            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
