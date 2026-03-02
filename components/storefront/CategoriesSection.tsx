'use client';

import Link          from 'next/link';
import Image         from 'next/image';
import { motion }    from 'framer-motion';
import { useParams } from 'next/navigation';
import { useRef }    from 'react';
import type { Category } from '@/db/schema';

const GRADIENT_COLORS = [
  'from-bengal-sindoor/60',
  'from-bengal-kajal/65',
  'from-bengal-kajal/70',
  'from-bengal-kajal/60',
  'from-bengal-sindoor/50',
  'from-bengal-kajal/65',
];

const FALLBACK_BGS = [
  'bg-gradient-to-br from-bengal-sindoor/20 to-bengal-kansa/10',
  'bg-gradient-to-br from-bengal-kansa/20 to-bengal-sindoor/10',
  'bg-gradient-to-br from-bengal-mati/40 to-bengal-dust/30',
  'bg-gradient-to-br from-bengal-kajal/15 to-bengal-mati/20',
  'bg-gradient-to-br from-bengal-sindoor/15 to-bengal-kajal/10',
  'bg-gradient-to-br from-bengal-dust/30 to-bengal-kori/20',
];

interface Props {
  categories: Category[];
}

export function CategoriesSection({ categories }: Props) {
  const params      = useParams();
  const locale      = params.locale as string;
  const isBn        = locale === 'bn';
  const scrollRef   = useRef<HTMLDivElement>(null);

  if (categories.length === 0) return null;

  return (
    <section className="py-12 md:py-20">

      {/* Header */}
      <div className="px-4 sm:px-6 max-w-7xl mx-auto mb-6 md:mb-8 flex items-center justify-between">
        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-bengal-kansa/80 mb-1.5 font-sans-en">
            {isBn ? 'কারুকাজ অনুযায়ী' : 'Browse by craft'}
          </p>
          <h2 className={`font-editorial text-2xl md:text-3xl text-bengal-kajal ${isBn ? 'font-bengali-serif' : ''}`}>
            {isBn ? 'জীবন্ত কারুকাজ' : 'The Living Crafts'}
          </h2>
        </div>
        <Link
          href={`/${locale}/shop`}
          className="text-[11px] tracking-widest uppercase text-bengal-kajal/40 hover:text-bengal-sindoor transition-colors font-sans-en hidden md:block"
        >
          All →
        </Link>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none pl-4 sm:pl-6 pr-4"
        data-lenis-prevent
      >
        {categories.map((cat, i) => {
          const name = isBn && cat.name_bn ? cat.name_bn : cat.name_en;
          const desc = isBn && cat.description_bn ? cat.description_bn : cat.description_en;
          const color = GRADIENT_COLORS[i % GRADIENT_COLORS.length];
          const fallbackBg = FALLBACK_BGS[i % FALLBACK_BGS.length];
          const hasImage = !!cat.hero_image_url;

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="shrink-0 snap-start w-[72vw] max-w-[280px] sm:w-[44vw] sm:max-w-[320px] md:w-[28vw] md:max-w-[340px] lg:flex-1 lg:w-auto lg:max-w-none"
            >
              <Link
                href={`/${locale}/category/${cat.slug}`}
                className={`group relative block aspect-3/4 rounded-3xl overflow-hidden ${hasImage ? 'bg-bengal-mati' : fallbackBg}`}
                data-cursor-expand
              >
                {hasImage ? (
                  <Image
                    src={cat.hero_image_url!}
                    alt={name}
                    fill
                    className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 72vw, (max-width: 1024px) 44vw, 20vw"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)',
                      backgroundSize: '20px 20px',
                    }} />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-linear-to-t ${color} via-transparent to-transparent`} />

                {/* Content pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  {desc && (
                    <p className="text-bengal-kori/60 text-[10px] tracking-widest uppercase font-sans-en mb-1 line-clamp-1">
                      {desc.slice(0, 40)}
                    </p>
                  )}
                  <h3 className={`text-bengal-kori text-xl md:text-2xl font-editorial leading-tight ${isBn ? 'font-bengali-serif' : ''}`}>
                    {name}
                  </h3>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-bengal-kori/0 border border-bengal-kori/0 group-hover:bg-bengal-kori/15 group-hover:border-bengal-kori/30 transition-all duration-300 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-bengal-kori opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          );
        })}

        <div className="shrink-0 w-4 md:w-6" />
      </div>

      {/* Scroll dots — mobile only */}
      <div className="flex justify-center gap-1.5 mt-4 md:hidden">
        {categories.map((c, i) => (
          <div
            key={c.id}
            className={`h-1 rounded-full transition-all duration-300 ${i === 0 ? 'w-5 bg-bengal-sindoor' : 'w-1.5 bg-bengal-kajal/20'}`}
          />
        ))}
      </div>

      {/* Mobile view-all */}
      <div className="flex justify-center mt-5 md:hidden">
        <Link
          href={`/${locale}/shop`}
          className="text-[11px] tracking-widest uppercase text-bengal-kajal/50 hover:text-bengal-kajal transition-colors font-sans-en"
        >
          {isBn ? 'সব দেখো →' : 'View all crafts →'}
        </Link>
      </div>
    </section>
  );
}
