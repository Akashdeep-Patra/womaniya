'use client';

import type { Category } from '@/db/schema';

const STATIC_ITEMS = [
  'হাতে বোনা', 'Handwoven Heritage', 'খাঁটি বাংলা',
  'Made in Kolkata', 'Conscious Fashion', 'Artisan Made',
];

interface Props {
  categories?: Category[];
}

export function HeritageTicker({ categories }: Props) {
  const categoryNames = categories && categories.length > 0
    ? categories.flatMap((c) => [c.name_en, ...(c.name_bn ? [c.name_bn] : [])])
    : ['Dhakai Jamdani', 'Chanderi Blouse', 'Ikkat Pochampally', 'Ajrakh Block Print', 'Bengal Tant', 'জামদানি', 'তাঁত', 'আজরখ'];

  const allItems = [...categoryNames, ...STATIC_ITEMS];
  const items = [...allItems, ...allItems];

  return (
    <div className="bg-foreground py-3 overflow-hidden border-y border-primary/20">
      <div className="flex gap-8 whitespace-nowrap animate-ticker-marquee">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8 shrink-0">
            <span className={`text-[11px] tracking-[0.25em] uppercase font-medium text-background/70 ${
              /[\u0980-\u09FF]/.test(item) ? 'font-bengali tracking-normal text-xs' : 'font-sans-en'
            }`}>
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-primary opacity-60 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
