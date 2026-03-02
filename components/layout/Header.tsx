'use client';

import { useEffect, useState, useRef } from 'react';
import Link                    from 'next/link';
import { useParams }           from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn }                  from '@/lib/utils';
import { BrandMascot }         from '@/components/illustrations/BrandMascot';

/* ─────────────────────────────────────────────────────────────────
   Locale switcher — refined aesthetic circular/pill toggle
───────────────────────────────────────────────────────────────── */
function LocaleToggle({ locale }: { locale: string }) {
  const isEn = locale === 'en';

  const handleSwitch = () => {
    const next = isEn ? 'bn' : 'en';
    window.location.href = window.location.pathname.replace(`/${locale}`, `/${next}`);
  };

  return (
    <button
      onClick={handleSwitch}
      aria-label="Switch language"
      className={cn(
        'h-8 w-11 md:h-9 md:w-12 rounded-[2rem] border flex items-center justify-center',
        'border-bengal-kansa/60 text-bengal-kansa bg-transparent',
        'hover:border-bengal-kajal hover:text-bengal-kajal hover:bg-black/5',
        'transition-all duration-300 touch-manipulation',
        !isEn ? 'font-bengali text-sm' : 'font-sans-en text-[11px] md:text-xs tracking-wider font-medium'
      )}
    >
      {isEn ? 'বাং' : 'EN'}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Desktop nav link with sliding underline
───────────────────────────────────────────────────────────────── */
function NavLink({ href, label, isBn }: { href: string; label: string; isBn: boolean }) {
  return (
    <Link href={href} className="relative group py-1">
      <span className={cn(
        "uppercase font-medium text-bengal-kajal/60 group-hover:text-bengal-kajal transition-colors duration-200",
        isBn ? 'font-bengali text-sm tracking-wide' : 'font-sans-en text-[11px] tracking-[0.2em]'
      )}>
        {label}
      </span>
      <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-bengal-kansa group-hover:w-full transition-all duration-300 rounded-full" />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Header
───────────────────────────────────────────────────────────────── */
export function Header() {
  const params = useParams();
  const locale = params.locale as string;
  const isBn   = locale === 'bn';

  const [scrolled, setScrolled] = useState(false);
  const [hidden,   setHidden]   = useState(false);
  const lastScrollYRef           = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollYRef.current && y > 150);
      lastScrollYRef.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`,       label: isBn ? 'হোম'       : 'Home'      },
    { href: `/${locale}/shop`,  label: isBn ? 'শপ'        : 'Shop'      },
    { href: `/${locale}#story`, label: isBn ? 'আমাদের গল্প': 'Our Story' },
  ];

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-bengal-kori/95 backdrop-blur-md shadow-sm border-b border-bengal-kansa/15 py-1'
          : 'bg-gradient-to-b from-bengal-kori to-transparent py-2'
      )}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:gap-4 mt-2 mb-2">
          
          {/* Main Top Row */}
          <div className="relative flex items-center justify-between">
            
            {/* Left: Desktop Nav */}
            <div className="flex-1 flex items-center">
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((l) => (
                  <NavLink key={l.href} href={l.href} label={l.label} isBn={isBn} />
                ))}
              </nav>
            </div>

            {/* Center: Bold Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link href={`/${locale}`} className="group flex flex-col items-center">
                <BrandMascot size={32} className="mb-1 text-bengal-kajal transition-transform duration-500 group-hover:scale-110" />
                <span className="font-sans-en font-extrabold tracking-[0.25em] md:tracking-[0.3em] text-[20px] md:text-[26px] text-bengal-kajal uppercase leading-none">
                  WOMANIYA
                </span>
              </Link>
            </div>

            {/* Right: Locale Toggle */}
            <div className="flex-1 flex justify-end">
              <LocaleToggle locale={locale} />
            </div>

          </div>

          {/* Sub Row: Aesthetic Details */}
          <motion.div 
            animate={{ opacity: scrolled ? 0 : 1, height: scrolled ? 0 : 'auto', marginTop: scrolled ? 0 : 4 }}
            className="flex items-center justify-between text-bengal-kansa overflow-hidden"
          >
            <span className={cn(
              "transition-all duration-300",
              isBn ? 'font-bengali text-[11px] md:text-sm tracking-wide' : 'font-sans-en uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em]'
            )}>
              {isBn ? 'ধীর গতির শিল্পের উদযাপন' : 'Celebration of Slow Craft'}
            </span>
            <span className={cn(
              "transition-all duration-300",
              isBn ? 'font-bengali text-[11px] md:text-sm tracking-wide' : 'font-sans-en uppercase text-[9px] md:text-[10px] tracking-[0.2em] md:tracking-[0.3em]'
            )}>
              {isBn ? 'স্থাপিত ২০১৯' : 'Est. 2019'}
            </span>
          </motion.div>

        </div>
      </div>

      {/* Scrolled bottom indicator line */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="bottom-rule"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-bengal-kansa/40 to-transparent origin-left"
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
