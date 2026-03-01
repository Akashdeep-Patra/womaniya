'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { BengalButton } from '@/components/bengal';
import { BengalBadge }  from '@/components/bengal';
import Link from 'next/link';

export function HeroSection() {
  const t      = useTranslations('hero');
  const params = useParams();
  const locale = params.locale as string;
  const ref    = useRef<HTMLElement>(null);

  const { scrollY }      = useScroll();
  const parallaxY        = useTransform(scrollY, [0, 500], [0, -80]);
  const parallaxYOffset  = useTransform(scrollY, [0, 500], [0, 40]);

  const isBn = locale === 'bn';

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] bg-bengal-kori overflow-hidden flex flex-col"
    >
      {/* Mobile layout */}
      <div className="flex flex-col flex-1 md:hidden pt-14">

        {/* Hero image — full bleed on mobile */}
        <div className="relative w-full flex-1 min-h-[55vw] max-h-[70vw] overflow-hidden">
          <Image
            src="/hero-placeholder.svg"
            alt="Handwoven Bengali saree"
            fill
            priority
            className="object-cover object-top"
            sizes="100vw"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bengal-kori" />
        </div>

        {/* Text block */}
        <div className="px-5 pt-4 pb-24 flex flex-col gap-4">
          <BengalBadge variant="kansa" className="self-start">
            {t('badge')}
          </BengalBadge>

          <h1 className={`font-editorial text-5xl leading-[0.92] text-bengal-kajal ${isBn ? 'font-bengali-serif' : ''}`}>
            {t('headline_1')}<br />
            <span className="text-bengal-sindoor">{t('headline_2')}</span><br />
            {t('headline_3')}
          </h1>

          <p className={`text-bengal-kajal/65 text-sm leading-relaxed max-w-xs ${isBn ? 'font-bengali' : ''}`}>
            {t('subtitle')}
          </p>

          <div className="flex gap-3 mt-2">
            <Link href={`/${locale}/shop`}>
              <BengalButton variant="primary" size="md" isBengali={isBn}>
                {t('cta_shop')}
              </BengalButton>
            </Link>
            <Link href={`/${locale}#story`}>
              <BengalButton variant="outline" size="md" isBengali={isBn}>
                {t('cta_story')}
              </BengalButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop — editorial broken grid */}
      <div className="hidden md:flex items-center min-h-screen pt-16 max-w-7xl mx-auto w-full px-6">

        {/* Left: text */}
        <div className="flex-1 z-10">
          <BengalBadge variant="kansa" className="mb-6">
            {t('badge')}
          </BengalBadge>

          <h1 className={`font-editorial leading-[0.88] text-bengal-kajal mb-6 ${isBn ? 'font-bengali-serif' : ''}`}
              style={{ fontSize: 'clamp(4rem, 7vw, 8rem)' }}>
            {t('headline_1')}<br />
            <span className="text-bengal-sindoor">{t('headline_2')}</span><br />
            {t('headline_3')}
          </h1>

          <p className={`text-bengal-kajal/65 text-base leading-relaxed max-w-sm mb-8 ${isBn ? 'font-bengali' : ''}`}>
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
        </div>

        {/* Right: stacked editorial images */}
        <div className="flex-1 relative h-[80vh] flex items-center justify-center">

          {/* Main image */}
          <motion.div
            className="relative w-[60%] aspect-[4/5] rounded-sm overflow-hidden shadow-2xl"
            style={{ y: parallaxY }}
            data-cursor-expand
          >
            <Image
              src="/hero-placeholder.svg"
              alt="Woman in handwoven Bengali saree"
              fill
              priority
              className="object-cover"
              sizes="40vw"
            />
          </motion.div>

          {/* Offset parallax image */}
          <motion.div
            className="absolute bottom-8 -left-4 w-[40%] aspect-square rounded-sm overflow-hidden shadow-xl"
            style={{ y: parallaxYOffset }}
            data-cursor-expand
          >
            <Image
              src="/hero-offset-placeholder.svg"
              alt="Jamdani weave detail"
              fill
              className="object-cover"
              sizes="25vw"
            />
          </motion.div>

          {/* Decorative gold line */}
          <div className="absolute top-0 right-0 w-px h-1/2 bg-gradient-to-b from-transparent via-bengal-kansa to-transparent" />
        </div>
      </div>

      {/* Floating vertical text */}
      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-3">
        <div className="w-px h-16 bg-bengal-kansa/40" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-bengal-kajal/40 rotate-90 origin-center whitespace-nowrap">
          Scroll to Explore
        </span>
      </div>
    </section>
  );
}
