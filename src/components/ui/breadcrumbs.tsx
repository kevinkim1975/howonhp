'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
}

export function Breadcrumbs({
  items,
  className,
  showHome = true,
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('', className)}>
      <ol className="flex items-center space-x-2 text-sm">
        {showHome && (
          <li>
            <Link
              href="/"
              className="flex items-center text-gray-500 hover:text-cta"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">홈</span>
            </Link>
          </li>
        )}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </li>
            <li>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-cta"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-navy-900">{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
