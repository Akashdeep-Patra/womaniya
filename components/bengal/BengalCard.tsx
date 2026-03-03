import { cn } from '@/lib/utils';

interface BengalCardProps {
  className?: string;
  children:   React.ReactNode;
  variant?:   'default' | 'elevated' | 'bordered' | 'glass';
}

const variants = {
  default:  'bg-card shadow-sm hover:shadow-md transition-shadow duration-300 ring-1 ring-border/50',
  elevated: 'bg-card shadow-md hover:shadow-lg transition-shadow duration-300 ring-1 ring-border/50',
  bordered: 'bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300',
  glass:    'bg-card/80 backdrop-blur-md border border-border/50 shadow-sm hover:shadow-md transition-shadow duration-300',
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
