import { cn } from '@/lib/utils';

const STATUS_STYLES: Record<string, string> = {
  draft:     'bg-foreground/10 text-foreground/60',
  published: 'bg-[#2D7A4F]/15 text-[#2D7A4F]',
  live:      'bg-[#2D7A4F]/15 text-[#2D7A4F]',
  scheduled: 'bg-[#C5A059]/15 text-[#C5A059]',
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
