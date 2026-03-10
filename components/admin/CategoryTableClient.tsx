'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { Trash2, Edit, ImageOff } from 'lucide-react';
import { notify } from '@/lib/notify';
import { deleteCategory } from '@/actions/categories';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import type { Category } from '@/db/schema';
import Link from 'next/link';

export function CategoryTableClient({ initialCategories, locale }: { initialCategories: Category[], locale: string }) {
  const [categories, setCategories] = useState(initialCategories);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    setId(id);
    startTransition(async () => {
      try {
        await deleteCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
        notify.success('category', 'deleted', categories.find(c => c.id === id)?.name_en);
      } catch (err) {
        notify.error('category', 'deleted', err);
      } finally {
        setId(null);
      }
    });
  };

  const getEditUrl = (id: number) => `/${locale}/admin/categories/${id}/edit`;

  const columns: Column<Category>[] = [
    {
      key: 'image',
      header: '',
      className: 'w-14',
      render: (c) => c.hero_image_url ? (
        <div className="w-10 h-10 rounded-md overflow-hidden bg-muted relative">
          <Image src={c.hero_image_url} alt={c.name_en} fill className="object-cover" sizes="40px" />
        </div>
      ) : (
        <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
          <ImageOff size={16} className="text-muted-foreground/40" />
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Name',
      render: (c) => (
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate">{c.name_en}</p>
          {c.name_bn && (
            <span className="text-muted-foreground font-bengali text-xs">{c.name_bn}</span>
          )}
        </div>
      ),
    },
    {
      key: 'slug',
      header: 'Slug',
      className: 'hidden sm:table-cell',
      render: (c) => <span className="text-xs text-muted-foreground">{c.slug}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (c) => <StatusPill status={c.status} />,
    },
    {
      key: 'order',
      header: 'Order',
      className: 'hidden md:table-cell',
      render: (c) => <span className="text-xs text-muted-foreground">{c.sort_order}</span>,
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

  const mobileCard: MobileCardConfig<Category> = {
    leading: (c) => c.hero_image_url ? (
      <div className="w-11 h-11 rounded-md overflow-hidden bg-muted relative">
        <Image src={c.hero_image_url} alt={c.name_en} fill className="object-cover" sizes="44px" />
      </div>
    ) : (
      <div className="w-11 h-11 rounded-md bg-muted flex items-center justify-center">
        <ImageOff size={16} className="text-muted-foreground/40" />
      </div>
    ),
    title: (c) => c.name_en,
    subtitle: (c) => (
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-muted-foreground">/{c.slug}</span>
        <StatusPill status={c.status} />
      </div>
    ),
    actions: (c) => (
      <>
        <Link href={getEditUrl(c.id)}
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
      data={categories}
      keyExtractor={(c) => c.id}
      getRowHref={(c) => getEditUrl(c.id)}
      emptyMessage="No categories yet."
      mobileCard={mobileCard}
      searchable
      searchPlaceholder="Search categories..."
      getSearchableText={(c) => [c.name_en, c.name_bn, c.slug, c.description_en, c.status].filter(Boolean).join(' ')}
    />
  );
}
