'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { BengalWomanHero } from '@/components/illustrations/BengalWomanHero';
import { LoomWeaver } from '@/components/illustrations/LoomWeaver';
import { BengalVillage } from '@/components/illustrations/BengalVillage';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isBn = locale === 'bn';

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const parallaxMain = useTransform(scrollY, [0, 1000], [0, -100]);
  const parallaxOffset1 = useTransform(scrollY, [0, 1000], [0, 50]);
  const parallaxOffset2 = useTransform(scrollY, [0, 1000], [0, -40]);
  const textParallax = useTransform(scrollY, [0, 800], [0, -30]);

  /* Parallax elements use will-change for GPU compositing */
  const parallaxStyle = { willChange: 'transform' as const };

  return (
    <section
      ref={sectionRef}
      className="relative bg-bengal-kori pt-14 md:pt-0 min-h-svh flex flex-col overflow-hidden"
    >
      {/* ── BACKGROUND ARCHITECTURE ─────────────────────────────────── */}
      {/* Intricate Zari (Gold) Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute left-6 md:left-[8%] top-0 bottom-0 w-px bg-bengal-kansa/30" />
        <div className="absolute right-6 md:right-[8%] top-0 bottom-0 w-px bg-bengal-kansa/30" />
        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-bengal-kansa/20" />
        <div className="absolute left-0 right-0 top-[20%] h-px bg-bengal-kansa/20" />
        <div className="absolute left-0 right-0 bottom-[15%] h-px bg-bengal-kansa/20" />
      </div>

      {/* ── MOBILE ───────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 md:hidden">
        {/* Intro Label */}
        <div className="px-6 pt-6 pb-2 relative z-10 flex justify-between items-center text-[9px] tracking-[0.3em] uppercase text-bengal-kansa/80 font-sans-en">
          <span>{t('intro')}</span>
          <span>{t('since')}</span>
        </div>

        {/* Layered Image Composition */}
        <div className="relative w-full aspect-4/5 mt-4">
          <motion.div style={{ y: parallaxMain, ...parallaxStyle }} className="absolute inset-x-6 top-0 bottom-12 z-0 flex items-center justify-center">
            <BengalWomanHero />
          </motion.div>

          <motion.div style={{ y: parallaxOffset1, ...parallaxStyle }} className="absolute -right-4 bottom-4 w-32 aspect-3/4 z-10 flex items-center justify-center">
            <LoomWeaver />
          </motion.div>

          {/* Strong fade to page colour */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-bengal-kori z-10 pointer-events-none" />
        </div>

        {/* Copy — intertwining with images */}
        <div className="px-6 pb-20 -mt-16 flex flex-col gap-6 relative z-20">
          <h1 className={`leading-[0.85] text-bengal-kajal tracking-tight ${
            isBn ? 'font-bengali-serif text-[4rem]' : 'font-ancient text-[4rem]'
          }`}>
            <span className="block mb-1">{t('headline_1')}</span>
            <span className={`block text-bengal-sindoor ${isBn ? '' : 'italic'} pl-12`}>{t('headline_2')}</span>
            <span className="block mt-1 pl-4">{t('headline_3')}</span>
          </h1>

          <div className="w-8 h-[2px] bg-bengal-kansa" />

          <p className={`text-bengal-kajal/70 text-[14px] leading-relaxed max-w-[280px] ${isBn ? 'font-bengali tracking-wide' : 'font-sans-en'}`}>
            {t('subtitle')}
          </p>

          <div className="flex items-center gap-5 pt-2">
            <Link
              href={`/${locale}/shop`}
              className="inline-flex items-center h-12 px-7 bg-bengal-kajal text-bengal-kori text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-bengal-sindoor transition-all duration-300 rounded-full shadow-lg shadow-black/10 hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('cta_shop')}
            </Link>
            <Link
              href={`/${locale}#story`}
              className={`text-bengal-sindoor text-xs tracking-widest uppercase border-b border-bengal-sindoor/30 pb-1 hover:border-bengal-sindoor transition-colors ${isBn ? 'font-bengali' : 'font-sans-en'}`}
            >
              {t('cta_story')}
            </Link>
          </div>
        </div>
      </div>

      {/* ── DESKTOP ──────────────────────────────────────────── */}
      <div className="hidden md:flex min-h-svh pt-24 px-[8%] relative items-center justify-between">

        {/* Rotated Vertical Label */}
        <div className="absolute left-[3%] top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[10px] tracking-[0.4em] uppercase text-bengal-kansa/60 font-sans-en whitespace-nowrap z-20">
          {t('stamp')} — {t('since')}
        </div>

        {/* 1. Typography Column (Left) */}
        <motion.div
          style={{ y: textParallax, ...parallaxStyle }}
          className="w-[45%] flex flex-col justify-center relative z-20 pr-10"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-bengal-kansa/50" />
            <p className="text-[10px] tracking-[0.35em] uppercase text-bengal-kansa font-sans-en font-medium">
              {t('badge')}
            </p>
          </div>

          <h1
            className={`leading-[0.85] text-bengal-kajal mb-10 relative tracking-tighter ${isBn ? 'font-bengali-serif' : 'font-ancient'}`}
            style={{ fontSize: 'clamp(5rem, 8vw, 9rem)' }}
          >
            <span className="block transform -translate-x-6">{t('headline_1')}</span>
            <span className={`block text-bengal-sindoor my-1 transform translate-x-16 ${isBn ? '' : 'italic'}`}>
              {t('headline_2')}
            </span>
            <span className="block transform -translate-x-2 relative z-20">
              {t('headline_3')}
            </span>
          </h1>

          <p className={`text-bengal-kajal/60 text-[1.05rem] leading-loose max-w-[380px] mb-12 pl-4 border-l-2 border-bengal-kansa/30 ${isBn ? 'font-bengali text-lg' : 'font-sans-en font-light'}`}>
            {t('subtitle')}
          </p>

          <div className="flex items-center gap-8 pl-4">
            <Link
              href={`/${locale}/shop`}
              className="group relative inline-flex items-center h-14 px-8 bg-bengal-kajal text-bengal-kori text-xs tracking-[0.2em] uppercase font-medium overflow-hidden rounded-full shadow-xl shadow-black/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <span className="absolute inset-0 w-0 bg-bengal-sindoor transition-all duration-400 ease-out group-hover:w-full" />
              <span className="relative z-10">{t('cta_shop')}</span>
            </Link>
            <Link
              href={`/${locale}#story`}
              className={`text-bengal-kajal hover:text-bengal-sindoor text-xs tracking-[0.15em] uppercase transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-bengal-kajal/20 hover:after:bg-bengal-sindoor ${isBn ? 'font-bengali' : 'font-sans-en'}`}
            >
              {t('cta_story')}
            </Link>
          </div>
        </motion.div>

        {/* 2. Image Column (Right) */}
        <div className="w-[50%] h-[75vh] relative z-10">
          
          {/* Main Large Image */}
          <motion.div
            style={{ y: parallaxMain, ...parallaxStyle }}
            className="absolute right-0 top-[5%] w-[85%] h-[85%] z-10 flex items-center justify-center"
          >
            <BengalWomanHero />
          </motion.div>

          {/* Floating Offset Image 1 - Bottom Left Intertwined */}
          <motion.div
            style={{ y: parallaxOffset1, ...parallaxStyle }}
            className="absolute -left-[10%] bottom-[10%] w-[45%] aspect-3/4 z-20 flex items-center justify-center"
          >
            <LoomWeaver />
            {/* Subtle overlay text on the small image */}
            <div className="absolute -right-8 bottom-12 rotate-90 origin-bottom-left text-[9px] tracking-[0.4em] uppercase text-bengal-kansa bg-transparent px-3 py-1">
              {t('intro')}
            </div>
          </motion.div>

          {/* Floating Offset Image 2 - Top Right Accent */}
          <motion.div
            style={{ y: parallaxOffset2, ...parallaxStyle }}
            className="absolute -right-[5%] -top-[2%] w-[25%] aspect-square z-30 flex items-center justify-center"
          >
            <BengalVillage />
          </motion.div>
        </div>

        {/* Scroll hint — absolute bottom center (CSS animation for compositor) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-30">
          <span className="text-[9px] tracking-[0.3em] uppercase text-bengal-kajal/40 font-sans-en">
            {t('scroll_hint')}
          </span>
          <div className="w-px h-12 bg-linear-to-b from-bengal-kansa/50 to-transparent animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
}
