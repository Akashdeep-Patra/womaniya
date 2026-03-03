'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { 
  Home, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Sparkles,
  Info,
  LayoutGrid,
  Layers,
  Moon,
  Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generalEnquiryUrl } from '@/lib/whatsapp';
import type { Category } from '@/db/schema';
import { useTheme } from 'next-themes';

interface BottomNavProps {
  categories?: Category[];
}

export function BottomNav({ categories: dbCategories }: BottomNavProps) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale as string;
  const isBn = locale === 'bn';
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const closeSheet = () => setIsOpen(false);

  const mainLinks = [
    { href: `/${locale}`,      label: t('home'),  Icon: Home        },
    { href: `/${locale}/shop`, label: t('shop'),  Icon: ShoppingBag },
    { href: `/${locale}/collections`, label: isBn ? 'সংগ্রহ' : 'Collections', Icon: Layers },
    { href: `/${locale}/categories`,  label: isBn ? 'ক্যাটাগরি' : 'Categories', Icon: LayoutGrid },
  ];

  const categories = dbCategories && dbCategories.length > 0
    ? dbCategories.map((c) => ({
        name: isBn && c.name_bn ? c.name_bn : c.name_en,
        href: `/${locale}/shop?category=${encodeURIComponent(c.name_en)}`,
      }))
    : [];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/90 backdrop-blur-md border-t border-border pb-safe">
        <div className="grid grid-cols-5 h-15">
          {mainLinks.map(({ href, label, Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                prefetch={true}
                onClick={closeSheet}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 min-h-[44px] relative',
                  'text-[9px] tracking-widest uppercase transition-all duration-300',
                  active
                    ? 'text-bengal-sindoor font-medium'
                    : 'text-bengal-kajal/50 hover:text-bengal-kajal font-normal'
                )}
              >
                {active && (
                  <motion.div 
                    layoutId="bottom-nav-indicator" 
                    className="absolute top-0 w-8 h-[2px] bg-bengal-sindoor rounded-b-md" 
                  />
                )}
                <Icon 
                  size={24} 
                  strokeWidth={active ? 2.5 : 2} 
                  className={cn(
                    "transition-all duration-300 drop-shadow-sm",
                    active ? "fill-bengal-sindoor/20" : "fill-transparent"
                  )} 
                />
                <span className={isBn ? 'font-bengali tracking-wide' : 'font-sans-en'}>{label}</span>
              </Link>
            );
          })}
          
          {/* Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'flex flex-col items-center justify-center gap-1 min-h-[44px] relative',
              'text-[9px] tracking-widest uppercase transition-all duration-300',
              isOpen
                ? 'text-bengal-sindoor font-medium'
                : 'text-bengal-kajal/50 hover:text-bengal-kajal font-normal'
            )}
          >
            {isOpen ? (
              <X size={24} strokeWidth={2.5} className="drop-shadow-sm fill-bengal-sindoor/20" />
            ) : (
              <Menu size={24} strokeWidth={2} className="drop-shadow-sm fill-transparent" />
            )}
            <span className={isBn ? 'font-bengali tracking-wide' : 'font-sans-en'}>{t('menu')}</span>
          </button>
        </div>
      </nav>

      {/* ── BOTTOM SHEET OVERLAY ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 bg-bengal-kajal/40 backdrop-blur-sm z-30 md:hidden"
              onClick={closeSheet}
            />

            {/* Sheet */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed bottom-15 left-0 right-0 bg-background z-30 rounded-t-3xl border-t border-border overflow-hidden shadow-lg md:hidden max-h-[80vh] flex flex-col will-change-transform pb-[env(safe-area-inset-bottom)]"
            >
              {/* Handle */}
              <div className="flex justify-center pt-4 pb-2" onClick={closeSheet}>
                <div className="w-12 h-1 bg-bengal-kansa/40 rounded-full" />
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto px-6 pt-4 pb-8 flex-1 custom-scrollbar">
                
                {/* Brand Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className={`text-2xl text-bengal-kajal mb-1 ${isBn ? 'font-bengali-serif' : 'font-editorial italic'}`}>
                      Womaniya
                    </h3>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-bengal-kansa font-sans-en">
                      {isBn ? 'খাঁটি হস্তশিল্প' : 'Authentic Handloom'}
                    </p>
                  </div>
                  
                  {/* Theme Toggle within Sheet */}
                  {mounted && (
                    <button
                      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                      aria-label="Toggle theme"
                      className="h-10 w-10 rounded-full border border-bengal-kansa/40 text-bengal-kajal bg-bengal-kansa/5 flex items-center justify-center hover:bg-bengal-kajal hover:text-bengal-kori transition-colors touch-manipulation"
                    >
                      {resolvedTheme === 'dark' ? (
                        <Sun className="w-4 h-4" />
                      ) : (
                        <Moon className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>

                {/* Main Navigation inside Sheet */}
                <div className="space-y-4 mb-8">
                  <Link href={`/${locale}/shop`} onClick={closeSheet} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 text-bengal-kajal">
                      <Sparkles size={20} strokeWidth={2} className="text-bengal-kansa drop-shadow-sm fill-bengal-kansa/20" />
                      <span className={`text-lg ${isBn ? 'font-bengali' : 'font-sans-en font-light tracking-wide'}`}>
                        {isBn ? 'নতুন সংগ্রহ' : 'New Arrivals'}
                      </span>
                    </div>
                    <ChevronRight size={18} strokeWidth={2} className="text-bengal-kajal/40 group-hover:text-bengal-kansa transition-colors drop-shadow-sm" />
                  </Link>
                  <Link href={`/${locale}#story`} onClick={closeSheet} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3 text-bengal-kajal">
                      <Info size={20} strokeWidth={2} className="text-bengal-kansa drop-shadow-sm fill-bengal-kansa/20" />
                      <span className={`text-lg ${isBn ? 'font-bengali' : 'font-sans-en font-light tracking-wide'}`}>
                        {isBn ? 'আমাদের কথা' : 'About Us'}
                      </span>
                    </div>
                    <ChevronRight size={18} strokeWidth={2} className="text-bengal-kajal/40 group-hover:text-bengal-kansa transition-colors drop-shadow-sm" />
                  </Link>
                </div>

                <div className="w-full h-px bg-bengal-kansa/20 mb-8" />

                {/* Categories */}
                <div className="mb-8">
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-bengal-kajal/50 mb-4 font-sans-en">
                    {isBn ? 'শাড়ির ধরন' : 'Categories'}
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat.name}
                        href={cat.href}
                        onClick={closeSheet}
                        className="flex items-center gap-2 text-bengal-kajal/80 hover:text-bengal-sindoor transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-bengal-kansa/40" />
                        <span className={`text-sm ${isBn ? 'font-bengali' : 'font-sans-en'}`}>
                          {cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="w-full h-px bg-bengal-kansa/20 mb-8" />

                {/* Support / Contact */}
                <div>
                  <h4 className="text-[10px] tracking-[0.2em] uppercase text-bengal-kajal/50 mb-4 font-sans-en">
                    {isBn ? 'যোগাযোগ' : 'Support'}
                  </h4>
                  <div className="space-y-4">
                    <a href={generalEnquiryUrl(locale)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-bengal-kajal/80">
                      <MessageCircle size={18} strokeWidth={2} className="drop-shadow-sm fill-bengal-kajal/5" />
                      <span className={`text-sm ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                        {isBn ? 'হোয়াটসঅ্যাপ করুন' : 'WhatsApp Us'}
                      </span>
                    </a>
                    <div className="flex items-center gap-3 text-bengal-kajal/80">
                      <Phone size={18} strokeWidth={2} className="drop-shadow-sm fill-bengal-kajal/5" />
                      <span className="text-sm font-sans-en font-light">+91 91431 61829</span>
                    </div>
                    <div className="flex items-center gap-3 text-bengal-kajal/80">
                      <MapPin size={18} strokeWidth={2} className="drop-shadow-sm fill-bengal-kajal/5" />
                      <span className={`text-sm ${isBn ? 'font-bengali' : 'font-sans-en font-light'}`}>
                        {isBn ? 'কলকাতা, ভারত' : 'Kolkata, India'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
