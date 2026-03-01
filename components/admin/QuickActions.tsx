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
    { href: `${base}/products/new`,    label: 'Product',    icon: Package,    color: '#8A1C14' },
    { href: `${base}/categories/new`,  label: 'Category',   icon: Tags,       color: '#C5A059' },
    { href: `${base}/collections/new`, label: 'Collection', icon: FolderOpen, color: '#2D7A4F' },
    { href: `${base}/pages/new`,       label: 'Page',       icon: FileText,   color: '#1A1918' },
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
              <Link
                key={action.href}
                href={action.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 bg-white rounded-full pl-3 pr-4 py-2 shadow-lg border border-[#C5A059]/10"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${action.color}15` }}
                >
                  <action.icon size={14} style={{ color: action.color }} />
                </div>
                <span className="text-xs font-medium text-[#1A1918]">{action.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors',
          open ? 'bg-[#1A1918]' : 'bg-[#8A1C14]',
        )}
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }}>
          {open ? <X size={20} className="text-white" /> : <Plus size={20} className="text-white" />}
        </motion.div>
      </button>
    </div>
  );
}
