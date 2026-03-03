'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit, CalendarDays } from 'lucide-react';
import { toast } from 'sonner';
import { deleteCampaign } from '@/actions/campaigns';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import type { Campaign } from '@/db/schema';

function formatDateShort(d: string | Date | null | undefined) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
}

export function CampaignTableClient({ initialCampaigns, locale }: { initialCampaigns: Campaign[], locale: string }) {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
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

  const handleEdit = (id: number) => {
    router.push(`/${locale}/admin/campaigns/${id}/edit`);
  };

  const columns: Column<Campaign>[] = [
    {
      key: 'name',
      header: 'Campaign Name',
      render: (c) => (
        <div className="min-w-0">
          <p className="font-medium text-bengal-kajal truncate">{c.name_en}</p>
          <p className="text-[10px] text-bengal-kajal/50 mt-1">
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(c.id);
            }}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-bengal-kajal/40 hover:text-bengal-kajal transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(e, c.id)}
            disabled={isPending && pending === c.id}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-bengal-kajal/40 hover:text-bengal-alta transition-colors disabled:opacity-40"
          >
            {isPending && pending === c.id ? (
              <span className="block w-4 h-4 border-2 border-bengal-alta border-t-transparent rounded-full animate-spin" />
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
      <div className="w-11 h-11 rounded-lg bg-bengal-sindoor/10 flex items-center justify-center">
        <CalendarDays size={18} className="text-bengal-sindoor" />
      </div>
    ),
    title: (c) => c.name_en,
    subtitle: (c) => (
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#1A1918]/40">{formatDateShort(c.starts_at)} – {formatDateShort(c.ends_at)}</span>
        <StatusPill status={c.status || 'draft'} />
      </div>
    ),
    actions: (c) => (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(c.id);
          }}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-bengal-kajal/40 hover:text-bengal-kajal active:bg-bengal-mati transition-colors touch-manipulation"
        >
          <Edit size={15} />
        </button>
        <button
          onClick={(e) => handleDelete(e, c.id)}
          disabled={isPending && pending === c.id}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-bengal-kajal/40 hover:text-bengal-alta active:bg-bengal-alta/10 transition-colors disabled:opacity-40 touch-manipulation"
        >
          {isPending && pending === c.id ? (
            <span className="block w-4 h-4 border-2 border-bengal-alta border-t-transparent rounded-full animate-spin" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </>
    ),
  };

  return (
    <div className="bg-bengal-kori/50 rounded-2xl border border-bengal-kansa/20 overflow-hidden">
      <EntityTable
        columns={columns}
        data={campaigns}
        keyExtractor={(c) => c.id}
        onRowClick={(c) => handleEdit(c.id)}
        emptyMessage="No campaigns yet."
        mobileCard={mobileCard}
      />
    </div>
  );
}
