'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { deleteProduct } from '@/actions/products';
import { EntityTable, Column, MobileCardConfig } from './EntityTable';
import { StatusPill } from './StatusPill';
import { BengalBadge } from '@/components/bengal';
import type { Product } from '@/db/schema';

export function ProductTableClient({ initialProducts, locale }: { initialProducts: Product[], locale: string }) {
  const t = useTranslations('admin');
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!window.confirm(t('confirm_delete') || 'Are you sure you want to delete this product?')) return;
    
    setId(id);
    startTransition(async () => {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success('Deleted successfully');
      } catch {
        toast.error('Failed to delete');
      } finally {
        setId(null);
      }
    });
  };

  const handleEdit = (id: number) => {
    router.push(`/${locale}/admin/products/${id}/edit`);
  };

  const columns: Column<Product>[] = [
    {
      key: 'image',
      header: 'Product',
      render: (p) => (
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 shrink-0 rounded-sm overflow-hidden bg-bengal-mati">
            <Image
              src={p.image_url}
              alt={p.name_en}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-bengal-kajal truncate">{p.name_en}</p>
            <div className="flex items-center gap-2 mt-1">
              <BengalBadge variant="mati" className="text-[9px]">{p.category}</BengalBadge>
              {p.is_featured && <BengalBadge variant="kansa" className="text-[9px]">Featured</BengalBadge>}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      className: 'hidden md:table-cell',
      render: (p) => (
        <span className="font-editorial text-bengal-sindoor">
          ₹{Number(p.price).toLocaleString('en-IN')}
        </span>
      ),
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(p.id);
            }}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-bengal-kajal/40 hover:text-bengal-kajal transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => handleDelete(e, p.id)}
            disabled={isPending && pending === p.id}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-bengal-kajal/40 hover:text-bengal-alta transition-colors disabled:opacity-40"
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

  const mobileCard: MobileCardConfig<Product> = {
    leading: (p) => (
      <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-bengal-mati">
        <Image src={p.image_url} alt={p.name_en} fill className="object-cover" sizes="44px" />
      </div>
    ),
    title: (p) => p.name_en,
    subtitle: (p) => (
      <div className="flex items-center gap-2">
        <span className="font-editorial text-bengal-sindoor text-xs">₹{Number(p.price).toLocaleString('en-IN')}</span>
        <StatusPill status={p.status || 'draft'} />
      </div>
    ),
    actions: (p) => (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(p.id);
          }}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-bengal-kajal/40 hover:text-bengal-kajal active:bg-bengal-mati transition-colors touch-manipulation"
        >
          <Edit size={15} />
        </button>
        <button
          onClick={(e) => handleDelete(e, p.id)}
          disabled={isPending && pending === p.id}
          className="w-10 h-10 flex items-center justify-center rounded-lg text-bengal-kajal/40 hover:text-bengal-alta active:bg-bengal-alta/10 transition-colors disabled:opacity-40 touch-manipulation"
        >
          {isPending && pending === p.id ? (
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
        data={products}
        keyExtractor={(p) => p.id}
        onRowClick={(p) => handleEdit(p.id)}
        emptyMessage="No products yet. Add your first saree!"
        mobileCard={mobileCard}
      />
    </div>
  );
}
