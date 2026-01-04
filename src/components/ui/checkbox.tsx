'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Single Checkbox
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            id={inputId}
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              'flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 transition-colors',
              'border-gray-300 bg-white',
              'peer-checked:border-cta peer-checked:bg-cta',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-cta peer-focus-visible:ring-offset-2',
              'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
              className
            )}
          >
            <Check className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" />
          </label>
        </div>
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label
                htmlFor={inputId}
                className="cursor-pointer text-sm font-medium text-navy-900"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);
Checkbox.displayName = 'Checkbox';

// Checkbox Group
export interface CheckboxOption {
  value: string;
  label: string;
  description?: string;
}

export interface CheckboxGroupProps {
  label?: string;
  options: CheckboxOption[];
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

function CheckboxGroup({
  label,
  options,
  value,
  onChange,
  error,
  className,
  columns = 2,
}: CheckboxGroupProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <fieldset className={className}>
      {label && (
        <legend className="mb-3 text-sm font-medium text-navy-900">
          {label}
        </legend>
      )}
      <div className={cn('grid gap-3', columnClasses[columns])}>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            description={option.description}
            checked={value.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
          />
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

// Consent Checkbox (개인정보 동의)
export interface ConsentCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  required?: boolean;
  linkText?: string;
  linkHref?: string;
}

function ConsentCheckbox({
  checked,
  onChange,
  error,
  required = true,
  linkText = '개인정보 수집 및 이용',
  linkHref = '/privacy',
}: ConsentCheckboxProps) {
  const inputId = React.useId();

  return (
    <div>
      <div className="flex items-start">
        <div className="flex h-5 items-center">
          <input
            type="checkbox"
            id={inputId}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            required={required}
            className="peer sr-only"
          />
          <label
            htmlFor={inputId}
            className={cn(
              'flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 transition-colors',
              error
                ? 'border-red-500 bg-red-50'
                : 'border-gray-300 bg-white',
              'peer-checked:border-cta peer-checked:bg-cta',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-cta peer-focus-visible:ring-offset-2'
            )}
          >
            <Check
              className={cn(
                'h-3.5 w-3.5 text-white',
                checked ? 'opacity-100' : 'opacity-0'
              )}
            />
          </label>
        </div>
        <label htmlFor={inputId} className="ml-3 cursor-pointer text-sm">
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cta underline hover:no-underline"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText}
          </a>
          <span className="text-navy-900">에 동의합니다.</span>
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export { Checkbox, CheckboxGroup, ConsentCheckbox };
