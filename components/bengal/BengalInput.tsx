'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

interface BengalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:     string;
  error?:     string;
  isBengali?: boolean;
}

export const BengalInput = React.forwardRef<HTMLInputElement, BengalInputProps>(
  ({ label, error, isBengali, className, id, type, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

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
        <div className="relative w-full">
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={cn(
              'w-full h-12 px-4 rounded-xl border bg-bengal-cream cursor-text',
              'border-bengal-kansa/25 text-bengal-kajal placeholder:text-bengal-kajal/35',
              'focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/20 focus:border-bengal-sindoor',
              'transition-all text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50',
              isBengali ? 'font-bengali' : 'font-sans-en',
              error ? 'border-bengal-alta ring-2 ring-bengal-alta/20' : '',
              isPassword && 'pr-12',
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-bengal-kansa hover:text-bengal-kajal cursor-pointer transition-colors focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-bengal-alta text-xs font-medium">{error}</p>
        )}
      </div>
    );
  }
);
BengalInput.displayName = 'BengalInput';
