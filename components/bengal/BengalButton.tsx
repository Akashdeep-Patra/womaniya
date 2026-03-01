import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'zari' | 'outline';
type Size    = 'sm' | 'md' | 'lg' | 'touch';

interface BengalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  Variant;
  size?:     Size;
  asChild?:  boolean;
  loading?:  boolean;
  isBengali?: boolean;
}

const variants: Record<Variant, string> = {
  primary:   'bg-bengal-sindoor text-bengal-kori hover:bg-bengal-alta border border-transparent',
  secondary: 'bg-bengal-mati text-bengal-kajal hover:bg-bengal-dust border border-bengal-kansa/30',
  ghost:     'bg-transparent text-bengal-kajal hover:bg-bengal-mati border border-transparent',
  zari:      'bg-bengal-kansa text-bengal-kajal hover:opacity-90 border border-bengal-kansa',
  outline:   'bg-transparent text-bengal-sindoor hover:bg-bengal-sindoor hover:text-bengal-kori border border-bengal-sindoor',
};

const sizes: Record<Size, string> = {
  sm:    'h-8 px-4 text-[10px] tracking-widest',
  md:    'h-10 px-6 text-xs tracking-widest',
  lg:    'h-12 px-8 text-sm tracking-wider',
  touch: 'h-14 px-8 text-sm tracking-wider w-full',  // mobile-optimised full-width
};

export const BengalButton = React.forwardRef<HTMLButtonElement, BengalButtonProps>(
  ({ variant = 'primary', size = 'md', loading, isBengali, className, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium uppercase rounded-sm',
          'transition-colors duration-200 touch-manipulation select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          isBengali ? 'font-bengali tracking-normal' : 'font-sans-en',
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            {children}
          </span>
        ) : children}
      </motion.button>
    );
  }
);
BengalButton.displayName = 'BengalButton';
