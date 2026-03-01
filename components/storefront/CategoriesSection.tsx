'use client';

import Image         from 'next/image';
import Link          from 'next/link';
import { motion }    from 'framer-motion';
import { useParams } from 'next/navigation';
import { useRef }    from 'react';

const CATS = [
  {
    filter: 'Jamdani',
    en: { name: 'Dhakai Jamdani', sub: 'UNESCO Heritage' },
    bn: { name: 'ঢাকাই জামদানি', sub: 'ইউনেস্কো স্বীকৃত' },
    img: '/hero-placeholder.svg',
    color: 'from-bengal-sindoor/60',
  },
  {
    filter: 'Tant',
    en: { name: 'Bengal Tant', sub: 'Everyday Luxury' },
    bn: { name: 'বাংলার তাঁত', sub: 'রোজকারের বিলাস' },
    img: '/hero-offset-placeholder.svg',
    color: 'from-bengal-kajal/70',
  },
  {
    filter: 'Ikkat',
    en: { name: 'Ikkat', sub: 'Pochampally' },
    bn: { name: 'ইক্কাট', sub: 'পোচামপল্লি' },
    img: '/hero-placeholder.svg',
    color: 'from-bengal-kajal/60',
  },
  {
    filter: 'Ajrakh',
    en: { name: 'Ajrakh', sub: 'Block Print' },
    bn: { name: 'আজরখ', sub: 'ব্লক প্রিন্ট' },
    img: '/hero-offset-placeholder.svg',
    color: 'from-bengal-sindoor/50',
  },
  {
    filter: 'Ready to Wear',
    en: { name: 'Ready to Wear', sub: 'Modern Cut' },
    bn: { name: 'রেডি টু ওয়্যার', sub: 'আধুনিক কাটছাঁট' },
    img: '/hero-placeholder.svg',
    color: 'from-bengal-kajal/65',
  },
] as const;

export function CategoriesSection() {
  const params      = useParams();
  const locale      = params.locale as string;
  const isBn        = locale === 'bn';
  const scrollRef   = useRef<HTMLDivElement>(null);

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

      {/* Carousel — full-bleed, peek next card */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none pl-4 sm:pl-6 pr-4"
        data-lenis-prevent
      >
        {CATS.map(({ filter, en, bn, img, color }, i) => {
          const label = isBn ? bn : en;
          return (
            <motion.div
              key={filter}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex-shrink-0 snap-start
                w-[72vw] max-w-[280px]
                sm:w-[44vw] sm:max-w-[320px]
                md:w-[28vw] md:max-w-[340px]
                lg:flex-1 lg:w-auto lg:max-w-none"
            >
              <Link
                href={`/${locale}/shop?category=${encodeURIComponent(filter)}`}
                className="group relative block aspect-[3/4] rounded-3xl overflow-hidden bg-bengal-mati"
                data-cursor-expand
              >
                {/* Image */}
                <Image
                  src={img}
                  alt={label.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  sizes="(max-width: 640px) 72vw, (max-width: 1024px) 44vw, 20vw"
                />

                {/* Gradient — bottom only, clean */}
                <div className={`absolute inset-0 bg-linear-to-t ${color} via-transparent to-transparent`} />

                {/* Content pinned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  {/* Sub-label */}
                  <p className="text-bengal-kori/60 text-[10px] tracking-widest uppercase font-sans-en mb-1">
                    {label.sub}
                  </p>
                  {/* Name */}
                  <h3 className={`text-bengal-kori text-xl md:text-2xl font-editorial leading-tight ${isBn ? 'font-bengali-serif' : ''}`}>
                    {label.name}
                  </h3>
                </div>

                {/* Hover indicator — kansa dot bottom-right */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-bengal-kori/0 border border-bengal-kori/0 group-hover:bg-bengal-kori/15 group-hover:border-bengal-kori/30 transition-all duration-300 flex items-center justify-center">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-bengal-kori opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* Trailing spacer so last card fully snaps */}
        <div className="flex-shrink-0 w-4 md:w-6" />
      </div>

      {/* Scroll dots — mobile only */}
      <div className="flex justify-center gap-1.5 mt-4 md:hidden">
        {CATS.map((c, i) => (
          <div
            key={c.filter}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === 0 ? 'w-5 bg-bengal-sindoor' : 'w-1.5 bg-bengal-kajal/20'
            }`}
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
