'use client';

import { useEffect, useState } from 'react';
import Link                    from 'next/link';
import { useParams }           from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn }                  from '@/lib/utils';

/* ─────────────────────────────────────────────────────────────────
   Locale switcher — hardcoded, no i18n dependency (avoids key bug)
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
        'h-8 px-3 rounded-full border text-[11px] font-medium tracking-widest uppercase',
        'border-bengal-kansa/40 text-bengal-kajal/60',
        'hover:border-bengal-kansa hover:text-bengal-sindoor',
        'transition-all duration-200 touch-manipulation',
        !isEn ? 'font-bengali tracking-normal text-sm' : ''
      )}
    >
      {isEn ? 'বাং' : 'EN'}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Desktop nav link with sliding underline
───────────────────────────────────────────────────────────────── */
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="relative group py-1">
      <span className="text-[11px] tracking-[0.2em] uppercase font-medium text-bengal-kajal/55 group-hover:text-bengal-kajal transition-colors duration-200">
        {label}
      </span>
      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-bengal-kansa group-hover:w-full transition-all duration-300" />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Header
───────────────────────────────────────────────────────────────── */
export function Header() {
  const params = useParams();
  const locale = params.locale as string;

  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > lastScrollY && y > 120);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: `/${locale}`,       label: locale === 'bn' ? 'হোম'       : 'Home'      },
    { href: `/${locale}/shop`,  label: locale === 'bn' ? 'শপ'        : 'Shop'      },
    { href: `/${locale}#story`, label: locale === 'bn' ? 'আমাদের গল্প': 'Our Story' },
  ];

  return (
    <motion.header
      animate={{ y: hidden ? '-110%' : '0%' }}
      transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-400',
        scrolled
          ? 'bg-bengal-kori/92 backdrop-blur-lg border-b border-bengal-kansa/15'
          : 'bg-transparent'
      )}
    >
      {/* Top gold accent line */}
      <div className="h-px bg-linear-to-r from-transparent via-bengal-kansa/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="relative flex items-center h-14 md:h-16">

          {/* Left: desktop nav links */}
          <nav className="hidden md:flex items-center gap-8 flex-1">
            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          {/* Mobile: empty left spacer */}
          <div className="flex-1 md:hidden" />

          {/* Center logo — absolute on md+, in-flow on mobile */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2">
            <Link href={`/${locale}`} className="group flex items-center">
              {/* Left ornament */}
              <span className="hidden md:block w-5 h-px bg-bengal-kansa/40 mr-2.5 transition-all duration-300 group-hover:w-8 group-hover:bg-bengal-kansa" />

              <span className="font-editorial tracking-[0.22em] text-[17px] md:text-[19px] text-bengal-kajal group-hover:text-bengal-sindoor transition-colors duration-300">
                WOMANIA
              </span>

              {/* Right ornament */}
              <span className="hidden md:block w-5 h-px bg-bengal-kansa/40 ml-2.5 transition-all duration-300 group-hover:w-8 group-hover:bg-bengal-kansa" />
            </Link>
          </div>

          {/* Right: locale toggle */}
          <div className="flex-1 flex justify-end">
            <LocaleToggle locale={locale} />
          </div>

        </div>
      </div>

      {/* Bottom animated gold rule on scroll */}
      <AnimatePresence>
        {scrolled && (
          <motion.div
            key="rule"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{   scaleX: 0, opacity: 0 }}
            style={{ transformOrigin: 'left' }}
            className="h-px bg-linear-to-r from-transparent via-bengal-kansa/35 to-transparent"
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
}
