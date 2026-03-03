'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { BengalBadge } from '@/components/bengal';
import type { Product } from '@/db/schema';
import { cn } from '@/lib/utils';

interface Props {
  product: Product;
  variant?: 'portrait' | 'square';  // for masonry mix
}

export function ProductCard({ product, variant = 'portrait' }: Props) {
  const t      = useTranslations('shop');
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';

  const name = isBn && product.name_bn ? product.name_bn : product.name_en;

  return (
    <Link
      href={`/${locale}/shop/${product.slug}`}
      className="block masonry-item group"
      data-cursor-expand
    >
      <article className="transition-transform duration-300 ease-out group-hover:scale-[1.01]">
        {/* Image */}
        <div
          className={cn(
            'relative overflow-hidden bg-muted rounded-3xl shadow-none ring-1 ring-border/50 hover:shadow-sm transition-shadow duration-300',
            variant === 'portrait' ? 'aspect-4/5' : 'aspect-square'
          )}
        >
          <Image
            src={product.image_url}
            alt={name}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

          {/* Featured badge */}
          {product.is_featured && (
            <div className="absolute top-2 left-2">
              <BengalBadge variant="kansa">
                {isBn ? 'ফিচার্ড' : 'Featured'}
              </BengalBadge>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="pt-2.5 px-0.5">
          <p className="text-[9px] tracking-widest uppercase text-muted-foreground mb-0.5">
            {product.category}
          </p>
          <h3 className={cn(
            'text-sm font-medium text-foreground leading-snug line-clamp-2',
            isBn ? 'font-bengali' : 'font-sans-en'
          )}>
            {name}
          </h3>
          <p className="font-editorial text-primary text-base mt-1">
            ₹{Number(product.price).toLocaleString('en-IN')}
          </p>
        </div>
      </article>
    </Link>
  );
}
