'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { productOrderUrl } from '@/lib/whatsapp';
import { toast } from 'sonner';
import { BengalButton } from '@/components/bengal';
import { ShareButton } from './ShareButton';
import { Check, Truck, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductOrderSectionProps {
  product: {
    name_en: string;
    name_bn: string | null;
    price: string | number;
    sku: string | null;
    sizes: string[] | null;
    colors: string[] | null;
    stock_status: string;
    delivery_info: string | null;
  };
  locale: string;
  isBn: boolean;
  waNumber?: string;
}

export function ProductOrderSection({ product, locale, isBn, waNumber }: ProductOrderSectionProps) {
  const t = useTranslations('product');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const hasSizes = product.sizes && product.sizes.length > 0;
  const hasColors = product.colors && product.colors.length > 0;
  const isOutOfStock = product.stock_status === 'out_of_stock';
  const isMadeToOrder = product.stock_status === 'made_to_order';

  const handleOrderClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (isOutOfStock) {
      e.preventDefault();
      return;
    }
    if (hasSizes && !selectedSize) {
      e.preventDefault();
      toast.error(isBn ? 'দয়া করে একটি সাইজ নির্বাচন করুন' : 'Please select a size');
      return;
    }
    if (hasColors && !selectedColor) {
      e.preventDefault();
      toast.error(isBn ? 'দয়া করে একটি রঙ নির্বাচন করুন' : 'Please select a color');
      return;
    }
  };

  const name = isBn && product.name_bn ? product.name_bn : product.name_en;
  const [pageUrl, setPageUrl] = useState<string | undefined>(undefined);
  useEffect(() => { setPageUrl(window.location.href); }, []);
  const waUrl = productOrderUrl(name, product.price, locale, product.sku, selectedSize, selectedColor, waNumber, pageUrl);

  return (
    <div className="flex flex-col gap-5">
      {/* Size Selection */}
      {hasSizes && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans-en font-medium">
              {isBn ? 'সাইজ' : 'Size'}
            </span>
            {selectedSize && (
              <span className="text-xs text-primary font-medium font-sans-en">{selectedSize}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes!.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'min-h-[42px] min-w-[42px] px-4 rounded-full border transition-all duration-200 touch-manipulation flex items-center justify-center gap-1.5',
                  selectedSize === size
                    ? 'bg-foreground text-background border-foreground shadow-sm'
                    : 'bg-background text-foreground border-border hover:border-foreground/40'
                )}
              >
                {selectedSize === size && <Check size={13} strokeWidth={2.5} />}
                <span className="font-sans-en text-sm font-medium">{size}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Selection */}
      {hasColors && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-sans-en font-medium">
              {isBn ? 'রঙ' : 'Color'}
            </span>
            {selectedColor && (
              <span className="text-xs text-primary font-medium font-sans-en">{selectedColor}</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {product.colors!.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  'min-h-[42px] min-w-[42px] px-4 rounded-full border transition-all duration-200 touch-manipulation flex items-center justify-center gap-1.5',
                  selectedColor === color
                    ? 'bg-foreground text-background border-foreground shadow-sm'
                    : 'bg-background text-foreground border-border hover:border-foreground/40'
                )}
              >
                {selectedColor === color && <Check size={13} strokeWidth={2.5} />}
                <span className="font-sans-en text-sm font-medium">{color}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Separator if options exist */}
      {(hasSizes || hasColors) && <div className="border-t border-border/50" />}

      {/* Action Buttons */}
      <div className="flex flex-col gap-2.5">
        <a
          href={isOutOfStock ? '#' : waUrl}
          target={isOutOfStock ? undefined : '_blank'}
          rel="noopener noreferrer"
          className={cn('w-full', isOutOfStock && 'opacity-50 cursor-not-allowed')}
          onClick={handleOrderClick}
        >
          <BengalButton
            variant={isOutOfStock ? 'outline' : 'whatsapp'}
            size="touch"
            isBengali={isBn}
            className="w-full text-base font-medium"
            disabled={isOutOfStock}
          >
            {!isOutOfStock && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="mr-2.5 flex-shrink-0 inline">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            )}
            {isOutOfStock ? (isBn ? 'স্টক নেই' : 'Out of Stock') : t('whatsapp_order')}
          </BengalButton>
        </a>

        <ShareButton />
      </div>

      {/* Stock & Delivery Info */}
      <div className="flex flex-col gap-2">
        {isMadeToOrder && (
          <p className={cn(
            'text-xs text-accent flex items-center gap-2',
            isBn ? 'font-bengali' : 'font-sans-en'
          )}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block shrink-0" />
            {isBn ? 'অর্ডার অনুযায়ী তৈরি — ৭-১০ দিন' : 'Made to order — 7-10 days'}
          </p>
        )}
        {product.delivery_info && (
          <p className={cn(
            'text-xs text-muted-foreground flex items-center gap-2',
            isBn ? 'font-bengali' : 'font-sans-en'
          )}>
            <Truck size={13} className="shrink-0" />
            {product.delivery_info}
          </p>
        )}
      </div>
    </div>
  );
}
