'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { Trash2, Edit } from 'lucide-react';
import { notify } from '@/lib/notify';
import { deleteCollection } from '@/actions/collections';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import { BengalBadge } from '@/components/bengal';
import type { Collection } from '@/db/schema';
import Link from 'next/link';

export function CollectionTableClient({ initialCollections, locale }: { initialCollections: Collection[], locale: string }) {
  const [collections, setCollections] = useState(initialCollections);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this collection?')) return;
    
    setId(id);
    startTransition(async () => {
      try {
        await deleteCollection(id);
        setCollections((prev) => prev.filter((c) => c.id !== id));
        notify.success('collection', 'deleted', collections.find(c => c.id === id)?.name_en);
      } catch (err) {
        notify.error('collection', 'deleted', err);
      } finally {
        setId(null);
      }
    });
  };

  const getEditUrl = (id: number) => `/${locale}/admin/collections/${id}/edit`;

  const getImage = (c: Collection) => ((c.carousel_images as string[] | null) ?? [])[0];

  const columns: Column<Collection>[] = [
    {
      key: 'image',
      header: 'Collection',
      render: (c) => (
        <div className="flex items-center gap-3">
          {getImage(c) ? (
            <div className="relative w-16 h-10 shrink-0 rounded-md overflow-hidden bg-muted">
              <Image
                src={getImage(c)!}
                alt={c.name_en}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
          ) : (
            <div className="w-16 h-10 shrink-0 rounded-md bg-muted border border-border flex items-center justify-center text-[10px] text-muted-foreground uppercase tracking-widest">
              No Img
            </div>
          )}
          <div className="min-w-0 flex flex-col items-start gap-1">
            <p className="font-medium text-foreground truncate">{c.name_en}</p>
            {c.is_featured && (
              <BengalBadge variant="kansa" className="text-[9px]">Featured</BengalBadge>
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
          <Link prefetch={true} href={getEditUrl(c.id)}
            
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

  const mobileCard: MobileCardConfig<Collection> = {
    leading: (c) => {
      const img = getImage(c);
      return img ? (
        <div className="relative w-11 h-11 rounded-md overflow-hidden bg-muted">
          <Image src={img} alt={c.name_en} fill className="object-cover" sizes="44px" />
        </div>
      ) : (
        <div className="w-11 h-11 rounded-md bg-muted border border-border flex items-center justify-center text-[8px] text-muted-foreground uppercase">
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
        <Link  href={getEditUrl(c.id)}
          
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
      data={collections}
      keyExtractor={(c) => c.id}
      getRowHref={(c) => getEditUrl(c.id)}
      emptyMessage="No collections yet. Create your first collection!"
      mobileCard={mobileCard}
      searchable
      searchPlaceholder="Search collections..."
      getSearchableText={(c) => [c.name_en, c.name_bn, c.slug, c.description_en, c.description_bn, c.status].filter(Boolean).join(' ')}
    />
  );
}
