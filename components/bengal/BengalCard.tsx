import { cn } from '@/lib/utils';

interface BengalCardProps {
  className?: string;
  children:   React.ReactNode;
  variant?:   'default' | 'elevated' | 'bordered' | 'glass';
}

const variants = {
  default:  'bg-bengal-kori',
  elevated: 'bg-bengal-kori shadow-lg shadow-bengal-kajal/8',
  bordered: 'bg-bengal-kori border border-bengal-kansa/25 shadow-sm shadow-bengal-kajal/5',
  glass:    'bg-bengal-kori/80 backdrop-blur-md border border-bengal-kansa/20 shadow-sm',
};

export function BengalCard({ className, children, variant = 'default' }: BengalCardProps) {
  return (
    <div className={cn('rounded-2xl overflow-hidden', variants[variant], className)}>
      {children}
    </div>
  );
}

export function BengalCardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('p-5 md:p-6', className)}>{children}</div>;
}
