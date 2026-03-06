'use client';

import { useState, useEffect, useCallback, useTransition } from 'react';
import {
  Bell, Package, Tags, FolderOpen, Megaphone, Flag,
  FileText, Quote, Image as ImageIcon, Type,
  Plus, Pencil, Trash2, CheckCheck,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { getRecentActivity, getUnreadCount, markAllAsRead } from '@/actions/activity-log';
import type { ActivityLogEntry } from '@/db/schema';

const ENTITY_ICONS: Record<string, React.ElementType> = {
  product:     Package,
  category:    Tags,
  collection:  FolderOpen,
  campaign:    Megaphone,
  banner:      Flag,
  page:        FileText,
  testimonial: Quote,
  media:       ImageIcon,
  content:     Type,
};

const ACTION_ICONS: Record<string, React.ElementType> = {
  created: Plus,
  updated: Pencil,
  deleted: Trash2,
};

function timeAgo(date: Date | string | null): string {
  if (!date) return '';
  const now = Date.now();
  const then = new Date(date).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60)   return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export function ActivityDropdown() {
  const [entries, setEntries] = useState<ActivityLogEntry[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const fetchUnread = useCallback(() => {
    startTransition(async () => {
      try {
        const count = await getUnreadCount();
        setUnread(count);
      } catch {
        // ignore — user may not be authed yet
      }
    });
  }, []);

  // Poll unread count every 30s
  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 30_000);
    return () => clearInterval(interval);
  }, [fetchUnread]);

  // Load entries when dropdown opens
  useEffect(() => {
    if (!open) return;
    startTransition(async () => {
      try {
        const data = await getRecentActivity(20);
        setEntries(data);
      } catch {
        // ignore
      }
    });
  }, [open]);

  function handleMarkAllRead() {
    startTransition(async () => {
      try {
        await markAllAsRead();
        setUnread(0);
        setEntries((prev) => prev.map((e) => ({ ...e, is_read: true })));
      } catch {
        // ignore
      }
    });
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Activity log"
          className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative touch-manipulation"
        >
          <Bell size={18} />
          {unread > 0 && (
            <span className="absolute top-2 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {unread > 99 ? '99+' : unread}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold">Activity</span>
          {unread > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={isPending}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>

        {/* Entries */}
        <div className="max-h-80 overflow-y-auto">
          {entries.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No recent activity
            </p>
          )}
          {entries.map((entry) => {
            const EntityIcon = ENTITY_ICONS[entry.entity_type] ?? Package;
            const ActionIcon = ACTION_ICONS[entry.action] ?? Pencil;
            return (
              <div
                key={entry.id}
                className="flex items-start gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="relative mt-0.5 shrink-0">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <EntityIcon size={16} className="text-muted-foreground" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center">
                    <ActionIcon size={10} className="text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-snug">
                    <span className="capitalize">{entry.action}</span>{' '}
                    <span className="text-muted-foreground">{entry.entity_type}</span>{' '}
                    <span className="font-medium truncate">{entry.entity_name}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {timeAgo(entry.created_at)}
                  </p>
                </div>
                {!entry.is_read && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
