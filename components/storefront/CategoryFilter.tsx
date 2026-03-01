'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CATEGORIES = ['All', 'Jamdani', 'Silk', 'Tant', 'Ready to Wear'];

interface Props {
  active:   string;
  onChange: (cat: string) => void;
}

export function CategoryFilter({ active, onChange }: Props) {
  const t = useTranslations('shop');

  const labelMap: Record<string, string> = {
    All:           t('filter_all'),
    Jamdani:       t('filter_jamdani'),
    Silk:          t('filter_silk'),
    Tant:          t('filter_tant'),
    'Ready to Wear': t('filter_rtw'),
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap" data-lenis-prevent>
      {CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={cn(
              'relative flex-shrink-0 h-9 px-4 rounded-sm border text-[10px] tracking-widest uppercase font-medium',
              'transition-colors duration-200 touch-manipulation whitespace-nowrap',
              isActive
                ? 'bg-bengal-sindoor text-bengal-kori border-bengal-sindoor'
                : 'bg-transparent text-bengal-kajal border-bengal-kansa/30 hover:border-bengal-kansa'
            )}
          >
            {labelMap[cat]}
            {isActive && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 bg-bengal-sindoor rounded-sm -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
