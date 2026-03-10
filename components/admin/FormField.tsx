'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const inputBaseClasses =
  'w-full px-4 rounded-sm border bg-bengal-cream text-foreground text-sm font-sans-en focus:outline-none focus:ring-2 focus:ring-bengal-sindoor/30 focus:border-bengal-sindoor transition-colors';
const inputErrorClasses = 'border-bengal-alta ring-2 ring-bengal-alta/20';
const labelClasses =
  'text-[10px] tracking-widest uppercase font-medium text-foreground/70 font-sans-en';
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
            'py-3 resize-none min-h-[44px] cursor-text',
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

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormSelectProps {
  label?: string;
  error?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
}

export function FormSelect({ label, error, id, className, children, value, onValueChange, defaultValue, disabled, name }: FormSelectProps) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  
  const options: { value: string; label: string; disabled?: boolean }[] = [];
  let placeholder = "Select an option...";

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === 'option') {
      const props = child.props as React.OptionHTMLAttributes<HTMLOptionElement>;
      if (props.value === "" && props.disabled) {
        placeholder = props.children as string;
      } else {
        const optValue = String(props.value ?? '');
        options.push({
          value: optValue === '' ? '__EMPTY__' : optValue,
          label: props.children as string,
          disabled: props.disabled,
        });
      }
    }
  });

  // Handle number to string conversion for value if needed, Radix Select only accepts string values
  // Map empty string value to '__EMPTY__' to avoid Radix UI empty string value restriction
  let stringValue: string | undefined = undefined;
  if (value !== undefined && value !== null) {
    stringValue = String(value);
    if (stringValue === '') stringValue = '__EMPTY__';
  } else if (defaultValue !== undefined && defaultValue !== null) {
    stringValue = String(defaultValue);
    if (stringValue === '') stringValue = '__EMPTY__';
  }
  
  // Only set stringValue if there's a matching option, otherwise let it be undefined to show placeholder
  const hasMatchingOption = options.some(opt => opt.value === stringValue);
  if (!hasMatchingOption) {
    stringValue = undefined;
  }

  const handleValueChange = (val: string) => {
    if (!onValueChange) return;
    onValueChange(val === '__EMPTY__' ? '' : val);
  };

  return (
    <FormField label={label ?? ''} error={error} id={selectId}>
      <Select value={stringValue} onValueChange={handleValueChange} disabled={disabled} name={name}>
        <SelectTrigger 
          id={selectId} 
          className={cn(
            "h-12 w-full px-4 rounded-xl border bg-card text-foreground text-sm font-sans-en cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm",
            error ? "border-destructive ring-2 ring-destructive/20" : "border-border", 
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-popover text-popover-foreground border-border rounded-xl shadow-lg z-50">
          {options.map((opt) => (
            <SelectItem key={opt.value} value={String(opt.value)} disabled={opt.disabled} className="cursor-pointer">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );
}
