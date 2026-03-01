'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { deleteCampaign } from '@/actions/campaigns';
import { EntityTable, Column } from './EntityTable';
import { StatusPill } from './StatusPill';
import type { Campaign } from '@/db/schema';

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
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(c.id);
            }}
            className="p-2 text-bengal-kajal/40 hover:text-bengal-kajal transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(e, c.id)}
            disabled={isPending && pending === c.id}
            className="p-2 text-bengal-kajal/40 hover:text-bengal-alta transition-colors disabled:opacity-40"
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

  return (
    <div className="bg-bengal-kori/50 rounded-2xl border border-bengal-kansa/20 overflow-hidden">
      <EntityTable
        columns={columns}
        data={campaigns}
        keyExtractor={(c) => c.id}
        onRowClick={(c) => handleEdit(c.id)}
        emptyMessage="No campaigns yet."
      />
    </div>
  );
}