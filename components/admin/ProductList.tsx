'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import { notify } from '@/lib/notify';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteProduct } from '@/actions/products';
import type { Product }  from '@/db/schema';
import { BengalBadge }   from '@/components/bengal';

export function ProductList({ initialProducts }: { initialProducts: Product[] }) {
  const t = useTranslations('admin');
  const [products, setProducts] = useState(initialProducts);
  const [pending, setId] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    if (!window.confirm(t('confirm_delete'))) return;
    setId(id);
    startTransition(async () => {
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        notify.success('product', 'deleted', products.find(p => p.id === id)?.name_en);
      } catch (err) {
        notify.error('product', 'deleted', err);
      } finally {
        setId(null);
      }
    });
  };

  return (
    <div className="flex flex-col gap-0">
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{   opacity: 0, x: -20, height: 0 }}
            className="flex items-center gap-3 py-3 border-b border-bengal-kansa/15 last:border-0"
          >
            {/* Thumbnail */}
            <div className="relative w-14 h-14 flex-shrink-0 rounded-sm overflow-hidden bg-bengal-mati">
              <Image
                src={product.image_url}
                alt={product.name_en}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{product.name_en}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <BengalBadge variant="mati" className="text-[9px]">{product.category}</BengalBadge>
                {product.is_featured && (
                  <BengalBadge variant="kansa" className="text-[9px]">Featured</BengalBadge>
                )}
              </div>
              <p className="font-sans font-semibold tracking-tight text-bengal-sindoor text-sm mt-0.5">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </p>
            </div>

            {/* Delete */}
            <button
              onClick={() => handleDelete(product.id)}
              disabled={isPending && pending === product.id}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-foreground/40 hover:text-bengal-alta transition-colors disabled:opacity-40"
              aria-label={t('delete')}
            >
              {isPending && pending === product.id ? (
                <span className="w-4 h-4 border-2 border-bengal-alta border-t-transparent rounded-full animate-spin" />
              ) : (
                <Trash2 size={18} />
              )}
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      {products.length === 0 && (
        <p className="text-center text-foreground/40 py-12 text-sm">
          No products yet. Add your first saree!
        </p>
      )}
    </div>
  );
}
