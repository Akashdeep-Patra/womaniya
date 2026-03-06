'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Command as CommandPrimitive } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { SearchIcon, ArrowRight, CornerDownLeft } from 'lucide-react';
import { getNavGroups, type NavItem } from '@/lib/admin-nav';
import { useMediaQuery } from '@/lib/use-media-query';
import { cn } from '@/lib/utils';

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale: string;
};

export function CommandPalette({ open, onOpenChange, locale }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 639px)');
  const navGroups = useMemo(() => getNavGroups(locale), [locale]);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const openRef = useRef(open);
  openRef.current = open;

  // Keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!openRef.current);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onOpenChange]);

  // Reset search when closing
  useEffect(() => {
    if (!open) setSearch('');
  }, [open]);

  const handleSelect = useCallback(
    (href: string) => {
      onOpenChange(false);
      router.push(href);
    },
    [onOpenChange, router],
  );

  // Check if item is current page
  const isActive = useCallback(
    (href: string) => pathname === href,
    [pathname],
  );

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const desktopVariants = {
    hidden: { opacity: 0, scale: 0.96, y: -8 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: -8,
      transition: { duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const mobileVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { type: 'spring' as const, damping: 30, stiffness: 400 },
    },
    exit: {
      y: '100%',
      transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            {/* Overlay */}
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>

            {/* Content */}
            <DialogPrimitive.Content
              asChild
              forceMount
              onOpenAutoFocus={(e) => {
                e.preventDefault();
                inputRef.current?.focus();
              }}
            >
              <motion.div
                className={cn(
                  'fixed z-50 outline-none',
                  isMobile
                    ? 'inset-x-0 bottom-0'
                    : 'top-[min(20vh,140px)] left-1/2 w-full max-w-[560px] -translate-x-1/2 px-4',
                )}
                variants={isMobile ? mobileVariants : desktopVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DialogPrimitive.Title className="sr-only">Command palette</DialogPrimitive.Title>
                <DialogPrimitive.Description className="sr-only">
                  Search for admin pages and actions
                </DialogPrimitive.Description>
                <div
                  className={cn(
                    'bg-card border border-border shadow-2xl overflow-hidden',
                    isMobile
                      ? 'rounded-t-2xl pb-safe'
                      : 'rounded-2xl',
                  )}
                >
                  {/* Mobile drag handle */}
                  {isMobile && (
                    <div className="flex justify-center pt-3 pb-1">
                      <div className="w-8 h-1 rounded-full bg-muted-foreground/20" />
                    </div>
                  )}

                  <CommandPrimitive
                    className="flex flex-col"
                    loop
                    shouldFilter
                  >
                    {/* Search input */}
                    <div className="flex items-center gap-3 px-4 border-b border-border">
                      <SearchIcon size={16} className="text-muted-foreground/60 shrink-0" />
                      <CommandPrimitive.Input
                        ref={inputRef}
                        value={search}
                        onValueChange={setSearch}
                        placeholder="Where do you want to go?"
                        className="flex-1 h-12 md:h-[52px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                      />
                      {!isMobile && (
                        <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] tracking-wider text-muted-foreground/50 font-mono bg-muted/50 border border-border rounded-md px-1.5 py-0.5">
                          ESC
                        </kbd>
                      )}
                    </div>

                    {/* Results */}
                    <CommandPrimitive.List
                      className={cn(
                        'overflow-y-auto overscroll-contain scroll-smooth',
                        isMobile ? 'max-h-[60vh]' : 'max-h-[min(50vh,400px)]',
                      )}
                    >
                      <CommandPrimitive.Empty className="flex flex-col items-center justify-center py-12 gap-2">
                        <SearchIcon size={24} className="text-muted-foreground/20" />
                        <p className="text-sm text-muted-foreground/60">No pages found</p>
                      </CommandPrimitive.Empty>

                      {navGroups.map((group, gi) => {
                        const heading = group.title || (gi === 0 ? 'General' : 'System');
                        return (
                          <CommandPrimitive.Group
                            key={gi}
                            heading={heading}
                            className="px-2 py-1.5 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:text-muted-foreground/60 [&_[cmdk-group-heading]]:font-semibold"
                          >
                            {group.items.map((item) => (
                              <PaletteItem
                                key={item.href}
                                item={item}
                                active={isActive(item.href)}
                                onSelect={handleSelect}
                                isMobile={isMobile}
                              />
                            ))}
                          </CommandPrimitive.Group>
                        );
                      })}
                    </CommandPrimitive.List>

                    {/* Footer */}
                    {!isMobile && (
                      <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border bg-muted/30">
                        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
                          <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-muted/60 border border-border text-[10px] font-mono">
                            <span className="text-[8px]">▲</span>
                          </kbd>
                          <kbd className="inline-flex items-center justify-center w-5 h-5 rounded bg-muted/60 border border-border text-[10px] font-mono">
                            <span className="text-[8px]">▼</span>
                          </kbd>
                          Navigate
                        </span>
                        <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50">
                          <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded bg-muted/60 border border-border text-[10px] font-mono">
                            <CornerDownLeft size={10} />
                          </kbd>
                          Open
                        </span>
                      </div>
                    )}
                  </CommandPrimitive>
                </div>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}

function PaletteItem({
  item,
  active,
  onSelect,
  isMobile,
}: {
  item: NavItem;
  active: boolean;
  onSelect: (href: string) => void;
  isMobile: boolean;
}) {
  const Icon = item.icon;

  return (
    <CommandPrimitive.Item
      value={item.label}
      onSelect={() => onSelect(item.href)}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl cursor-default select-none outline-none transition-colors duration-150',
        isMobile ? 'px-3 py-3.5 min-h-[48px]' : 'px-3 py-2.5',
        'data-[selected=true]:bg-primary/[0.07] data-[selected=true]:text-foreground',
        active && 'text-primary',
      )}
    >
      <div
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-lg shrink-0 transition-colors duration-150',
          active
            ? 'bg-primary/12 text-primary'
            : 'bg-muted/60 text-muted-foreground group-data-[selected=true]:bg-primary/10 group-data-[selected=true]:text-primary',
        )}
      >
        <Icon size={15} strokeWidth={1.8} />
      </div>

      <span className="flex-1 text-sm font-medium truncate">{item.label}</span>

      {active && (
        <span className="text-[10px] tracking-wider uppercase text-primary/60 font-medium shrink-0">
          Current
        </span>
      )}

      <ArrowRight
        size={14}
        className="text-muted-foreground/0 shrink-0 transition-all duration-150 -translate-x-1 group-data-[selected=true]:text-muted-foreground/40 group-data-[selected=true]:translate-x-0"
      />
    </CommandPrimitive.Item>
  );
}
