'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard }    from './ProductCard';
import type { Product, Category } from '@/db/schema';

interface Props {
  products: Product[];
  categories?: Category[];
}

export function ShopGrid({ products, categories }: Props) {
  const t = useTranslations('shop');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const variant = (i: number): 'portrait' | 'square' =>
    i % 3 === 2 ? 'square' : 'portrait';

  return (
    <section className="px-4 sm:px-6 py-8 md:py-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2 className="font-editorial text-3xl md:text-4xl text-bengal-kajal mb-1">
          {t('title')}
        </h2>
        <p className="text-bengal-kajal/55 text-sm">{t('subtitle')}</p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          categories={categories}
        />
      </div>

      {/* Masonry grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-bengal-kajal/50 py-16 text-sm">{t('no_products')}</p>
      ) : (
        <div className="masonry-grid">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} variant={variant(i)} />
          ))}
        </div>
      )}
    </section>
  );
}
