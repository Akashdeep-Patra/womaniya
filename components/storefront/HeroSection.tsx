'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
  editorial: {
    src: '/instagram/2026-02-25_12-56-26_UTC_1.jpg',
    alt: 'Womaniya handloom editorial — artisan weave detail',
    pos: '50% 30%',
  },
};

function CollageImage({
  src, alt, pos, className, sizes, priority, delay, children,
}: {
  src: string; alt: string; pos: string; className?: string;
  sizes: string; priority?: boolean; delay: number; children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
      className={className}
    >
      <div className="relative w-full h-full overflow-hidden group">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.06]"
          style={{ objectPosition: pos }}
          sizes={sizes}
        />
        {children}
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isBn = locale === 'bn';

  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 600], [0, -30]);
  const yGrid = useTransform(scrollY, [0, 800], [0, -50]);
  const yFloat1 = useTransform(scrollY, [0, 800], [0, 30]);
  const yFloat2 = useTransform(scrollY, [0, 800], [0, -20]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [2, -2]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-3, 3]), { stiffness: 150, damping: 30 });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === 'undefined') return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

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
        <div className="flex flex-col lg:flex-row lg:items-center min-h-[100svh] pt-[140px] sm:pt-[160px] lg:pt-[140px] pb-12 lg:pb-0 gap-8 lg:gap-0">

          {/* ── TYPOGRAPHY ── */}
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

          {/* ── MOBILE / TABLET COLLAGE ── */}
          <div className="w-full lg:hidden relative z-10 order-1 flex justify-center pt-2">
            <div className="relative w-full max-w-[450px] aspect-4/5 sm:aspect-[4/4.5]">
              <div className="absolute inset-x-8 sm:inset-x-12 top-4 bottom-12 sm:bottom-16 z-10 rounded-t-full rounded-b-4xl overflow-hidden border-4 border-background shadow-sm">
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
              <div className="absolute -left-2 sm:left-2 top-0 w-[35%] sm:w-[32%] aspect-3/5 z-20 rounded-full overflow-hidden border-[3px] border-background shadow-sm">
                <Image
                  src={IMAGES.accent.src}
                  alt={IMAGES.accent.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: IMAGES.accent.pos }}
                  sizes="35vw"
                />
              </div>
              <div className="absolute -right-2 sm:right-0 bottom-0 w-[42%] sm:w-[38%] aspect-square z-30 rounded-full overflow-hidden border-4 border-background shadow-sm">
                <Image
                  src={IMAGES.overlap.src}
                  alt={IMAGES.overlap.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: IMAGES.overlap.pos }}
                  sizes="40vw"
                />
                <div className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 -rotate-12 bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-border/50 shadow-sm">
                  <span className="text-[7px] sm:text-[8px] tracking-[0.2em] uppercase text-primary font-sans-en font-bold">
                    Handwoven
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── DESKTOP COLLAGE — 3D Editorial Atelier ── */}
          <motion.div
            style={{ y: yGrid, rotateX: isMounted ? rotateX : 0, rotateY: isMounted ? rotateY : 0 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hidden lg:block w-[58%] h-[88vh] relative z-10 order-2"
            // perspective applied via parent wrapper style
          >
            <div className="relative w-full h-full" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>

              {/* ─ MAIN IMAGE — Dominant, slightly recessed ─ */}
              <CollageImage
                src={IMAGES.hero.src}
                alt={IMAGES.hero.alt}
                pos={IMAGES.hero.pos}
                sizes="45vw"
                priority
                delay={0.05}
                className="absolute z-10 top-[2%] right-0 w-[72%] h-[82%] will-change-transform rounded-[2rem] rounded-tl-[5rem] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]"
              >
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent z-10" />
                <div className="absolute bottom-5 right-6 z-20">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                    className="text-[9px] tracking-[0.35em] uppercase text-white/60 font-sans-en font-medium"
                  >
                    Womaniya
                  </motion.span>
                </div>
              </CollageImage>

              {/* ─ ACCENT TALL PILL — Top-left, overlapping main ─ */}
              <motion.div style={{ y: yFloat2 }} className="absolute z-20 left-[0%] top-[0%] w-[30%] h-[52%] will-change-transform">
                <CollageImage
                  src={IMAGES.accent.src}
                  alt={IMAGES.accent.alt}
                  pos={IMAGES.accent.pos}
                  sizes="16vw"
                  delay={0.2}
                  className="w-full h-full rounded-full overflow-hidden border-[5px] border-background shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)]"
                  // Slightly forward in Z
                />
              </motion.div>

              {/* ─ OVERLAP CIRCLE — Bottom-left, breaking the grid ─ */}
              <motion.div style={{ y: yFloat1 }} className="absolute z-30 left-[-8%] bottom-[2%] w-[40%] aspect-square will-change-transform">
                <CollageImage
                  src={IMAGES.overlap.src}
                  alt={IMAGES.overlap.alt}
                  pos={IMAGES.overlap.pos}
                  sizes="22vw"
                  delay={0.35}
                  className="w-full h-full rounded-full overflow-hidden border-[6px] border-background shadow-[0_30px_70px_-20px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.65)]"
                />
              </motion.div>

              {/* ─ TEXTURE — Horizontal strip, bottom-right ─ */}
              <CollageImage
                src={IMAGES.texture.src}
                alt={IMAGES.texture.alt}
                pos={IMAGES.texture.pos}
                sizes="14vw"
                delay={0.55}
                className="absolute z-40 right-[-2%] bottom-[14%] w-[26%] aspect-[16/10] will-change-transform rounded-2xl overflow-hidden border-4 border-background shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] dark:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.55)] hover:scale-105 transition-transform duration-500"
              />

              {/* ─ EDITORIAL — Small vertical card, mid-left ─ */}
              <CollageImage
                src={IMAGES.editorial.src}
                alt={IMAGES.editorial.alt}
                pos={IMAGES.editorial.pos}
                sizes="10vw"
                delay={0.7}
                className="absolute z-25 left-[18%] bottom-[32%] w-[18%] aspect-[3/4] will-change-transform rounded-xl overflow-hidden border-[3px] border-background shadow-[0_12px_35px_-8px_rgba(0,0,0,0.25)] dark:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500"
              />

              {/* ─ EXTRA — Tiny circle, top-right decorative ─ */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.9, type: 'spring', bounce: 0.4 }}
                className="absolute z-40 right-[6%] top-[-3%] w-[13%] aspect-square will-change-transform"
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-background shadow-[0_10px_30px_-8px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.55)] group hover:scale-110 transition-transform duration-300">
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

              {/* ─ Floating "Handwoven" badge ─ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, type: 'spring', bounce: 0.3 }}
                className="absolute z-50 left-[24%] bottom-[44%] -rotate-12"
              >
                <div className="bg-background/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-border/40 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.4)]">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-primary font-sans-en font-bold">
                    Handwoven
                  </span>
                </div>
              </motion.div>

              {/* ─ Decorative ring — geometric accent ─ */}
              <motion.div
                initial={{ opacity: 0, rotate: -30 }}
                animate={{ opacity: 0.15, rotate: 0 }}
                transition={{ delay: 1.0, duration: 1.2, ease: EASE }}
                className="absolute z-0 right-[28%] top-[8%] w-[20%] aspect-square pointer-events-none"
              >
                <div className="w-full h-full rounded-full border-2 border-primary/30" />
              </motion.div>

              {/* ─ Decorative dots — scattered ─ */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                className="absolute z-0 left-[12%] top-[58%] pointer-events-none"
              >
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-primary/25" />
                  ))}
                </div>
              </motion.div>

            </div>
          </motion.div>

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
