'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const inputBaseClasses =
  'w-full px-4 rounded-sm border bg-bengal-cream text-bengal-kajal text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors';
const inputErrorClasses = 'border-bengal-alta ring-2 ring-bengal-alta/20';
const labelClasses =
  'text-[10px] tracking-widest uppercase font-medium text-bengal-kajal/70 font-sans-en';
const errorTextClasses = 'text-bengal-alta text-xs font-medium mt-1';

interface FormFieldProps {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ label, error, id, className, children }: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && label.length > 0 ? (
        <label htmlFor={id} className={labelClasses}>
          {label}
        </label>
      ) : null}
      {children}
      {error && <p className={errorTextClasses}>{error}</p>}
    </div>
  );
}

interface FormTextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
  isBengali?: boolean;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, id, isBengali, className, ...props }, ref) => {
    const textareaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return (
      <FormField label={label ?? ''} error={error} id={textareaId}>
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            inputBaseClasses,
            'py-3 resize-none min-h-[44px]',
            isBengali ? 'font-bengali' : '',
            error ? 'border-bengal-alta ' + inputErrorClasses : 'border-bengal-kansa/30',
            className
          )}
          {...props}
        />
      </FormField>
    );
  }
);
FormTextarea.displayName = 'FormTextarea';

interface FormSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, id, className, children, ...props }, ref) => {
    const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    return (
      <FormField label={label ?? ''} error={error} id={selectId}>
        <select
          ref={ref}
          id={selectId}
          className={cn(
            inputBaseClasses,
            'h-12 appearance-none',
            error ? 'border-bengal-alta ' + inputErrorClasses : 'border-bengal-kansa/30',
            className
          )}
          {...props}
        >
          {children}
        </select>
      </FormField>
    );
  }
);
FormSelect.displayName = 'FormSelect';
