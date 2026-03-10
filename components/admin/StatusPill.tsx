import { cn } from '@/lib/utils';
import { ALL_STATUSES, type AnyStatus } from '@/db/enums';

const STATUS_STYLES: Record<AnyStatus, string> = {
  draft:     'bg-foreground/10 text-foreground/60',
  published: 'bg-admin-success/15 text-admin-success',
  live:      'bg-admin-success/15 text-admin-success',
  scheduled: 'bg-admin-warning/15 text-admin-warning',
  ended:     'bg-foreground/10 text-foreground/40',
  archived:  'bg-foreground/5 text-foreground/30',
};

type StatusPillProps = {
  /** Status value - should be one of ALL_STATUSES for correct styling */
  status: string;
  className?: string;
};

export function StatusPill({ status, className }: StatusPillProps) {
  const styleKey = ALL_STATUSES.includes(status as AnyStatus) ? (status as AnyStatus) : 'draft';
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.1em] uppercase font-semibold cursor-default',
        STATUS_STYLES[styleKey],
        className,
      )}
    >
      {status}
    </span>
  );
}
