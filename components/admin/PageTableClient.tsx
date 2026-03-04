'use client';

import { useState, useTransition } from 'react';
import { Trash2, Edit, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { deletePage } from '@/actions/pages';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import { BengalBadge } from '@/components/bengal';
import type { Page } from '@/db/schema';
import Link from 'next/link';

export function PageTableClient({ initialPages, locale, basePath = 'pages' }: { initialPages: Page[], locale: string, basePath?: string }) {
  const [pages, setPages] = useState(initialPages);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
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

  const getEditUrl = (id: number) => `/${locale}/admin/${basePath}/${id}/edit`;

  const columns: Column<Page>[] = [
    {
      key: 'title',
      header: 'Page Title',
      render: (p) => (
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{p.title_en}</p>
          <p className="text-xs text-muted-foreground mt-0.5">/{p.slug}</p>
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
        <div className="flex items-center justify-end gap-1">
          <Link prefetch={true} href={getEditUrl(p.id)}
            
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={(e) => handleDelete(e, p.id)}
            disabled={isPending && pending === p.id}
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40"
          >
            {isPending && pending === p.id ? (
              <span className="block w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      ),
    },
  ];

  const mobileCard: MobileCardConfig<Page> = {
    leading: (p) => (
      <div className="w-11 h-11 rounded-md bg-muted flex items-center justify-center">
        <FileText size={18} className="text-muted-foreground" />
      </div>
    ),
    title: (p) => p.title_en,
    subtitle: (p) => (
      <div className="flex items-center gap-2">
        <BengalBadge variant="mati" className="text-[8px]">{p.page_type}</BengalBadge>
        <StatusPill status={p.status || 'draft'} />
      </div>
    ),
    actions: (p) => (
      <>
        <Link  href={getEditUrl(p.id)}
          
          onClick={(e) => e.stopPropagation()}
          className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground active:bg-muted transition-colors touch-manipulation"
        >
          <Edit size={15} />
        </Link>
        <button
          onClick={(e) => handleDelete(e, p.id)}
          disabled={isPending && pending === p.id}
          className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive active:bg-destructive/10 transition-colors disabled:opacity-40 touch-manipulation"
        >
          {isPending && pending === p.id ? (
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
      data={pages}
      keyExtractor={(p) => p.id}
      getRowHref={(p) => getEditUrl(p.id)}
      emptyMessage="No pages created yet."
      mobileCard={mobileCard}
    />
  );
}
