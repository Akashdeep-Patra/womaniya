import * as React from 'react';
import { cn } from '@/lib/utils';

interface BengalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string;
  error?:     string;
  isBengali?: boolean;
}

export const BengalInput = React.forwardRef<HTMLInputElement, BengalInputProps>(
  ({ label, error, isBengali, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="flex flex-col gap-2 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-[11px] tracking-widest uppercase font-semibold text-bengal-kajal/60',
              isBengali ? 'font-bengali text-xs tracking-normal' : 'font-sans-en'
            )}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full h-12 px-4 rounded-xl border bg-bengal-cream',
            'border-bengal-kansa/25 text-bengal-kajal placeholder:text-bengal-kajal/35',
            'focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/20 focus:border-bengal-sindoor',
            'transition-all text-sm shadow-sm',
            isBengali ? 'font-bengali' : 'font-sans-en',
            error ? 'border-bengal-alta ring-2 ring-bengal-alta/20' : '',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-bengal-alta text-xs font-medium">{error}</p>
        )}
      </div>
    );
  }
);
BengalInput.displayName = 'BengalInput';
