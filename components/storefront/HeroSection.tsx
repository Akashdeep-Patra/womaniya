'use client';

import Image from 'next/image';
import Link  from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef }           from 'react';
import { useTranslations }  from 'next-intl';
import { useParams }        from 'next/navigation';
import { BengalButton }     from '@/components/bengal';
import { BengalBadge }      from '@/components/bengal';
import { ArrowDown }        from 'lucide-react';

export function HeroSection() {
  const t      = useTranslations('hero');
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY }     = useScroll();
  const parallaxMain   = useTransform(scrollY, [0, 600], [0, -60]);
  const parallaxOffset = useTransform(scrollY, [0, 600], [0,  30]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-bengal-kori pt-14 md:pt-16"
    >
      {/* ══════════════════════════════
          MOBILE LAYOUT (< md)
      ══════════════════════════════ */}
      <div className="md:hidden">

        {/* Full-bleed hero image — fixed natural aspect ratio, no flex tricks */}
        <div className="relative w-full aspect-3/4 overflow-hidden">
          <Image
            src="/hero-placeholder.svg"
            alt={isBn ? 'বাংলার হ্যান্ডলুম শাড়ি' : 'Handwoven Bengali saree'}
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Soft bottom fade into page */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-bengal-kori/80" />

          {/* Floating badge top-left */}
          <div className="absolute top-4 left-4">
            <BengalBadge variant="kajal">
              {t('badge')}
            </BengalBadge>
          </div>
        </div>

        {/* Text content — natural flow, no overflow issues */}
        <div className="px-5 pt-6 pb-8 flex flex-col gap-5">

          <h1 className={`leading-[0.9] text-bengal-kajal ${isBn ? 'font-bengali-serif text-4xl' : 'font-editorial text-[clamp(2.8rem,12vw,4rem)]'}`}>
            {t('headline_1')}<br />
            <span className="text-bengal-sindoor">{t('headline_2')}</span><br />
            {t('headline_3')}
          </h1>

          <p className={`text-bengal-kajal/60 text-[15px] leading-relaxed ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex gap-3 pt-1">
            <Link href={`/${locale}/shop`} className="flex-1">
              <BengalButton variant="primary" size="touch" isBengali={isBn} className="rounded-md">
                {t('cta_shop')}
              </BengalButton>
            </Link>
            <Link href={`/${locale}#story`}>
              <BengalButton variant="outline" size="touch" isBengali={isBn} className="px-5 rounded-md">
                {t('cta_story')}
              </BengalButton>
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center gap-3 mt-2">
            <div className="h-px flex-1 bg-bengal-kansa/30" />
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ArrowDown size={14} className="text-bengal-kansa" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════
          DESKTOP LAYOUT (≥ md)
      ══════════════════════════════ */}
      <div className="hidden md:grid md:grid-cols-2 min-h-[calc(100vh-4rem)]">

        {/* Left column — text */}
        <div className="flex flex-col justify-center px-8 lg:px-16 xl:px-20 py-16">
          <BengalBadge variant="kansa" className="self-start mb-8">
            {t('badge')}
          </BengalBadge>

          <h1
            className={`leading-[0.88] text-bengal-kajal mb-6 ${isBn ? 'font-bengali-serif' : 'font-editorial'}`}
            style={{ fontSize: 'clamp(3.5rem, 6vw, 7.5rem)' }}
          >
            {t('headline_1')}<br />
            <span className="text-bengal-sindoor">{t('headline_2')}</span><br />
            {t('headline_3')}
          </h1>

          <p className={`text-bengal-kajal/60 text-base leading-relaxed max-w-sm mb-10 ${isBn ? 'font-bengali' : ''}`}>
            {t('subtitle')}
          </p>

          <div className="flex gap-4">
            <Link href={`/${locale}/shop`}>
              <BengalButton variant="primary" size="lg" isBengali={isBn}>
                {t('cta_shop')}
              </BengalButton>
            </Link>
            <Link href={`/${locale}#story`}>
              <BengalButton variant="outline" size="lg" isBengali={isBn}>
                {t('cta_story')}
              </BengalButton>
            </Link>
          </div>

          {/* Vertical scroll hint */}
          <div className="flex items-center gap-3 mt-16">
            <div className="w-px h-10 bg-bengal-kansa/40" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-bengal-kajal/35">
              {isBn ? 'নিচে স্ক্রোল করুন' : 'Scroll to explore'}
            </span>
          </div>
        </div>

        {/* Right column — editorial images */}
        <div className="relative overflow-hidden">
          {/* Main image */}
          <motion.div
            style={{ y: parallaxMain }}
            className="absolute inset-0 top-4 right-0 bottom-0 left-8"
            data-cursor-expand
          >
            <Image
              src="/hero-placeholder.svg"
              alt={isBn ? 'বাংলার শাড়ি' : 'Bengali saree'}
              fill
              priority
              className="object-cover object-top rounded-tl-sm"
              sizes="50vw"
            />
          </motion.div>

          {/* Floating offset card */}
          <motion.div
            style={{ y: parallaxOffset }}
            className="absolute bottom-12 -left-8 w-48 aspect-square rounded-sm overflow-hidden shadow-2xl border-4 border-bengal-kori z-10"
            data-cursor-expand
          >
            <Image
              src="/hero-offset-placeholder.svg"
              alt={isBn ? 'জামদানির বুনন' : 'Jamdani weave detail'}
              fill
              className="object-cover"
              sizes="200px"
            />
          </motion.div>

          {/* Gold vertical accent */}
          <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-bengal-kansa/60 to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
