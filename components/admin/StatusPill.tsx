import { cn } from '@/lib/utils';

const STATUS_STYLES: Record<string, string> = {
  draft:     'bg-foreground/10 text-foreground/60',
  published: 'bg-admin-success/15 text-admin-success',
  live:      'bg-admin-success/15 text-admin-success',
  scheduled: 'bg-admin-warning/15 text-admin-warning',
  ended:     'bg-foreground/10 text-foreground/40',
  archived:  'bg-foreground/5 text-foreground/30',
};

type StatusPillProps = {
  status: string;
  className?: string;
};

export function StatusPill({ status, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.1em] uppercase font-semibold',
        STATUS_STYLES[status] ?? STATUS_STYLES.draft,
        className,
      )}
    >
      {status}
    </span>
  );
}
