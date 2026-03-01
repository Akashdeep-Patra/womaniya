'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { deleteBanner } from '@/actions/banners';
import { EntityTable, Column } from './EntityTable';
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

  const columns: Column<Banner>[] = [
    {
      key: 'image',
      header: 'Banner',
      render: (b) => (
        <div className="flex items-center gap-3">
          <div className="relative w-20 h-10 flex-shrink-0 rounded-sm overflow-hidden bg-bengal-mati">
            <Image
              src={b.image_url}
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
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(b.id);
            }}
            className="p-2 text-bengal-kajal/40 hover:text-bengal-kajal transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(e, b.id)}
            disabled={isPending && pending === b.id}
            className="p-2 text-bengal-kajal/40 hover:text-bengal-alta transition-colors disabled:opacity-40"
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

  return (
    <div className="bg-bengal-kori/50 rounded-2xl border border-bengal-kansa/20 overflow-hidden">
      <EntityTable
        columns={columns}
        data={banners}
        keyExtractor={(b) => b.id}
        onRowClick={(b) => handleEdit(b.id)}
        emptyMessage="No banners yet."
      />
    </div>
  );
}