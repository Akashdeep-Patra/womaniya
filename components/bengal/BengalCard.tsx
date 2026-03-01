import { cn } from '@/lib/utils';

interface BengalCardProps {
  className?: string;
  children:   React.ReactNode;
  variant?:   'default' | 'elevated' | 'bordered';
}

const variants = {
  default:  'bg-bengal-kori',
  elevated: 'bg-bengal-kori shadow-md shadow-bengal-kajal/5',
  bordered: 'bg-bengal-kori border border-bengal-kansa/30',
};

export function BengalCard({ className, children, variant = 'default' }: BengalCardProps) {
  return (
    <div className={cn('rounded-sm overflow-hidden', variants[variant], className)}>
      {children}
    </div>
  );
}

export function BengalCardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('p-4 md:p-5', className)}>{children}</div>;
}
