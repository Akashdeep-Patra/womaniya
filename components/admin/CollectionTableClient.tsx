'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { deleteCollection } from '@/actions/collections';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import { BengalBadge } from '@/components/bengal';
import type { Collection } from '@/db/schema';

export function CollectionTableClient({ initialCollections, locale }: { initialCollections: Collection[], locale: string }) {
  const router = useRouter();
  const [collections, setCollections] = useState(initialCollections);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this collection?')) return;
    
    setId(id);
    startTransition(async () => {
      try {
        await deleteCollection(id);
        setCollections((prev) => prev.filter((c) => c.id !== id));
        toast.success('Deleted successfully');
      } catch {
        toast.error('Failed to delete');
      } finally {
        setId(null);
      }
    });
  };

  const handleEdit = (id: number) => {
    router.push(`/${locale}/admin/collections/${id}/edit`);
  };

  const getImage = (c: Collection) => ((c.carousel_images as string[] | null) ?? [])[0];

  const columns: Column<Collection>[] = [
    {
      key: 'image',
      header: 'Collection',
      render: (c) => (
        <div className="flex items-center gap-3">
          {getImage(c) ? (
            <div className="relative w-16 h-10 shrink-0 rounded-sm overflow-hidden bg-bengal-mati">
              <Image
                src={getImage(c)!}
                alt={c.name_en}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="w-16 h-10 shrink-0 rounded-sm bg-bengal-mati border border-bengal-kansa/20 flex items-center justify-center text-[10px] text-bengal-kajal/30 uppercase tracking-widest">
              No Img
            </div>
          )}
          <div className="min-w-0">
            <p className="font-medium text-bengal-kajal truncate">{c.name_en}</p>
            {c.is_featured && (
              <BengalBadge variant="kansa" className="text-[9px] mt-1">Featured</BengalBadge>
            )}
          </div>
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

  const mobileCard: MobileCardConfig<Collection> = {
    leading: (c) => {
      const img = getImage(c);
      return img ? (
        <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-bengal-mati">
          <Image src={img} alt={c.name_en} fill className="object-cover" sizes="44px" />
        </div>
      ) : (
        <div className="w-11 h-11 rounded-lg bg-bengal-mati border border-bengal-kansa/20 flex items-center justify-center text-[8px] text-bengal-kajal/30 uppercase">
          N/A
        </div>
      );
    },
    title: (c) => c.name_en,
    subtitle: (c) => (
      <div className="flex items-center gap-2">
        <StatusPill status={c.status || 'draft'} />
        {c.is_featured && <BengalBadge variant="kansa" className="text-[8px]">Featured</BengalBadge>}
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
        data={collections}
        keyExtractor={(c) => c.id}
        onRowClick={(c) => handleEdit(c.id)}
        emptyMessage="No collections yet. Create your first collection!"
        mobileCard={mobileCard}
      />
    </div>
  );
}
