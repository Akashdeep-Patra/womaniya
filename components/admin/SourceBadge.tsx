'use client';

import { cn } from '@/lib/utils';
import {
  BadgeCheck,
  Chrome,
  Instagram,
  Facebook,
  MessageCircle,
  Mail,
  Youtube,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import type { TestimonialSource } from '@/db/enums';

type SourceBadgeConfig = {
  icon: LucideIcon;
  label: string;
  bg: string;
  text: string;
};

const SOURCE_CONFIG: Record<TestimonialSource, SourceBadgeConfig> = {
  anecdotal:  { icon: BadgeCheck,    label: 'Anecdotal',  bg: 'bg-violet-100 dark:bg-violet-900/30',  text: 'text-violet-700 dark:text-violet-300' },
  google:     { icon: Chrome,        label: 'Google',     bg: 'bg-blue-100 dark:bg-blue-900/30',      text: 'text-blue-700 dark:text-blue-300' },
  instagram:  { icon: Instagram,     label: 'Instagram',  bg: 'bg-pink-100 dark:bg-pink-900/30',      text: 'text-pink-700 dark:text-pink-300' },
  facebook:   { icon: Facebook,      label: 'Facebook',   bg: 'bg-indigo-100 dark:bg-indigo-900/30',  text: 'text-indigo-700 dark:text-indigo-300' },
  whatsapp:   { icon: MessageCircle, label: 'WhatsApp',   bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300' },
  email:      { icon: Mail,          label: 'Email',      bg: 'bg-slate-100 dark:bg-slate-800/50',    text: 'text-slate-700 dark:text-slate-300' },
  youtube:    { icon: Youtube,       label: 'YouTube',    bg: 'bg-red-100 dark:bg-red-900/30',        text: 'text-red-700 dark:text-red-300' },
  trustpilot: { icon: ShieldCheck,   label: 'Trustpilot', bg: 'bg-green-100 dark:bg-green-900/30',    text: 'text-green-700 dark:text-green-300' },
};

export function SourceBadge({ source, className }: { source: string; className?: string }) {
  const config = SOURCE_CONFIG[source as TestimonialSource] ?? SOURCE_CONFIG.anecdotal;
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase whitespace-nowrap cursor-default',
        config.bg,
        config.text,
        className,
      )}
    >
      <Icon size={12} strokeWidth={2.5} />
      {config.label}
    </span>
  );
}
