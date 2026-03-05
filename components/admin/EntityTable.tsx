'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
  getRowHref?: (item: T) => string;
  className?: string;
  emptyMessage?: string;
  mobileCard?: MobileCardConfig<T>;
};

export function EntityTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  getRowHref,
  className,
  emptyMessage = 'No items found',
  mobileCard,
}: EntityTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground bg-card rounded-xl border border-border">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("bg-card rounded-xl border border-border overflow-hidden", className)}>
      {/* Mobile card list */}
      {mobileCard && (
        <div className="md:hidden flex flex-col">
          {data.map((item, idx) => {
            const href = getRowHref?.(item);

            return (
              <motion.div
                key={keyExtractor(item)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
                className="border-b border-border last:border-0"
              >
                {href ? (
                  <div className="relative">
                    <Link href={href} prefetch={true} className="block w-full h-full">
                      <div
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 min-h-[56px] transition-colors',
                          'active:bg-muted/50 hover:bg-muted/50 touch-manipulation cursor-pointer',
                        )}
                      >
                        {mobileCard.leading && (
                          <div className="shrink-0">{mobileCard.leading(item)}</div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-foreground truncate">
                            {mobileCard.title(item)}
                          </div>
                          {mobileCard.subtitle && (
                            <div className="text-xs text-muted-foreground mt-0.5">
                              {mobileCard.subtitle(item)}
                            </div>
                          )}
                        </div>
                        {/* Spacer for actions area */}
                        {mobileCard.actions && <div className="shrink-0 w-20" />}
                      </div>
                    </Link>
                    {mobileCard.actions && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
                        {mobileCard.actions(item)}
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    onClick={() => onRowClick?.(item)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 min-h-[56px] transition-colors',
                      'active:bg-muted/50 hover:bg-muted/50 touch-manipulation',
                      onRowClick && 'cursor-pointer',
                    )}
                  >
                    {mobileCard.leading && (
                      <div className="shrink-0">{mobileCard.leading(item)}</div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {mobileCard.title(item)}
                      </div>
                      {mobileCard.subtitle && (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {mobileCard.subtitle(item)}
                        </div>
                      )}
                    </div>
                    {mobileCard.actions && (
                      <div className="shrink-0 flex items-center gap-1 z-10" onClick={e => e.stopPropagation()}>
                        {mobileCard.actions(item)}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Desktop table */}
      <div className={cn(mobileCard ? 'hidden md:block' : '', 'overflow-x-auto')}>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground bg-muted/30 uppercase border-b border-border">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'font-medium py-3 px-4 whitespace-nowrap tracking-wider',
                    col.className,
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((item, idx) => {
              const href = getRowHref?.(item);
              return (
                <motion.tr
                  key={keyExtractor(item)}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  onClick={!href ? () => onRowClick?.(item) : undefined}
                  className={cn(
                    'transition-colors bg-card hover:bg-muted/50 group',
                    (onRowClick || href) && 'cursor-pointer',
                  )}
                >
                  {columns.map((col) => {
                    const cellContent = col.render(item);
                    const isInteractive = col.key === 'actions'; // Convention to not wrap actions
                    
                    return (
                      <td key={col.key} className={cn('p-0', col.className)}>
                        {href && !isInteractive ? (
                          <Link prefetch={true} href={href} 
                             
                            className="flex items-center w-full h-full min-h-[3rem] px-4 py-2"
                          >
                            {cellContent}
                          </Link>
                        ) : (
                          <div className="flex items-center w-full h-full min-h-[3rem] px-4 py-2">
                            {cellContent}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
