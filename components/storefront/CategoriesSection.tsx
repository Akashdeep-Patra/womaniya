'use client';

import Image           from 'next/image';
import Link            from 'next/link';
import { motion }      from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useParams }   from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  { key: 'jamdani', filter: 'Jamdani',       aspect: 'aspect-3/4',     span: 'md:col-span-2 md:row-span-2' },
  { key: 'ikkat',   filter: 'Ikkat',          aspect: 'aspect-square',  span: 'md:col-span-1' },
  { key: 'ajrakh',  filter: 'Ajrakh',         aspect: 'aspect-square',  span: 'md:col-span-1' },
  { key: 'tant',    filter: 'Tant',           aspect: 'aspect-3/4',     span: 'md:col-span-1' },
  { key: 'rtw',     filter: 'Ready to Wear',  aspect: 'aspect-3/4',     span: 'md:col-span-1' },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

export function CategoriesSection() {
  const t      = useTranslations('categories');
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';

  return (
    <section className="px-4 sm:px-6 py-12 md:py-20 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-12"
      >
        <p className="text-[10px] tracking-[0.3em] uppercase text-bengal-kansa mb-2 font-sans-en">
          {isBn ? 'কালেকশন বিভাগ' : 'Browse by Category'}
        </p>
        <h2 className={`font-editorial text-3xl md:text-4xl text-bengal-kajal ${isBn ? 'font-bengali-serif' : ''}`}>
          {isBn ? 'আমাদের সংগ্রহ' : 'The Living Crafts'}
        </h2>
      </motion.div>

      {/* Mobile: horizontal scroll — prevent Lenis from capturing so horizontal swipe works */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden scrollbar-none -mx-4 px-4" data-lenis-prevent>
        {CATEGORIES.map(({ key, filter }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="flex-shrink-0 w-52 snap-start"
          >
            <Link href={`/${locale}/shop?category=${encodeURIComponent(filter)}`}>
              <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-bengal-mati group">
                <Image
                  src="/hero-placeholder.svg"
                  alt={filter}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="208px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-bengal-kajal/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className={`text-bengal-kori font-semibold text-sm leading-tight ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                    {t(`${key}_title` as any)}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Desktop: editorial grid */}
      <motion.div
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="hidden md:grid grid-cols-4 grid-rows-2 gap-4 h-[640px]"
      >
        {CATEGORIES.map(({ key, filter, span }) => (
          <motion.div key={key} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className={span}>
            <Link
              href={`/${locale}/shop?category=${encodeURIComponent(filter)}`}
              className="block h-full relative rounded-2xl overflow-hidden bg-bengal-mati group"
              data-cursor-expand
            >
              <Image
                src="/hero-placeholder.svg"
                alt={filter}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1280px) 50vw, 33vw"
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-bengal-kajal/75 via-bengal-kajal/10 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <p className="text-bengal-kansa text-[10px] tracking-widest uppercase mb-1 font-sans-en">
                  {filter}
                </p>
                <h3 className={`text-bengal-kori font-semibold text-lg leading-snug mb-1 ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                  {t(`${key}_title` as any)}
                </h3>
                <p className={`text-bengal-kori/60 text-xs leading-relaxed line-clamp-2 ${isBn ? 'font-bengali' : ''}`}>
                  {t(`${key}_desc` as any)}
                </p>
              </div>

              {/* Arrow icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bengal-kori/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight size={16} className="text-bengal-kori" />
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
