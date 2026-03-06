'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const IMAGES = {
  card1: {
    src: '/instagram/2026-01-30_12-28-39_UTC_5.jpg',
    alt: 'Ikkat Rupkotha — Blue Pochampally handloom bustier dress editorial portrait',
    pos: '50% 10%',
  },
  card2: {
    src: '/instagram/2026-02-23_06-34-00_UTC_1.jpg',
    alt: 'Red handloom Jamdani patchwork skirt against heritage red wall',
    pos: '50% 20%',
  },
  card3: {
    src: '/instagram/2026-02-02_12-37-01_UTC_2.jpg',
    alt: 'Meher — spinning in Ikkat Pochampally dress, capturing movement and craft',
    pos: '50% 15%',
  },
  card4: {
    src: '/instagram/2026-02-25_12-56-26_UTC_1.jpg',
    alt: 'Womaniya handloom editorial — artisan weave detail',
    pos: '50% 30%',
  },
  card5: {
    src: '/instagram/2026-02-02_12-37-01_UTC_6.jpg',
    alt: 'Close-up of Ikkat Pochampally handwoven textile pattern',
    pos: '30% 50%',
  },
};

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isBn = locale === 'bn';

  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, -30]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-background overflow-hidden"
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-secondary/10" />
        <div className="absolute left-[8%] top-0 bottom-0 w-px bg-primary/5 hidden lg:block" />
        <div className="absolute right-[8%] top-0 bottom-0 w-px bg-primary/5 hidden lg:block" />
        <div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-6 md:px-8 lg:px-[6%] xl:px-[8%]">
        <div className="flex flex-col lg:flex-row lg:items-center min-h-svh pt-[140px] sm:pt-[160px] lg:pt-[140px] pb-12 lg:pb-0 gap-8 lg:gap-0">

          {/* ── TYPOGRAPHY (unchanged) ── */}
          <motion.div
            style={{ y: yText }}
            className="w-full lg:w-[42%] flex flex-col justify-center relative z-30 lg:pr-6 order-2 lg:order-1 mt-4 lg:mt-0"
          >
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

            <h1 className={`mb-6 md:mb-10 ${isBn ? 'font-bengali-serif' : ''}`}>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
                className={`block leading-[0.85] tracking-tight text-foreground ${!isBn ? 'font-editorial' : ''}`}
                style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}
              >
                <span className="block lg:-translate-x-2">{t('headline_1')}</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                className={`block leading-[0.8] tracking-tight text-primary mt-1 md:mt-1 ml-4 sm:ml-8 lg:ml-14 ${!isBn ? 'font-editorial italic' : ''}`}
                style={{ fontSize: 'clamp(3.8rem, 12vw, 10rem)' }}
              >
                {t('headline_2')}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                className={`block leading-[0.9] tracking-tight text-foreground mt-1.5 md:mt-2 ${!isBn ? 'font-editorial' : ''}`}
                style={{ fontSize: 'clamp(2.8rem, 9vw, 7.5rem)' }}
              >
                {t('headline_3')}
              </motion.span>
            </h1>

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
                href={`/${locale}/stories`}
                className="group flex items-center gap-2 text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-foreground/70 hover:text-primary transition-colors font-medium py-2 pointer-events-auto"
              >
                <span className="relative pb-0.5">
                  {t('cta_story')}
                  <span className="absolute left-0 bottom-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── MOBILE COLLAGE — LCP image is NOT animated to avoid delaying paint ── */}
          <div className="w-full lg:hidden relative z-10 order-1 pt-6 pb-2">
            <div className="relative w-full max-w-[420px] mx-auto aspect-4/5 p-2">
              <div className="absolute bottom-2 left-2 w-[65%] h-[75%] rounded-4xl overflow-hidden shadow-xl border-[6px] border-background z-20 bg-muted">
                <Image src={IMAGES.card1.src} alt={IMAGES.card1.alt} fill priority fetchPriority="high" className="object-cover" style={{ objectPosition: IMAGES.card1.pos }} sizes="60vw" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                className="absolute top-2 right-2 w-[50%] h-[60%] rounded-3xl overflow-hidden shadow-lg border-[6px] border-background z-10 group bg-muted"
              >
                <Image src={IMAGES.card2.src} alt={IMAGES.card2.alt} fill loading="lazy" className="object-cover" style={{ objectPosition: IMAGES.card2.pos }} sizes="45vw" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, type: 'spring' }}
                className="absolute top-[50%] left-[55%] z-40 bg-background/95 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-md"
              >
                <span className="text-[8px] tracking-[0.25em] uppercase text-primary font-sans-en font-bold">Handwoven</span>
              </motion.div>
            </div>
          </div>

          {/* ── DESKTOP COLLAGE — Magazine Cover Orchestration ── */}
          <div className="hidden lg:block w-[58%] h-full relative z-10 order-2 pt-12 pb-16 pl-12 pr-6">
            <div className="relative w-full h-[82vh] max-h-[850px] p-4">
              
              {/* Back Left (Subtle Texture) */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.1, ease: EASE }}
                className="absolute top-[8%] left-[2%] w-[38%] h-[55%] rounded-4xl overflow-hidden shadow-md border-8 border-background z-0 group bg-muted"
              >
                <Image src={IMAGES.card5.src} alt={IMAGES.card5.alt} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ objectPosition: IMAGES.card5.pos }} sizes="20vw" />
              </motion.div>

              {/* Main Center-Left (Hero) */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                className="absolute bottom-[2%] left-[12%] w-[45%] h-[75%] rounded-[2.5rem] overflow-hidden shadow-2xl border-10 border-background z-20 group bg-muted"
              >
                <Image src={IMAGES.card1.src} alt={IMAGES.card1.alt} fill priority className="object-cover transition-transform duration-[2s] group-hover:scale-[1.03]" style={{ objectPosition: IMAGES.card1.pos }} sizes="30vw" />
                <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
              </motion.div>

              {/* Top Right (Secondary Story) */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
                className="absolute top-[2%] right-[5%] w-[42%] h-[60%] rounded-4xl overflow-hidden shadow-xl border-8 border-background z-10 group bg-muted"
              >
                <Image src={IMAGES.card2.src} alt={IMAGES.card2.alt} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ objectPosition: IMAGES.card2.pos }} sizes="25vw" />
              </motion.div>

              {/* Bottom Right (Detail Accent) */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
                className="absolute bottom-[8%] right-[2%] w-[35%] h-[45%] rounded-3xl overflow-hidden shadow-lg border-8 border-background z-10 group bg-muted"
              >
                <Image src={IMAGES.card4.src} alt={IMAGES.card4.alt} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ objectPosition: IMAGES.card4.pos }} sizes="20vw" />
              </motion.div>

              {/* Small Floating Overlap (Front Right) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, type: 'spring', bounce: 0.3 }}
                className="absolute bottom-[28%] right-[32%] w-[22%] aspect-4/5 rounded-[1.25rem] overflow-hidden shadow-2xl border-[6px] border-background z-30 group bg-muted"
              >
                <Image src={IMAGES.card3.src} alt={IMAGES.card3.alt} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ objectPosition: IMAGES.card3.pos }} sizes="15vw" />
              </motion.div>

              {/* Editorial Separator Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute top-[48%] left-[52%] z-30 bg-background/95 backdrop-blur-md px-6 py-2.5 rounded-full border border-border shadow-md flex items-center gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] tracking-[0.3em] uppercase text-foreground font-sans-en font-bold">The Edit</span>
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-30 hidden lg:flex">
        <span className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground/50 font-sans-en font-semibold">
          {t('scroll_hint')}
        </span>
        <div className="w-px h-10 bg-linear-to-b from-primary/40 to-transparent animate-bounce-subtle" />
      </div>
    </section>
  );
}
