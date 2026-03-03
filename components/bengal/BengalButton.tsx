import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'zari' | 'outline' | 'whatsapp';
type Size    = 'sm' | 'md' | 'lg' | 'touch';

interface BengalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant;
  size?:      Size;
  loading?:   boolean;
  isBengali?: boolean;
}

const variants: Record<Variant, string> = {
  primary:   'bg-bengal-sindoor text-bengal-kori hover:bg-bengal-alta shadow-sm border border-transparent active:shadow-none hover:-translate-y-0.5',
  secondary: 'bg-bengal-mati text-bengal-kajal hover:bg-bengal-dust border border-bengal-kansa/20 shadow-sm active:shadow-none hover:-translate-y-0.5',
  ghost:     'bg-transparent text-bengal-kajal hover:bg-bengal-mati border border-transparent shadow-none',
  zari:      'bg-bengal-kansa text-bengal-kajal hover:opacity-90 shadow-sm border border-transparent active:shadow-none hover:-translate-y-0.5',
  outline:   'bg-transparent text-bengal-sindoor hover:bg-bengal-sindoor hover:text-bengal-kori border border-bengal-sindoor/70 shadow-sm active:shadow-none hover:-translate-y-0.5',
  whatsapp:  'bg-[#25D366] text-white hover:bg-[#20ba5a] shadow-sm border border-transparent active:shadow-none hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm:    'h-8 px-4 text-[10px] tracking-widest rounded-full',
  md:    'h-10 px-5 text-xs tracking-widest rounded-full',
  lg:    'h-12 px-7 text-sm tracking-wide rounded-full',
  touch: 'h-14 px-6 text-sm tracking-wide w-full rounded-full',
};

export const BengalButton = React.forwardRef<HTMLButtonElement, BengalButtonProps>(
  ({ variant = 'primary', size = 'md', loading, isBengali, className, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        whileHover={{ y: -1 }}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium uppercase',
          'transition-all duration-200 touch-manipulation select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
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
