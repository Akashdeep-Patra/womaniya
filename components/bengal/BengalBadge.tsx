import { cn } from '@/lib/utils';

type Variant = 'sindoor' | 'kansa' | 'mati' | 'kajal';

interface BengalBadgeProps {
  variant?:  Variant;
  className?: string;
  children:  React.ReactNode;
  isBengali?: boolean;
}

const variants: Record<Variant, string> = {
  sindoor: 'bg-bengal-sindoor/10 text-bengal-sindoor border-bengal-sindoor/30',
  kansa:   'bg-bengal-kansa/15  text-bengal-kajal  border-bengal-kansa/40',
  mati:    'bg-bengal-mati       text-bengal-kajal  border-bengal-kansa/20',
  kajal:   'bg-bengal-kajal      text-bengal-kori   border-transparent',
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
        'inline-flex items-center px-2.5 py-0.5 rounded-sm border',
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
