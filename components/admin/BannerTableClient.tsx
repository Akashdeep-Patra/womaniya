'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { deleteBanner } from '@/actions/banners';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import { BengalBadge } from '@/components/bengal';
import type { Banner } from '@/db/schema';
import Link from 'next/link';

export function BannerTableClient({ initialBanners, locale }: { initialBanners: Banner[], locale: string }) {
  const [banners, setBanners] = useState(initialBanners);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    
    setId(id);
    startTransition(async () => {
      try {
        await deleteBanner(id);
        setBanners((prev) => prev.filter((b) => b.id !== id));
        toast.success('Deleted successfully');
      } catch {
        toast.error('Failed to delete');
      } finally {
        setId(null);
      }
    });
  };

  const getEditUrl = (id: number) => `/${locale}/admin/banners/${id}/edit`;

  const getImage = (b: Banner): string => ((b.images as string[] | null) ?? [])[0] || b.image_url || '';

  const columns: Column<Banner>[] = [
    {
      key: 'image',
      header: 'Banner',
      render: (b) => (
        <div className="flex items-center gap-3">
          <div className="relative w-20 h-10 shrink-0 rounded-md overflow-hidden bg-muted">
            <Image
              src={getImage(b)}
              alt="Banner"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-foreground truncate">{b.title_en || 'Untitled Banner'}</p>
            <BengalBadge variant="mati" className="text-[9px] mt-1">{b.placement}</BengalBadge>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (b) => <StatusPill status={b.status || 'draft'} />,
    },
    {
      key: 'actions',
      header: '',
      render: (b) => (
        <div className="flex items-center justify-end gap-1">
          <Link prefetch={true}
            href={getEditUrl(b.id)}
            prefetch={true}
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={(e) => handleDelete(e, b.id)}
            disabled={isPending && pending === b.id}
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40"
          >
            {isPending && pending === b.id ? (
              <span className="block w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      ),
    },
  ];

  const mobileCard: MobileCardConfig<Banner> = {
    leading: (b) => (
      <div className="relative w-14 h-10 rounded-md overflow-hidden bg-muted">
        <Image src={getImage(b)} alt="Banner" fill className="object-cover" sizes="56px" />
      </div>
    ),
    title: (b) => b.title_en || 'Untitled Banner',
    subtitle: (b) => (
      <div className="flex items-center gap-2">
        <BengalBadge variant="mati" className="text-[8px]">{b.placement}</BengalBadge>
        <StatusPill status={b.status || 'draft'} />
      </div>
    ),
    actions: (b) => (
      <>
        <Link prefetch={true}
          href={getEditUrl(b.id)}
          prefetch={true}
          onClick={(e) => e.stopPropagation()}
          className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground active:bg-muted transition-colors touch-manipulation"
        >
          <Edit size={15} />
        </Link>
        <button
          onClick={(e) => handleDelete(e, b.id)}
          disabled={isPending && pending === b.id}
          className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive active:bg-destructive/10 transition-colors disabled:opacity-40 touch-manipulation"
        >
          {isPending && pending === b.id ? (
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
      data={banners}
      keyExtractor={(b) => b.id}
      getRowHref={(b) => getEditUrl(b.id)}
      emptyMessage="No banners yet."
      mobileCard={mobileCard}
    />
  );
}
