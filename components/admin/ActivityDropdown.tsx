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
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { getRecentActivity, getUnreadCount, markAllAsRead } from '@/actions/activity-log';
import type { ActivityLogEntry } from '@/db/schema';
import { useMediaQuery } from '@/lib/use-media-query';

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

function ActivityList({ entries, unread, isMarking, onMarkAllRead }: {
  entries: ActivityLogEntry[];
  unread: number;
  isMarking: boolean;
  onMarkAllRead: () => void;
}) {
  return (
    <>
      {/* Header with mark-all-read */}
      {unread > 0 && (
        <div className="flex items-center justify-end px-4 py-2 border-b border-border">
          <button
            onClick={onMarkAllRead}
            disabled={isMarking}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
        </div>
      )}

      {/* Entries */}
      <div className="overflow-y-auto max-h-80 md:max-h-80">
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
    </>
  );
}

export function ActivityDropdown() {
  const [entries, setEntries] = useState<ActivityLogEntry[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const [, startPollTransition] = useTransition();
  const [isMarking, startMarkTransition] = useTransition();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const fetchUnread = useCallback(() => {
    startPollTransition(async () => {
      try {
        const count = await getUnreadCount();
        setUnread(count);
      } catch {
        // ignore — user may not be authed yet
      }
    });
  }, []);

  // Poll unread count every 30s, pause when tab is hidden
  useEffect(() => {
    fetchUnread();
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') fetchUnread();
    }, 30_000);
    return () => clearInterval(interval);
  }, [fetchUnread]);

  // Load entries + mark as read when dropdown opens
  useEffect(() => {
    if (!open) return;
    startPollTransition(async () => {
      try {
        const data = await getRecentActivity(20);
        setEntries(data);
        // Auto-mark as read when user opens the dropdown
        if (data.some((e) => !e.is_read)) {
          await markAllAsRead();
          setUnread(0);
          setEntries(data.map((e) => ({ ...e, is_read: true })));
        }
      } catch {
        // ignore
      }
    });
  }, [open]);

  function handleMarkAllRead() {
    startMarkTransition(async () => {
      try {
        await markAllAsRead();
        setUnread(0);
        setEntries((prev) => prev.map((e) => ({ ...e, is_read: true })));
      } catch {
        // ignore
      }
    });
  }

  const triggerButton = (
    <button
      aria-label="Activity log"
      className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors relative touch-manipulation"
      onClick={isMobile ? () => setOpen(true) : undefined}
    >
      <Bell size={18} />
      {unread > 0 && (
        <span className="absolute top-2 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
          {unread > 99 ? '99+' : unread}
        </span>
      )}
    </button>
  );

  // Mobile: bottom sheet
  if (isMobile) {
    return (
      <>
        {triggerButton}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="bottom" showCloseButton={false} className="rounded-t-2xl max-h-[70dvh] pb-safe">
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
            </div>
            <SheetHeader className="px-4 pt-1 pb-2">
              <SheetTitle className="text-sm font-semibold">Activity</SheetTitle>
            </SheetHeader>
            <ActivityList
              entries={entries}
              unread={unread}
              isMarking={isMarking}
              onMarkAllRead={handleMarkAllRead}
            />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop: dropdown
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {triggerButton}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-semibold">Activity</span>
        </div>
        <ActivityList
          entries={entries}
          unread={unread}
          isMarking={isMarking}
          onMarkAllRead={handleMarkAllRead}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
