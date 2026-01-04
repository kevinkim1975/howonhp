'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ChipFilterProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ChipFilter({
  options,
  value,
  onChange,
  className,
}: ChipFilterProps) {
  return (
    <div
      className={cn('flex flex-wrap gap-2', className)}
      role="group"
      aria-label="필터"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'rounded-full px-4 py-2 text-sm font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-offset-2',
            value === option.value
              ? 'bg-cta text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
