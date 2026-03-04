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
  default: 'bg-white border border-[#C5A059]/15',
  dark:    'bg-[#1A1918] text-[#F9F6F0]',
  accent:  'bg-[#8A1C14]/10 border border-[#8A1C14]/20',
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
          variant === 'dark' ? 'bg-[#C5A059]/15' : 'bg-[#1A1918]/5',
        )}>
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] tracking-wider uppercase text-[#2D7A4F] font-medium">
            {trend}
          </span>
        )}
      </div>
      <p className={cn(
        'text-[10px] tracking-[0.15em] uppercase mb-1',
        variant === 'dark' ? 'text-[#F9F6F0]/40' : 'text-foreground/40',
      )}>
        {label}
      </p>
      <p className={cn(
        'font-sans font-bold tracking-tight text-3xl',
        variant === 'dark' ? 'text-[#C5A059]' : variant === 'accent' ? 'text-[#8A1C14]' : 'text-foreground',
      )}>
        {value}
      </p>
    </motion.div>
  );
}
