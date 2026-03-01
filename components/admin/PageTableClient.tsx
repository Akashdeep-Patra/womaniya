'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { deletePage } from '@/actions/pages';
import { EntityTable, Column } from './EntityTable';
import { StatusPill } from './StatusPill';
import { BengalBadge } from '@/components/bengal';
import type { Page } from '@/db/schema';

export function PageTableClient({ initialPages, locale }: { initialPages: Page[], locale: string }) {
  const router = useRouter();
  const [pages, setPages] = useState(initialPages);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    
    setId(id);
    startTransition(async () => {
      try {
        await deletePage(id);
        setPages((prev) => prev.filter((p) => p.id !== id));
        toast.success('Deleted successfully');
      } catch {
        toast.error('Failed to delete');
      } finally {
        setId(null);
      }
    });
  };

  const handleEdit = (id: number) => {
    router.push(`/${locale}/admin/pages/${id}/edit`);
  };

  const columns: Column<Page>[] = [
    {
      key: 'title',
      header: 'Page Title',
      render: (p) => (
        <div className="min-w-0">
          <p className="font-medium text-bengal-kajal truncate">{p.title_en}</p>
          <p className="text-[10px] text-bengal-kajal/50 mt-0.5">/{p.slug}</p>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Type',
      render: (p) => <BengalBadge variant="mati" className="text-[9px]">{p.page_type}</BengalBadge>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (p) => <StatusPill status={p.status || 'draft'} />,
    },
    {
      key: 'actions',
      header: '',
      render: (p) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(p.id);
            }}
            className="p-2 text-bengal-kajal/40 hover:text-bengal-kajal transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(e, p.id)}
            disabled={isPending && pending === p.id}
            className="p-2 text-bengal-kajal/40 hover:text-bengal-alta transition-colors disabled:opacity-40"
          >
            {isPending && pending === p.id ? (
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
        data={pages}
        keyExtractor={(p) => p.id}
        onRowClick={(p) => handleEdit(p.id)}
        emptyMessage="No pages created yet."
      />
    </div>
  );
}