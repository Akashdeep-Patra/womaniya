import { cn } from '@/lib/utils';
import { JamdaniDiamond } from '@/components/illustrations/JamdaniDiamond';

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="mb-6 opacity-30">
        <JamdaniDiamond size={80} />
      </div>
      <h3 className="font-editorial text-xl text-[#1A1918] mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-[#1A1918]/50 max-w-sm mb-6">{description}</p>
      )}
      {action}
    </div>
  );
}
