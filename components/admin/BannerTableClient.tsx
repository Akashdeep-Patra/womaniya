'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { deleteBanner } from '@/actions/banners';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import { BengalBadge } from '@/components/bengal';
import type { Banner } from '@/db/schema';

export function BannerTableClient({ initialBanners, locale }: { initialBanners: Banner[], locale: string }) {
  const router = useRouter();
  const [banners, setBanners] = useState(initialBanners);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
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

  const handleEdit = (id: number) => {
    router.push(`/${locale}/admin/banners/${id}/edit`);
  };

  const getImage = (b: Banner): string => ((b.images as string[] | null) ?? [])[0] || b.image_url || '';

  const columns: Column<Banner>[] = [
    {
      key: 'image',
      header: 'Banner',
      render: (b) => (
        <div className="flex items-center gap-3">
          <div className="relative w-20 h-10 shrink-0 rounded-sm overflow-hidden bg-bengal-mati">
            <Image
              src={getImage(b)}
              alt="Banner"
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-bengal-kajal truncate">{b.title_en || 'Untitled Banner'}</p>
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(b.id);
            }}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-bengal-kajal/40 hover:text-bengal-kajal transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(e, b.id)}
            disabled={isPending && pending === b.id}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-bengal-kajal/40 hover:text-bengal-alta transition-colors disabled:opacity-40"
          >
            {isPending && pending === b.id ? (
              <span className="block w-4 h-4 border-2 border-bengal-alta border-t-transparent rounded-full animate-spin" />
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
      <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-bengal-mati">
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(b.id);
          }}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-bengal-kajal/40 hover:text-bengal-kajal active:bg-bengal-mati transition-colors touch-manipulation"
        >
          <Edit size={15} />
        </button>
        <button
          onClick={(e) => handleDelete(e, b.id)}
          disabled={isPending && pending === b.id}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-bengal-kajal/40 hover:text-bengal-alta active:bg-bengal-alta/10 transition-colors disabled:opacity-40 touch-manipulation"
        >
          {isPending && pending === b.id ? (
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
        data={banners}
        keyExtractor={(b) => b.id}
        onRowClick={(b) => handleEdit(b.id)}
        emptyMessage="No banners yet."
        mobileCard={mobileCard}
      />
    </div>
  );
}
