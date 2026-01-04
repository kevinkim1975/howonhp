'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined
);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  collapsible?: boolean;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    { className, type = 'single', defaultValue, collapsible = true, children, ...props },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = React.useState<string[]>(() => {
      if (defaultValue) {
        return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
      return [];
    });

    const toggleItem = React.useCallback(
      (value: string) => {
        setExpandedItems((prev) => {
          if (type === 'single') {
            if (prev.includes(value)) {
              return collapsible ? [] : prev;
            }
            return [value];
          } else {
            if (prev.includes(value)) {
              return prev.filter((item) => item !== value);
            }
            return [...prev, value];
          }
        });
      },
      [type, collapsible]
    );

    return (
      <AccordionContext.Provider value={{ expandedItems, toggleItem, type }}>
        <div ref={ref} className={cn('space-y-2', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
}

const AccordionItemContext = React.createContext<
  AccordionItemContextValue | undefined
>(undefined);

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext);
  if (!context) {
    throw new Error(
      'AccordionItem components must be used within an AccordionItem'
    );
  }
  return context;
}

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { expandedItems } = useAccordionContext();
    const isExpanded = expandedItems.includes(value);

    return (
      <AccordionItemContext.Provider value={{ value, isExpanded }}>
        <div
          ref={ref}
          data-state={isExpanded ? 'open' : 'closed'}
          className={cn(
            'rounded-lg border border-gray-200 bg-white',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { toggleItem } = useAccordionContext();
  const { value, isExpanded } = useAccordionItemContext();

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={isExpanded}
      onClick={() => toggleItem(value)}
      className={cn(
        'flex w-full items-center justify-between px-4 py-4 text-left font-medium text-navy-900 transition-colors hover:bg-gray-50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta focus-visible:ring-inset',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200',
          isExpanded && 'rotate-180'
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { isExpanded } = useAccordionItemContext();

  return (
    <div
      ref={ref}
      data-state={isExpanded ? 'open' : 'closed'}
      className={cn(
        'overflow-hidden transition-all duration-200',
        isExpanded ? 'animate-accordion-down' : 'animate-accordion-up hidden'
      )}
      {...props}
    >
      <div className={cn('px-4 pb-4 text-gray-600', className)}>{children}</div>
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
