'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

const IMAGES = {
  hero: {
    src: '/instagram/2026-01-30_12-28-39_UTC_5.jpg',
    alt: 'Ikkat Rupkotha — Blue Pochampally handloom bustier dress editorial portrait',
    pos: '50% 10%',
  },
  overlap: {
    src: '/instagram/2026-02-02_12-37-01_UTC_2.jpg',
    alt: 'Meher — spinning in Ikkat Pochampally dress, capturing movement and craft',
    pos: '50% 15%',
  },
  accent: {
    src: '/instagram/2026-02-23_06-34-00_UTC_1.jpg',
    alt: 'Red handloom Jamdani patchwork skirt against heritage red wall',
    pos: '50% 20%',
  },
  texture: {
    src: '/instagram/2026-02-02_12-37-01_UTC_6.jpg',
    alt: 'Close-up of Ikkat Pochampally handwoven textile pattern',
    pos: '30% 50%',
  },
  extra: {
    src: '/instagram/2026-01-30_12-28-39_UTC_3.jpg',
    alt: 'Womaniya handloom editorial — styled portrait',
    pos: '50% 5%',
  },
};

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isBn = locale === 'bn';

  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  // Desktop parallax
  const yHero = useTransform(scrollY, [0, 800], [0, -60]);
  const yOverlap = useTransform(scrollY, [0, 800], [0, 35]);
  const yAccent = useTransform(scrollY, [0, 800], [0, -25]);
  const yText = useTransform(scrollY, [0, 600], [0, -20]);
  const scaleHero = useTransform(scrollY, [0, 400], [1, 1.03]);

  // Mobile: no JS parallax — native scroll performance is more important
  // Desktop parallax only runs on non-touch devices via Lenis

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10" />
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-primary/5 hidden lg:block" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-primary/5 hidden lg:block" />
        {/* Subtle noise overlay for texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-6 md:px-8 lg:px-[6%] xl:px-[8%]">
        <div className="flex flex-col lg:flex-row lg:items-center min-h-[100svh] pt-[140px] sm:pt-[160px] lg:pt-[140px] pb-12 lg:pb-0 gap-8 lg:gap-0">

          {/* ── TYPOGRAPHY ── */}
          <motion.div
            style={{ y: yText }}
            className="w-full lg:w-[42%] flex flex-col justify-center relative z-30 lg:pr-6 order-2 lg:order-1 mt-4 lg:mt-0"
          >
            {/* Rotated side label — desktop only */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-[9px] tracking-[0.4em] uppercase text-muted-foreground/50 font-sans-en whitespace-nowrap hidden xl:block">
              {t('badge')} — EST. 2019
            </div>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="flex items-center gap-3 md:gap-4 mb-5 md:mb-8 overflow-hidden"
            >
              <div className="w-8 md:w-12 h-px bg-primary shrink-0" />
              <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-primary font-sans-en font-semibold whitespace-nowrap">
                {t('badge')}
              </span>
            </motion.div>

            <div className={`mb-6 md:mb-10 ${isBn ? 'font-bengali-serif' : ''}`}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
                className={`leading-[0.85] tracking-tight text-foreground ${!isBn ? 'font-editorial' : ''}`}
                style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
              >
                <span className="block lg:-translate-x-2">{t('headline_1')}</span>
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                className={`leading-[0.8] tracking-tight text-primary mt-1 md:mt-1 ml-4 sm:ml-8 lg:ml-14 ${!isBn ? 'font-editorial italic' : ''}`}
                style={{ fontSize: 'clamp(3.8rem, 12vw, 10rem)' }}
              >
                {t('headline_2')}
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                className={`leading-[0.9] tracking-tight text-foreground mt-1.5 md:mt-2 ${!isBn ? 'font-editorial' : ''}`}
                style={{ fontSize: 'clamp(2.8rem, 9vw, 7.5rem)' }}
              >
                {t('headline_3')}
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
              className="flex items-start gap-4 mb-8 md:mb-10 pl-2 lg:pl-4"
            >
              <div className="w-0.5 h-12 bg-primary/20 shrink-0 mt-1" />
              <p className={`text-muted-foreground text-[15px] sm:text-base lg:text-lg leading-relaxed max-w-[320px] lg:max-w-[380px] ${isBn ? 'font-bengali text-base md:text-lg' : 'font-sans-en font-light'}`}>
                {t('subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: EASE }}
              className="flex flex-wrap items-center gap-4 md:gap-7 pl-2 lg:pl-4"
            >
              <Link prefetch={true} href={`/${locale}/shop`}
                className="group relative inline-flex items-center justify-center h-12 md:h-14 px-8 md:px-10 bg-foreground text-background text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium rounded-full overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5 pointer-events-auto"
              >
                <span className="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
                <span className="relative z-10 group-hover:text-primary-foreground transition-colors duration-500">{t('cta_shop')}</span>
              </Link>
              <Link 
                href={`/${locale}#story`}
                className="group flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-foreground/70 hover:text-primary transition-colors font-medium py-2 pointer-events-auto"
              >
                <span className="relative pb-0.5">
                  {t('cta_story')}
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── COLLAGE (Responsive separation) ── */}

          {/* MOBILE / TABLET COLLAGE - Streamlined for vertical flow */}
          <div className="w-full lg:hidden relative z-10 order-1 flex justify-center pt-2">
            <div className="relative w-full max-w-[450px] aspect-4/5 sm:aspect-[4/4.5]">
              
              {/* Main Image - Center Dominant */}
              <div
                className="absolute inset-x-8 sm:inset-x-12 top-4 bottom-12 sm:bottom-16 z-10 rounded-t-full rounded-b-4xl overflow-hidden border-4 border-background shadow-sm"
              >
                <Image
                  src={IMAGES.hero.src}
                  alt={IMAGES.hero.alt}
                  fill
                  priority
                  className="object-cover"
                  style={{ objectPosition: IMAGES.hero.pos }}
                  sizes="(max-width: 768px) 80vw"
                />
              </div>

              {/* Accent Pill - Top Left */}
              <div
                className="absolute -left-2 sm:left-2 top-0 w-[35%] sm:w-[32%] aspect-3/5 z-20 rounded-full overflow-hidden border-[3px] border-background shadow-sm"
              >
                <Image
                  src={IMAGES.accent.src}
                  alt={IMAGES.accent.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: IMAGES.accent.pos }}
                  sizes="35vw"
                />
              </div>

              {/* Circle Overlap - Bottom Right */}
              <div
                className="absolute -right-2 sm:right-0 bottom-0 w-[42%] sm:w-[38%] aspect-square z-30 rounded-full overflow-hidden border-4 border-background shadow-sm"
              >
                <Image
                  src={IMAGES.overlap.src}
                  alt={IMAGES.overlap.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: IMAGES.overlap.pos }}
                  sizes="40vw"
                />

                {/* Floating badge attached to circle */}
                <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 -rotate-12 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
                  <span className="text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-primary font-sans-en font-bold">
                    Handwoven
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* DESKTOP COLLAGE - Complex, interlocking spread */}
          <div className="hidden lg:block w-[58%] h-[88vh] relative z-10 order-2">
            {/* MAIN — Massive hero image, slight tilt, dominates the right */}
            <motion.div
              style={{ y: yHero, scale: scaleHero }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.05, ease: EASE }}
              className="absolute z-10 top-[2%] right-0 w-[78%] h-[85%] will-change-transform"
            >
              <div className="relative w-full h-full rounded-4xl rounded-tl-[6rem] overflow-hidden bg-muted/20 group shadow-sm">
                <Image
                  src={IMAGES.hero.src}
                  alt={IMAGES.hero.alt}
                  fill
                  priority
                  className="object-cover transition-transform duration-[4s] ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: IMAGES.hero.pos }}
                  sizes="45vw"
                />
              </div>
            </motion.div>

            {/* OVERLAP — Circle, breaks into main from bottom-left */}
            <motion.div
              style={{ y: yOverlap }}
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
              className="absolute z-30 left-[-6%] bottom-[4%] w-[38%] aspect-square will-change-transform"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-background bg-muted/20 group shadow-md">
                <Image
                  src={IMAGES.overlap.src}
                  alt={IMAGES.overlap.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: IMAGES.overlap.pos }}
                  sizes="22vw"
                />
              </div>
            </motion.div>

            {/* ACCENT — Tall pill, top-left, partially behind main */}
            <motion.div
              style={{ y: yAccent }}
              initial={{ opacity: 0, y: -30, x: 15 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
              className="absolute z-20 left-[2%] top-[0%] w-[28%] h-[50%] will-change-transform"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-[5px] border-background bg-muted/20 group shadow-sm">
                <Image
                  src={IMAGES.accent.src}
                  alt={IMAGES.accent.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: IMAGES.accent.pos }}
                  sizes="16vw"
                />
              </div>
            </motion.div>

            {/* TEXTURE — Small rounded pill, bottom-right, overlapping main edge */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.7, type: 'spring', bounce: 0.35 }}
              className="absolute z-40 right-[-3%] bottom-[18%] w-[24%] aspect-video will-change-transform"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-background bg-muted/20 group hover:scale-105 transition-transform duration-300 shadow-sm">
                <Image
                  src={IMAGES.texture.src}
                  alt={IMAGES.texture.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: IMAGES.texture.pos }}
                  sizes="12vw"
                />
              </div>
            </motion.div>

            {/* EXTRA — Tiny circle, top-right, decorative */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9, type: 'spring', bounce: 0.5 }}
              className="absolute z-40 right-[8%] top-[-2%] w-[14%] aspect-square will-change-transform"
            >
              <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-background bg-muted/20 group hover:scale-110 transition-transform duration-300 shadow-sm">
                <Image
                  src={IMAGES.extra.src}
                  alt={IMAGES.extra.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: IMAGES.extra.pos }}
                  sizes="8vw"
                />
              </div>
            </motion.div>

            {/* Floating "Handwoven" badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute z-50 left-[22%] bottom-[38%] -rotate-12"
            >
              <div className="bg-background/95 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 shadow-sm">
                <span className="text-[9px] tracking-[0.25em] uppercase text-primary font-sans-en font-bold">
                  Handwoven
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll hint — desktop only */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-30 hidden lg:flex">
        <span className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground/50 font-sans-en font-semibold">
          {t('scroll_hint')}
        </span>
        <div className="w-px h-10 bg-linear-to-b from-primary/40 to-transparent animate-bounce-subtle" />
      </div>
    </section>
  );
}
