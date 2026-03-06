'use client';

import { useState, useTransition } from 'react';
import { Trash2, Edit, Star } from 'lucide-react';
import { notify } from '@/lib/notify';
import { deleteTestimonial } from '@/actions/testimonials';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import { BengalBadge } from '@/components/bengal';
import { SourceBadge } from './SourceBadge';
import type { Testimonial } from '@/db/schema';
import Link from 'next/link';

export function TestimonialTableClient({ initialTestimonials, locale }: { initialTestimonials: Testimonial[]; locale: string }) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return;

    setId(id);
    startTransition(async () => {
      try {
        await deleteTestimonial(id);
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
        notify.success('testimonial', 'deleted', testimonials.find(t => t.id === id)?.author_name);
      } catch (err) {
        notify.error('testimonial', 'deleted', err);
      } finally {
        setId(null);
      }
    });
  };

  const getEditUrl = (id: number) => `/${locale}/admin/testimonials/${id}/edit`;

  const truncate = (str: string, len: number) => str.length > len ? str.slice(0, len) + '...' : str;

  const columns: Column<Testimonial>[] = [
    {
      key: 'quote',
      header: 'Testimonial',
      render: (t) => (
        <div className="flex flex-col gap-1 max-w-md">
          <p className="font-medium text-foreground text-sm leading-snug">
            &ldquo;{truncate(t.quote_en, 80)}&rdquo;
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{t.author_name}</span>
            {t.author_title && (
              <span className="text-xs text-muted-foreground/60">&middot; {t.author_title}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'source',
      header: 'Source',
      render: (t) => <SourceBadge source={t.source} />,
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (t) => t.rating ? (
        <div className="flex items-center gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
          ))}
        </div>
      ) : (
        <span className="text-xs text-muted-foreground">—</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (t) => <StatusPill status={t.status || 'draft'} />,
    },
    {
      key: 'actions',
      header: '',
      render: (t) => (
        <div className="flex items-center justify-end gap-1">
          <Link prefetch={true} href={getEditUrl(t.id)}
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <Edit size={16} />
          </Link>
          <button
            onClick={(e) => handleDelete(e, t.id)}
            disabled={isPending && pending === t.id}
            className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-40"
          >
            {isPending && pending === t.id ? (
              <span className="block w-4 h-4 border-2 border-destructive border-t-transparent rounded-full animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      ),
    },
  ];

  const mobileCard: MobileCardConfig<Testimonial> = {
    leading: (t) => <SourceBadge source={t.source} />,
    title: (t) => `"${truncate(t.quote_en, 50)}"`,
    subtitle: (t) => (
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">{t.author_name}</span>
        <StatusPill status={t.status || 'draft'} />
      </div>
    ),
    actions: (t) => (
      <>
        <Link href={getEditUrl(t.id)}
          onClick={(e) => e.stopPropagation()}
          className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground active:bg-muted transition-colors touch-manipulation"
        >
          <Edit size={15} />
        </Link>
        <button
          onClick={(e) => handleDelete(e, t.id)}
          disabled={isPending && pending === t.id}
          className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive active:bg-destructive/10 transition-colors disabled:opacity-40 touch-manipulation"
        >
          {isPending && pending === t.id ? (
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
      data={testimonials}
      keyExtractor={(t) => t.id}
      getRowHref={(t) => getEditUrl(t.id)}
      emptyMessage="No testimonials yet."
      mobileCard={mobileCard}
    />
  );
}
