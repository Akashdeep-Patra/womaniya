'use client';

import { useState, useTransition } from 'react';
import { Trash2, Edit, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import { deleteCampaign } from '@/actions/campaigns';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import type { Campaign } from '@/db/schema';
import Link from 'next/link';

function formatDateShort(d: string | Date | null | undefined) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

export function CampaignTableClient({ initialCampaigns, locale }: { initialCampaigns: Campaign[], locale: string }) {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;
    
    setId(id);
    startTransition(async () => {
      try {
        await deleteCampaign(id);
        setCampaigns((prev) => prev.filter((c) => c.id !== id));
        toast.success('Deleted successfully');
      } catch {
        toast.error('Failed to delete');
      } finally {
        setId(null);
      }
    });
  };

  const getEditUrl = (id: number) => `/${locale}/admin/campaigns/${id}/edit`;

  const columns: Column<Campaign>[] = [
    {
      key: 'name',
      header: 'Campaign Name',
      render: (c) => (
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{c.name_en}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {c.starts_at ? new Date(c.starts_at).toLocaleDateString() : 'No start date'} - 
            {c.ends_at ? new Date(c.ends_at).toLocaleDateString() : 'No end date'}
          </p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (c) => <StatusPill status={c.status || 'draft'} />,
    },
    {
      key: 'actions',
      header: '',
      render: (c) => (
        <div className="flex items-center justify-end gap-1">
          <Link prefetch={true}
            href={getEditUrl(c.id)}
            prefetch={true}
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={(e) => handleDelete(e, c.id)}
            disabled={isPending && pending === c.id}
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40"
          >
            {isPending && pending === c.id ? (
              <span className="block w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      ),
    },
  ];

  const mobileCard: MobileCardConfig<Campaign> = {
    leading: (c) => (
      <div className="w-11 h-11 rounded-md bg-muted flex items-center justify-center">
        <CalendarDays size={18} className="text-muted-foreground" />
      </div>
    ),
    title: (c) => c.name_en,
    subtitle: (c) => (
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-muted-foreground">{formatDateShort(c.starts_at)} – {formatDateShort(c.ends_at)}</span>
        <StatusPill status={c.status || 'draft'} />
      </div>
    ),
    actions: (c) => (
      <>
        <Link prefetch={true}
          href={getEditUrl(c.id)}
          prefetch={true}
          onClick={(e) => e.stopPropagation()}
          className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground active:bg-muted transition-colors touch-manipulation"
        >
          <Edit size={15} />
        </Link>
        <button
          onClick={(e) => handleDelete(e, c.id)}
          disabled={isPending && pending === c.id}
          className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive active:bg-destructive/10 transition-colors disabled:opacity-40 touch-manipulation"
        >
          {isPending && pending === c.id ? (
            <span className="block w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </>
    ),
  };

  return (
    <EntityTable
      columns={columns}
      data={campaigns}
      keyExtractor={(c) => c.id}
      getRowHref={(c) => getEditUrl(c.id)}
      emptyMessage="No campaigns yet."
      mobileCard={mobileCard}
    />
  );
}
