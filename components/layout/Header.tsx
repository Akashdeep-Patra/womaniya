'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BrandMascot } from '@/components/illustrations/BrandMascot';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const SCROLL_THRESHOLD = 150;
const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

/* ─────────────────────────────────────────────────────────────────
   Theme switcher
───────────────────────────────────────────────────────────────── */
function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="size-8 rounded-full border border-border bg-muted/30" />;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className={cn(
        'size-8 rounded-full border flex items-center justify-center',
        'border-border/50 text-foreground/70 bg-background/80 backdrop-blur-md',
        'hover:bg-foreground hover:text-background hover:border-foreground',
        'transition-all duration-300 touch-manipulation'
      )}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="size-3.5" />
      ) : (
        <Moon className="size-3.5" />
      )}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Locale switcher
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
        'h-8 px-3 rounded-full border flex items-center justify-center',
        'border-border/50 text-foreground/70 bg-background/80 backdrop-blur-md',
        'hover:bg-foreground hover:text-background hover:border-foreground',
        'transition-all duration-300 touch-manipulation',
        !isEn ? 'font-bengali text-sm' : 'font-sans-en text-[10px] tracking-widest font-medium'
      )}
    >
      {isEn ? 'বাং' : 'EN'}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Desktop nav link — compact, no word-wrap
───────────────────────────────────────────────────────────────── */
function NavLink({ href, label, isBn }: { href: string; label: string; isBn: boolean }) {
  return (
    <Link href={href} prefetch={true} className="relative group py-1 px-2.5 whitespace-nowrap">
      <span className={cn(
        "uppercase font-medium text-foreground/60 group-hover:text-foreground transition-colors duration-200",
        isBn ? 'font-bengali text-[14px] tracking-wide' : 'font-sans-en text-[10px] tracking-[0.18em]'
      )}>
        {label}
      </span>
      <span className="absolute -bottom-0.5 left-2 right-2 h-px scale-x-0 bg-primary group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Compact nav link for collapsed state
───────────────────────────────────────────────────────────────── */
function CompactNavLink({ href, label, isBn }: { href: string; label: string; isBn: boolean }) {
  return (
    <Link href={href} prefetch={true} className="relative group py-0.5 px-2 whitespace-nowrap">
      <span className={cn(
        "uppercase font-medium text-foreground/60 group-hover:text-foreground transition-colors duration-200",
        isBn ? 'font-bengali text-[13px]' : 'font-sans-en text-[9px] tracking-[0.16em]'
      )}>
        {label}
      </span>
      <span className="absolute bottom-0 left-1.5 right-1.5 h-px scale-x-0 bg-primary group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full" />
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Main Header — Airbnb-style two-phase layout
   Phase 1 (top): Full expanded header with logo + nav + actions
   Phase 2 (scrolled past threshold): Compact sticky bar
───────────────────────────────────────────────────────────────── */
export function Header() {
  const params = useParams();
  const locale = params.locale as string;
  const isBn = locale === 'bn';

  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const prev = lastScrollYRef.current;

      setIsScrolled(y > SCROLL_THRESHOLD);

      // Only hide if we've scrolled down a reasonable amount AND we are scrolling down
      if (y > SCROLL_THRESHOLD + 100) {
        setHidden(y > prev);
      } else {
        setHidden(false);
      }

      lastScrollYRef.current = y;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}`, label: isBn ? 'হোম' : 'Home' },
    { href: `/${locale}/shop`, label: isBn ? 'শপ' : 'Shop' },
    { href: `/${locale}/collections`, label: isBn ? 'সংগ্রহ' : 'Collections' },
    { href: `/${locale}/categories`, label: isBn ? 'ক্যাটাগরি' : 'Categories' },
    { href: `/${locale}#story`, label: isBn ? 'আমাদের গল্প' : 'Story' },
  ];

  return (
    <>
      {/* ── HEADER ── */}
      <motion.header
        animate={{ 
          y: hidden ? -100 : 0
        }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none px-4 sm:px-6 lg:px-8 pt-4 md:pt-5"
      >
        <motion.div
          layout
          initial={false}
          transition={{ duration: 0.4, ease: EASE }}
          className={cn(
            "flex items-center justify-between pointer-events-auto overflow-hidden",
            isScrolled 
              ? "bg-background/85 backdrop-blur-xl border border-border/60 shadow-lg rounded-full px-2 pr-4 md:px-3 md:pr-5 py-1.5 gap-4 lg:gap-8 w-max" 
              : "w-full max-w-7xl bg-transparent gap-4 h-12 md:h-14"
          )}
        >
        {/* Logo */}
        <Link 
          href={`/${locale}`} 
          className={cn(
            "group flex items-center shrink-0 transition-all duration-300 pointer-events-auto",
            isScrolled 
              ? "gap-2 bg-background/50 hover:bg-background/80 p-1.5 pr-3 md:pr-4 rounded-full" 
              : "gap-2.5"
          )}
        >
          <div className={cn(
            "relative rounded-full border flex items-center justify-center overflow-hidden transition-all duration-300",
            isScrolled ? "size-8 md:size-9 bg-secondary border-border" : "size-10 md:size-11 bg-background/80 backdrop-blur-md border-border/50"
          )}>
            <BrandMascot 
              size={isScrolled ? 20 : 26} 
              className={cn(
                "text-foreground transition-transform duration-500 group-hover:scale-110",
                !isScrolled && "translate-y-[2px]"
              )} 
            />
            {!isScrolled && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 border-[0.5px] border-dashed border-primary/30 rounded-full scale-[0.85]"
              />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <span className={cn(
              "font-sans-en font-extrabold text-foreground uppercase leading-none transition-all duration-300",
              isScrolled 
                ? "tracking-[0.18em] text-[12px] md:text-[14px] hidden sm:block" 
                : "tracking-[0.2em] md:tracking-[0.25em] text-[17px] md:text-[20px]"
            )}>
              WOMANIYA
            </span>
            {!isScrolled && (
              <span className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-primary/80 font-sans-en mt-0.5 hidden sm:block">
                {isBn ? 'স্থাপিত ২০১৯' : 'EST. 2019'}
              </span>
            )}
          </div>
        </Link>

        {/* Center Nav */}
        <nav className={cn(
          "hidden lg:flex items-center transition-all duration-300 pointer-events-auto",
          isScrolled 
            ? "gap-1" 
            : "gap-1 xl:gap-2 px-5 py-2"
        )}>
          {navLinks.map((l) => (
            isScrolled 
              ? <CompactNavLink key={l.href} href={l.href} label={l.label} isBn={isBn} />
              : <NavLink key={l.href} href={l.href} label={l.label} isBn={isBn} />
          ))}
        </nav>

        {/* Right Actions */}
        <div className={cn(
          "flex items-center gap-2 shrink-0 transition-all duration-300 pointer-events-auto",
          isScrolled ? "border-l border-border/50 pl-4 lg:pl-0 lg:border-none" : "pr-2"
        )}>
          <ThemeToggle />
          <LocaleToggle locale={locale} />
        </div>

        </motion.div>
      </motion.header>
    </>
  );
}
