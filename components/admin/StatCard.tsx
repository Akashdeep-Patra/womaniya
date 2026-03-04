'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  variant?: 'default' | 'dark' | 'accent';
  className?: string;
};

const VARIANT_STYLES = {
  default: 'bg-card border border-border',
  dark:    'bg-foreground text-background',
  accent:  'bg-primary/10 border border-primary/20',
} as const;

export function StatCard({ icon, label, value, trend, variant = 'default', className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('rounded-lg p-4 lg:p-5', VARIANT_STYLES[variant], className)}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn(
          'w-9 h-9 rounded-md flex items-center justify-center',
          variant === 'dark' ? 'bg-background/20 text-background' : 'bg-foreground/5 text-primary',
        )}>
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] tracking-wider uppercase text-admin-success font-medium">
            {trend}
          </span>
        )}
      </div>
      <p className={cn(
        'text-[10px] tracking-[0.15em] uppercase mb-1',
        variant === 'dark' ? 'text-background/60' : 'text-foreground/50',
      )}>
        {label}
      </p>
      <p className={cn(
        'font-sans font-bold tracking-tight text-3xl',
        variant === 'dark' ? 'text-background' : variant === 'accent' ? 'text-primary' : 'text-foreground',
      )}>
        {value}
      </p>
    </motion.div>
  );
}
