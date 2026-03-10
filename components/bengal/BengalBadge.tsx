import { cn } from '@/lib/utils';

type Variant = 'sindoor' | 'kansa' | 'kansa-dark' | 'mati' | 'kajal' | 'emerald';

interface BengalBadgeProps {
  variant?:   Variant;
  className?: string;
  children:   React.ReactNode;
  isBengali?: boolean;
}

const variants: Record<Variant, string> = {
  sindoor: 'bg-primary/10 text-primary border-primary/20 ring-1 ring-primary/10',
  kansa:   'bg-secondary text-foreground border-border ring-1 ring-border/50',
  'kansa-dark': 'bg-secondary text-primary border-border ring-1 ring-border/50',
  mati:    'bg-muted text-foreground border-border ring-1 ring-border/50',
  kajal:   'bg-foreground text-background border-transparent',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800',
};

export function BengalBadge({
  variant = 'kansa',
  className,
  children,
  isBengali,
}: BengalBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full border shadow-none cursor-default',
        'text-[10px] tracking-widest uppercase font-medium',
        isBengali ? 'font-bengali tracking-normal text-xs' : 'font-sans-en',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
