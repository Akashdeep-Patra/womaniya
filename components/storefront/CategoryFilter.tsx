'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Category } from '@/db/schema';

interface Props {
  active:     string;
  onChange:   (cat: string) => void;
  categories?: Category[];
}

export function CategoryFilter({ active, onChange, categories }: Props) {
  const t = useTranslations('shop');
  const params = useParams();
  const isBn = params.locale === 'bn';

  const categoryItems: { value: string; label: string }[] = [
    { value: 'All', label: t('filter_all') },
  ];

  if (categories && categories.length > 0) {
    categories.forEach((c) => {
      categoryItems.push({
        value: c.name_en,
        label: isBn && c.name_bn ? c.name_bn : c.name_en,
      });
    });
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap" data-lenis-prevent>
      {categoryItems.map((cat) => {
        const isActive = active === cat.value;
        return (
          <button
            key={cat.value}
            onClick={() => onChange(cat.value)}
            className={cn(
              'relative shrink-0 h-10 px-5 rounded-full border text-[10px] tracking-widest uppercase font-medium shadow-sm transition-all',
              'transition-colors duration-200 touch-manipulation whitespace-nowrap',
              isActive
                ? 'bg-bengal-sindoor text-bengal-kori border-bengal-sindoor'
                : 'bg-transparent text-bengal-kajal border-bengal-kansa/30 hover:border-bengal-kansa'
            )}
          >
            {cat.label}
            {isActive && (
              <motion.div
                layoutId="category-pill"
                className="absolute inset-0 bg-bengal-sindoor rounded-full -z-10 shadow-md"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
