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
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70',
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
            'w-full h-12 px-4 rounded-sm border bg-bengal-cream',
            'border-bengal-kansa/30 text-bengal-kajal placeholder:text-bengal-kajal/40',
            'focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor',
            'transition-colors text-sm',
            isBengali ? 'font-bengali' : 'font-sans-en',
            error ? 'border-bengal-alta ring-1 ring-bengal-alta/30' : '',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-bengal-alta text-xs">{error}</p>
        )}
      </div>
    );
  }
);
BengalInput.displayName = 'BengalInput';
