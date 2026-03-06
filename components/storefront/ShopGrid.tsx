'use client';

import { useState, Fragment } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { CategoryFilter } from './CategoryFilter';
import { ProductCard }    from './ProductCard';
import { EmptyState } from './EmptyState';
import { BannerDisplay } from './BannerDisplay';
import type { Product, Category } from '@/db/schema';
import { ArrowRight } from 'lucide-react';

interface Props {
  products: Product[];
  categories?: Category[];
  isCompact?: boolean;
  banners?: any[];
}

export function ShopGrid({ products, categories, isCompact = false, banners = [] }: Props) {
  const t = useTranslations('shop');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  // If compact, limit to 4 or 8 items depending on preference. Let's do 4.
  const displayLimit = isCompact ? 4 : undefined;
  const displayProducts = displayLimit ? filtered.slice(0, displayLimit) : filtered;

  const inlineBanners = banners.filter(b => b.placement === 'inline' && b.status === 'published');

  return (
    <section className="px-4 sm:px-6 py-12 md:py-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
        <div>
          {isCompact ? (
            <h2 className="font-ancient text-4xl md:text-5xl text-foreground mb-2">
              {t('title')}
            </h2>
          ) : (
            <h1 className="font-ancient text-4xl md:text-5xl text-foreground mb-2">
              {t('title')}
            </h1>
          )}
          <p className="text-muted-foreground text-sm md:text-base max-w-xl font-sans-en">
            {t('subtitle')}
          </p>
        </div>
        
        {isCompact && (
          <Link prefetch={true} href={`/${locale}/shop`}
            
            className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-medium text-foreground hover:text-primary transition-colors group"
          >
            Explore All
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>

      {/* Filters */}
      <div className="mb-8 md:mb-10">
        <CategoryFilter
          active={activeCategory}
          onChange={setActiveCategory}
          categories={categories}
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {displayProducts.map((product, index) => (
            <Fragment key={product.id}>
              <div className="break-inside-avoid">
                <ProductCard product={product} variant="portrait" />
              </div>
              
              {/* Inject banner after 4th item if not compact */}
              {!isCompact && index === 3 && inlineBanners.length > 0 && (
                <div className="col-span-2 md:col-span-3 lg:col-span-4 mt-4 mb-4 rounded-2xl overflow-hidden shadow-sm">
                  <BannerDisplay banner={inlineBanners[0]} locale={locale} />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}

      {/* Mobile View All Button */}
      {isCompact && (
        <div className="mt-10 flex justify-center md:hidden">
          <Link  href={`/${locale}/shop`}
            
            className="flex items-center justify-center gap-2 h-12 px-8 bg-primary text-primary-foreground text-[11px] tracking-[0.2em] uppercase font-medium rounded-full shadow-none ring-1 ring-border/50 hover:shadow-sm transition-all"
          >
            Explore All Collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
