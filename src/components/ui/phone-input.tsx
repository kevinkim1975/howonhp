'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  value?: string;
  onChange?: (value: string) => void;
}

// 전화번호 포맷팅 (010-1234-5678)
function formatPhoneNumber(value: string): string {
  const numbers = value.replace(/\D/g, '');
  
  if (numbers.length <= 3) {
    return numbers;
  }
  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    { className, label, error, helperText, value, onChange, id, ...props },
    ref
  ) => {
    const inputId = id || React.useId();
    const [displayValue, setDisplayValue] = React.useState(() =>
      value ? formatPhoneNumber(value) : ''
    );

    // Sync with external value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setDisplayValue(formatPhoneNumber(value));
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;
      const formatted = formatPhoneNumber(rawValue);
      setDisplayValue(formatted);
      
      // Pass raw numbers to parent
      const rawNumbers = rawValue.replace(/\D/g, '').slice(0, 11);
      onChange?.(rawNumbers);
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-navy-900"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </label>
        )}
        <input
          type="tel"
          inputMode="numeric"
          id={inputId}
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          placeholder="010-0000-0000"
          maxLength={13}
          className={cn(
            'flex h-11 w-full rounded-lg border bg-white px-4 py-2 text-sm text-navy-900 transition-colors',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-0',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-cta',
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="mt-1.5 text-sm text-red-500"
            role="alert"
          >
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
