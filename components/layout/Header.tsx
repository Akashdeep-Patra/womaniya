'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter as useIntlRouter, usePathname as useIntlPathname } from '@/i18n/navigation';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
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
        'border-border/50 text-foreground/70 bg-background shadow-sm',
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
  const intlRouter = useIntlRouter();
  const intlPathname = useIntlPathname();

  const handleSwitch = () => {
    const next = isEn ? 'bn' : 'en';
    intlRouter.replace(intlPathname, { locale: next });
  };

  return (
    <button
      onClick={handleSwitch}
      aria-label="Switch language"
      className={cn(
        'h-8 px-3 rounded-full border flex items-center justify-center',
        'border-border/50 text-foreground/70 bg-background shadow-sm',
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
   Main Header — Airbnb-style two-phase layout (Crossfade for performance)
───────────────────────────────────────────────────────────────── */
export function Header() {
  const params = useParams();
  const locale = params.locale as string;
  const isBn = locale === 'bn';

  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollYRef = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setIsScrolled(y > SCROLL_THRESHOLD);
    lastScrollYRef.current = y;
  });

  const navLinks = [
    { href: `/${locale}`, label: isBn ? 'হোম' : 'Home' },
    { href: `/${locale}/shop`, label: isBn ? 'শপ' : 'Shop' },
    { href: `/${locale}/collections`, label: isBn ? 'সংগ্রহ' : 'Collections' },
    { href: `/${locale}/categories`, label: isBn ? 'ক্যাটাগরি' : 'Categories' },
    { href: `/${locale}/campaigns`, label: isBn ? 'ক্যাম্পেইন' : 'Campaigns' },
    { href: `/${locale}/stories`, label: isBn ? 'আমাদের গল্প' : 'Stories' },
  ];

  return (
    <>
      {/* ── HEADER ── */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 pointer-events-none pt-4 md:pt-5 flex justify-center w-full max-w-[1800px] h-24">
        
        {/* Phase 1: Expanded Header */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isScrolled ? 0 : 1, 
            y: isScrolled ? -15 : 0,
            scale: isScrolled ? 0.98 : 1
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className={cn(
            "absolute top-4 md:top-5 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between origin-top",
            isScrolled ? "pointer-events-none" : "pointer-events-auto"
          )}
        >
          {/* Expanded Logo */}
          <Link prefetch={true} 
            href={`/${locale}`} 
            className="group flex items-center shrink-0 gap-2.5 p-1.5 pr-4 md:pr-5 bg-background/50 backdrop-blur-md hover:bg-background/70 rounded-full shadow-sm border border-border/20 transition-colors"
          >
            <div className="relative rounded-full flex items-center justify-center overflow-hidden size-11 md:size-12">
              <BrandMascot 
                size={44} 
                className="text-foreground" 
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-sans-en font-extrabold text-foreground uppercase leading-none tracking-[0.2em] md:tracking-[0.25em] text-[17px] md:text-[20px]">
                WOMANIYA
              </span>
              <span className="text-[8px] md:text-[9px] tracking-[0.3em] uppercase text-primary/80 font-sans-en mt-0.5 hidden sm:block">
                {isBn ? 'স্থাপিত ২০১৯' : 'EST. 2019'}
              </span>
            </div>
          </Link>

          {/* Expanded Center Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-5 py-1.5 bg-background/50 backdrop-blur-md rounded-full shadow-sm border border-border/20">
            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} isBn={isBn} />
            ))}
          </nav>

          {/* Expanded Right Actions */}
          <div className="flex items-center gap-2 shrink-0 p-1.5 bg-background/50 backdrop-blur-md rounded-full shadow-sm border border-border/20">
            <ThemeToggle />
            <LocaleToggle locale={locale} />
          </div>
        </motion.div>

        {/* Phase 2: Compact Header */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isScrolled ? 1 : 0, 
            y: isScrolled ? 0 : 15,
            scale: isScrolled ? 1 : 0.98
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className={cn(
            "absolute top-4 md:top-5 flex items-center bg-background/85 backdrop-blur-md border border-border/60 shadow-lg rounded-full px-2 pr-4 md:px-3 md:pr-5 py-1.5 gap-4 lg:gap-8 w-max origin-top",
            isScrolled ? "pointer-events-auto" : "pointer-events-none"
          )}
        >
          {/* Compact Logo */}
          <Link prefetch={true} 
            href={`/${locale}`} 
            className="group flex items-center shrink-0 gap-2 p-1.5 pr-3 md:pr-4 bg-background/50 hover:bg-background/80 rounded-full transition-colors"
          >
            <div className="relative rounded-full flex items-center justify-center overflow-hidden size-9 md:size-10">
              <BrandMascot 
                size={36} 
                className="text-foreground" 
              />
            </div>
            <div className="flex flex-col justify-center hidden sm:block">
              <span className="font-sans-en font-extrabold text-foreground uppercase leading-none tracking-[0.18em] text-[12px] md:text-[14px]">
                WOMANIYA
              </span>
            </div>
          </Link>

          {/* Compact Center Nav */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full">
            {navLinks.map((l) => (
              <CompactNavLink key={l.href} href={l.href} label={l.label} isBn={isBn} />
            ))}
          </nav>

          {/* Compact Right Actions */}
          <div className="flex items-center gap-2 shrink-0 border-l border-border/50 pl-4 lg:pl-0 lg:border-none">
            <ThemeToggle />
            <LocaleToggle locale={locale} />
          </div>
        </motion.div>

      </header>
    </>
  );
}
