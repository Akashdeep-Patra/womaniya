import { cn } from '@/lib/utils';

type Variant = 'sindoor' | 'kansa' | 'mati' | 'kajal' | 'emerald';

interface BengalBadgeProps {
  variant?:   Variant;
  className?: string;
  children:   React.ReactNode;
  isBengali?: boolean;
}

const variants: Record<Variant, string> = {
  sindoor: 'bg-bengal-sindoor/10 text-bengal-sindoor border-bengal-sindoor/20 ring-1 ring-bengal-sindoor/10',
  kansa:   'bg-bengal-kansa/15  text-bengal-kajal  border-bengal-kansa/30',
  mati:    'bg-bengal-mati      text-bengal-kajal  border-bengal-kansa/15',
  kajal:   'bg-bengal-kajal     text-bengal-kori   border-transparent',
  emerald: 'bg-emerald-50       text-emerald-700   border-emerald-200',
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
        'inline-flex items-center px-3 py-1 rounded-full border',
        'text-[10px] tracking-widest uppercase font-medium shadow-sm',
        isBengali ? 'font-bengali tracking-normal text-xs' : 'font-sans-en',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
