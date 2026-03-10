'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Plus, Package, Tags, FolderOpen, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function QuickActions({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const base = `/${locale}/admin`;

  const actions = [
    { href: `${base}/products/new`,    label: 'Product',    icon: Package,    colorClass: 'text-bengal-sindoor', bgClass: 'bg-bengal-sindoor/15' },
    { href: `${base}/categories/new`,  label: 'Category',   icon: Tags,       colorClass: 'text-bengal-kansa', bgClass: 'bg-bengal-kansa/15' },
    { href: `${base}/collections/new`, label: 'Collection', icon: FolderOpen, colorClass: 'text-admin-success', bgClass: 'bg-admin-success/15' },
    { href: `${base}/pages/new`,       label: 'Page',       icon: FileText,   colorClass: 'text-foreground', bgClass: 'bg-foreground/15' },
  ];

  return (
    <div className="fixed bottom-20 right-4 z-40 lg:hidden">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col gap-2 mb-3"
          >
            {actions.map((action) => (
              <Link prefetch={true}
                key={action.href}
                href={action.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 bg-background rounded-full pl-3 pr-4 py-2 shadow-lg border border-border"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${action.bgClass}`}
                >
                  <action.icon size={14} className={action.colorClass} />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-colors',
          open ? 'bg-bengal-kajal text-bengal-kori' : 'bg-bengal-sindoor text-bengal-kori',
        )}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }}>
          {open ? <X size={20} className="text-current" /> : <Plus size={20} className="text-current" />}
        </motion.div>
      </button>
    </div>
  );
}
