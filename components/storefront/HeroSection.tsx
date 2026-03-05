'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 80, damping: 25, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-400, 400], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-12, 12]), springConfig);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
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

          {/* ── MOBILE COLLAGE ── */}
          <div className="w-full lg:hidden relative z-10 order-1 flex justify-center pt-2">
            <div className="relative w-full max-w-[380px] aspect-[3/4]" style={{ perspective: '600px' }}>
              {/* Back card */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                className="absolute top-0 right-0 w-[75%] h-[80%] rounded-2xl overflow-hidden shadow-xl"
                style={{ transform: 'rotateY(-4deg) rotateX(2deg)' }}
              >
                <Image src={IMAGES.card2.src} alt={IMAGES.card2.alt} fill priority className="object-cover" style={{ objectPosition: IMAGES.card2.pos }} sizes="60vw" />
              </motion.div>
              {/* Front card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                className="absolute bottom-0 left-0 w-[72%] h-[78%] rounded-2xl overflow-hidden shadow-2xl border-2 border-background z-10"
                style={{ transform: 'rotateY(3deg) rotateX(-1deg)' }}
              >
                <Image src={IMAGES.card1.src} alt={IMAGES.card1.alt} fill priority className="object-cover" style={{ objectPosition: IMAGES.card1.pos }} sizes="60vw" />
              </motion.div>
              {/* Small accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: 'spring', bounce: 0.3 }}
                className="absolute bottom-[5%] right-[2%] w-[35%] aspect-square rounded-xl overflow-hidden shadow-lg border-2 border-background z-20"
                style={{ transform: 'rotateY(6deg) rotateX(-3deg)' }}
              >
                <Image src={IMAGES.card3.src} alt={IMAGES.card3.alt} fill className="object-cover" style={{ objectPosition: IMAGES.card3.pos }} sizes="30vw" />
              </motion.div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute top-[8%] left-[5%] z-30 bg-background/90 backdrop-blur-xl px-4 py-2 rounded-full border border-border/40 shadow-md"
              >
                <span className="text-[8px] tracking-[0.25em] uppercase text-primary font-sans-en font-bold">Handwoven</span>
              </motion.div>
            </div>
          </div>

          {/* ── DESKTOP COLLAGE — 3D Fanned Card Stack ── */}
          <div
            className="hidden lg:flex w-[58%] h-[88vh] relative z-10 order-2 items-center justify-center"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              style={{
                rotateX: mounted ? rotateX : 0,
                rotateY: mounted ? rotateY : 0,
                transformStyle: 'preserve-3d',
                perspective: '1400px',
              }}
              className="relative w-full h-full"
            >
              {/* ─── CARD 5 (deepest, back-right) ─── */}
              <motion.div
                initial={{ opacity: 0, z: -200, rotateY: 15 }}
                animate={{ opacity: 1, z: 0, rotateY: 0 }}
                transition={{ duration: 1.4, delay: 0, ease: EASE }}
                className="absolute will-change-transform"
                style={{
                  top: '8%', right: '0%',
                  width: '42%', height: '55%',
                  transform: 'translateZ(-120px) rotateY(-6deg) rotateX(2deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)] dark:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] group">
                  <Image src={IMAGES.card5.src} alt={IMAGES.card5.alt} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ objectPosition: IMAGES.card5.pos }} sizes="24vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>

              {/* ─── CARD 4 (mid-back, left) ─── */}
              <motion.div
                initial={{ opacity: 0, z: -150, rotateY: -10 }}
                animate={{ opacity: 1, z: 0, rotateY: 0 }}
                transition={{ duration: 1.3, delay: 0.1, ease: EASE }}
                className="absolute will-change-transform"
                style={{
                  top: '2%', left: '0%',
                  width: '38%', height: '58%',
                  transform: 'translateZ(-60px) rotateY(5deg) rotateX(1deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_35px_80px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_35px_80px_-15px_rgba(0,0,0,0.55)] group">
                  <Image src={IMAGES.card4.src} alt={IMAGES.card4.alt} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ objectPosition: IMAGES.card4.pos }} sizes="22vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>

              {/* ─── CARD 2 (mid-front, right-center) ─── */}
              <motion.div
                initial={{ opacity: 0, y: 60, rotateY: -8 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
                className="absolute will-change-transform"
                style={{
                  top: '12%', right: '8%',
                  width: '48%', height: '72%',
                  transform: 'translateZ(20px) rotateY(-3deg) rotateX(1deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative w-full h-full rounded-[1.25rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] group">
                  <Image src={IMAGES.card2.src} alt={IMAGES.card2.alt} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ objectPosition: IMAGES.card2.pos }} sizes="28vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* ─── CARD 1 (front-most, dominant, left-center) ─── */}
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
                className="absolute will-change-transform"
                style={{
                  top: '5%', left: '8%',
                  width: '52%', height: '80%',
                  transform: 'translateZ(80px) rotateY(4deg) rotateX(-1deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden shadow-[0_50px_120px_-25px_rgba(0,0,0,0.4)] dark:shadow-[0_50px_120px_-25px_rgba(0,0,0,0.65)] group">
                  <Image src={IMAGES.card1.src} alt={IMAGES.card1.alt} fill priority className="object-cover transition-transform duration-[2.5s] group-hover:scale-[1.04]" style={{ objectPosition: IMAGES.card1.pos }} sizes="30vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
                  {/* Subtle brand watermark */}
                  <div className="absolute bottom-4 left-5 z-10">
                    <span className="text-[9px] tracking-[0.35em] uppercase text-white/40 font-sans-en font-medium">
                      Womaniya
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ─── CARD 3 (small, bottom-right, popping forward) ─── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5, type: 'spring', bounce: 0.25 }}
                className="absolute will-change-transform"
                style={{
                  bottom: '2%', right: '2%',
                  width: '30%', height: '38%',
                  transform: 'translateZ(140px) rotateY(-7deg) rotateX(3deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_35px_90px_-15px_rgba(0,0,0,0.35)] dark:shadow-[0_35px_90px_-15px_rgba(0,0,0,0.6)] group">
                  <Image src={IMAGES.card3.src} alt={IMAGES.card3.alt} fill className="object-cover transition-transform duration-[2s] group-hover:scale-105" style={{ objectPosition: IMAGES.card3.pos }} sizes="18vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                </div>
              </motion.div>

              {/* ─── Floating badge ─── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.7, type: 'spring', bounce: 0.35 }}
                className="absolute z-50"
                style={{
                  bottom: '35%', left: '38%',
                  transform: 'translateZ(180px) rotate(-8deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="bg-background/90 backdrop-blur-xl px-5 py-2.5 rounded-full border border-border/40 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2)] dark:shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)]">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-primary font-sans-en font-bold">
                    Handwoven
                  </span>
                </div>
              </motion.div>

              {/* ─── Decorative line accent ─── */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1.2, ease: EASE }}
                className="absolute bottom-[18%] left-[5%] w-[25%] h-px bg-primary/15 origin-left pointer-events-none"
                style={{ transform: 'translateZ(40px)' }}
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.9, duration: 1.0, ease: EASE }}
                className="absolute top-[15%] right-[5%] w-px h-[20%] bg-primary/15 origin-top pointer-events-none"
                style={{ transform: 'translateZ(40px)' }}
              />

            </motion.div>
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
