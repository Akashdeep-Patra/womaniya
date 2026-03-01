'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { LocaleSwitcher } from './LocaleSwitcher';
import { cn } from '@/lib/utils';

export function Header() {
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params.locale as string;

  const [scrolled,    setScrolled]    = useState(false);
  const [hidden,      setHidden]      = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastScrollY && y > 80);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: `/${locale}`,        label: t('home')  },
    { href: `/${locale}/shop`,   label: t('shop')  },
    { href: `/${locale}#story`,  label: t('story') },
  ];

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-bengal-kori/90 backdrop-blur-md border-b border-bengal-kansa/20 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 md:h-16">

            {/* Hamburger (mobile) */}
            <button
              className="min-h-[44px] min-w-[44px] flex items-center justify-center md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label={t('menu')}
            >
              <Menu size={22} className="text-bengal-kajal" />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs tracking-widest uppercase font-medium text-bengal-kajal hover:text-bengal-sindoor transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo — center */}
            <Link
              href={`/${locale}`}
              className="absolute left-1/2 -translate-x-1/2 font-editorial text-xl md:text-2xl tracking-widest text-bengal-kajal hover:text-bengal-sindoor transition-colors"
            >
              W O M A N I A
            </Link>

            {/* Right — locale + cart */}
            <div className="flex items-center gap-3">
              <LocaleSwitcher />
              <button
                className="min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label={t('cart')}
              >
                <ShoppingBag size={20} className="text-bengal-kajal hover:text-bengal-sindoor transition-colors" />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{   opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-bengal-kori flex flex-col"
          >
            {/* Close button */}
            <div className="flex items-center justify-between px-4 h-14 border-b border-bengal-kansa/20">
              <span className="font-editorial text-lg tracking-widest">W O M A N I A</span>
              <button
                className="min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setMenuOpen(false)}
                aria-label={t('close')}
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-4 font-editorial text-4xl text-bengal-kajal hover:text-bengal-sindoor transition-colors"
                  >
                    {link.label}
                  </Link>
                  <div className="h-px bg-bengal-kansa/20" />
                </motion.div>
              ))}
            </nav>

            {/* Bottom locale switcher */}
            <div className="px-8 pb-12 pt-6">
              <LocaleSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
