import { cn } from '@/lib/utils';

interface BengalCardProps {
  className?: string;
  children:   React.ReactNode;
  variant?:   'default' | 'elevated' | 'bordered' | 'glass';
}

const variants = {
  default:  'bg-bengal-kori shadow-sm hover:shadow-md transition-shadow duration-300',
  elevated: 'bg-bengal-kori shadow-xl shadow-bengal-kajal/10 hover:shadow-2xl transition-shadow duration-300',
  bordered: 'bg-bengal-kori border border-bengal-kansa/25 shadow-md shadow-bengal-kajal/5 hover:shadow-lg transition-shadow duration-300',
  glass:    'bg-bengal-kori/80 backdrop-blur-md border border-bengal-kansa/20 shadow-md hover:shadow-lg transition-shadow duration-300',
};

export function BengalCard({ className, children, variant = 'default' }: BengalCardProps) {
  return (
    <div className={cn('rounded-[2rem] overflow-hidden', variants[variant], className)}>
      {children}
    </div>
  );
}

export function BengalCardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('p-5 md:p-6', className)}>{children}</div>;
}
