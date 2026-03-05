'use client';

import { cn } from '@/lib/utils';

const SOURCE_CONFIG: Record<string, { label: string; bg: string; text: string }> = {
  anecdotal:  { label: 'Anecdotal',  bg: 'bg-violet-100 dark:bg-violet-900/30',  text: 'text-violet-700 dark:text-violet-300' },
  google:     { label: 'Google',     bg: 'bg-blue-100 dark:bg-blue-900/30',      text: 'text-blue-700 dark:text-blue-300' },
  instagram:  { label: 'Instagram',  bg: 'bg-pink-100 dark:bg-pink-900/30',      text: 'text-pink-700 dark:text-pink-300' },
  facebook:   { label: 'Facebook',   bg: 'bg-indigo-100 dark:bg-indigo-900/30',  text: 'text-indigo-700 dark:text-indigo-300' },
  whatsapp:   { label: 'WhatsApp',   bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
  email:      { label: 'Email',      bg: 'bg-slate-100 dark:bg-slate-800/50',    text: 'text-slate-700 dark:text-slate-300' },
  youtube:    { label: 'YouTube',    bg: 'bg-red-100 dark:bg-red-900/30',        text: 'text-red-700 dark:text-red-300' },
  trustpilot: { label: 'Trustpilot', bg: 'bg-green-100 dark:bg-green-900/30',    text: 'text-green-700 dark:text-green-300' },
};

export function SourceBadge({ source, className }: { source: string; className?: string }) {
  const config = SOURCE_CONFIG[source] ?? SOURCE_CONFIG.anecdotal;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase whitespace-nowrap',
        config.bg,
        config.text,
        className,
      )}
    >
      {config.label}
    </span>
  );
}
