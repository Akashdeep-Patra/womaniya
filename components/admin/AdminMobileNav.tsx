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
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMoreOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-[3.5rem] left-0 right-0 z-50 bg-card border-t border-border rounded-t-2xl pb-2 lg:hidden shadow-xl"
            >
              <div className="w-10 h-1 bg-muted-foreground/20 rounded-full mx-auto mt-3 mb-4" />
              <div className="grid grid-cols-4 gap-1 px-3 pb-2">
                {moreItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link prefetch={true} key={item.href}
                      href={item.href}
                      
                      onClick={() => setMoreOpen(false)}
                      className={cn(
                        'flex flex-col items-center gap-1.5 py-3 rounded-xl text-[10px] tracking-wider uppercase transition-colors',
                        active
                          ? 'text-foreground bg-muted'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                      )}
                    >
                      <item.icon 
                        size={22} 
                        strokeWidth={active ? 2.5 : 2} 
                        className={cn(
                          "transition-all duration-300",
                          active ? "text-foreground" : ""
                        )} 
                      />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border lg:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="grid grid-cols-5 h-[3.5rem] pb-[max(0px,env(safe-area-inset-bottom))]">
          {mainTabs.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link  key={tab.href}
                href={tab.href}
                
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5 min-h-[44px]',
                  'text-[10px] tracking-wider uppercase font-medium transition-colors',
                  active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                <tab.icon 
                  size={20} 
                  strokeWidth={active ? 2.5 : 2} 
                  className={cn(
                    "transition-all duration-300",
                    active ? "text-foreground" : ""
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
              moreOpen ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            <MoreHorizontal 
              size={20} 
              strokeWidth={moreOpen ? 2.5 : 2} 
              className={cn(
                "transition-all duration-300",
                moreOpen ? "text-foreground" : ""
              )} 
            />
            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
