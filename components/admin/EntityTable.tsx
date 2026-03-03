'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export type Column<T> = {
  key: string;
  header: string;
  className?: string;
  hideOnMobile?: boolean;
  render: (item: T) => React.ReactNode;
};

export type MobileCardConfig<T> = {
  title: (item: T) => React.ReactNode;
  subtitle?: (item: T) => React.ReactNode;
  leading?: (item: T) => React.ReactNode;
  trailing?: (item: T) => React.ReactNode;
  actions?: (item: T) => React.ReactNode;
};

type EntityTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  onRowClick?: (item: T) => void;
  className?: string;
  emptyMessage?: string;
  mobileCard?: MobileCardConfig<T>;
};

export function EntityTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  className,
  emptyMessage = 'No items found',
  mobileCard,
}: EntityTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-[#1A1918]/40">
        {emptyMessage}
      </div>
    );
  }

  return (
    <>
      {/* Mobile card list */}
      {mobileCard && (
        <div className={cn('md:hidden', className)}>
          {data.map((item, idx) => (
            <motion.div
              key={keyExtractor(item)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.02 }}
              className="border-b border-[#C5A059]/5"
            >
              <div
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 min-h-[56px]',
                  'active:bg-[#C5A059]/5 touch-manipulation',
                  onRowClick && 'cursor-pointer',
                )}
              >
                {mobileCard.leading && (
                  <div className="shrink-0">{mobileCard.leading(item)}</div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#1A1918] truncate">
                    {mobileCard.title(item)}
                  </div>
                  {mobileCard.subtitle && (
                    <div className="text-[11px] text-[#1A1918]/45 mt-0.5">
                      {mobileCard.subtitle(item)}
                    </div>
                  )}
                </div>
                {mobileCard.actions && (
                  <div className="shrink-0 flex items-center gap-0.5">
                    {mobileCard.actions(item)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Desktop table */}
      <div className={cn(mobileCard ? 'hidden md:block' : '', 'overflow-x-auto', className)}>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C5A059]/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'text-left text-[10px] tracking-[0.15em] uppercase text-[#1A1918]/40 font-medium py-3 px-4',
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <motion.tr
                key={keyExtractor(item)}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'border-b border-[#C5A059]/5 transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-[#C5A059]/5',
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('py-3 px-4 text-sm', col.className)}>
                    {col.render(item)}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
