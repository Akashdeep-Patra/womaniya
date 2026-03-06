'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  href?: string;
  className?: string;
};

export function StatCard({ icon, label, value, trend, href, className }: StatCardProps) {
  const Wrapper = href ? motion.a : motion.div;

  return (
    <Wrapper
      {...(href ? { href } : {})}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-border bg-card p-4 lg:p-5',
        'transition-all duration-300',
        href && 'cursor-pointer hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
        className,
      )}
    >
      {/* Subtle gradient glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-medium mb-2 lg:mb-3">
            {label}
          </p>
          <p className="font-sans font-bold tracking-tight text-3xl lg:text-4xl text-foreground tabular-nums leading-none">
            {value}
          </p>
          {trend && (
            <p className="text-[11px] font-medium text-admin-success mt-2">{trend}</p>
          )}
        </div>
        <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl bg-primary/8 dark:bg-primary/15 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          {icon}
        </div>
      </div>
    </Wrapper>
  );
}
