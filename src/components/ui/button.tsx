import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // Primary: CTA Blue
        primary:
          'bg-cta-blue text-white hover:bg-cta-blue-hover active:bg-cta-blue-active focus-visible:ring-cta-blue/35',
        // Secondary: Outline
        secondary:
          'border-2 border-cta-blue text-cta-blue bg-transparent hover:bg-cta-blue/8 active:bg-cta-blue/12 focus-visible:ring-cta-blue/35',
        // Ghost: Transparent (다크 배경용)
        ghost:
          'bg-transparent text-white hover:bg-white/10 active:bg-white/15 focus-visible:ring-white/35',
        // Ghost Light: 라이트 배경용
        'ghost-light':
          'bg-transparent text-navy-800 hover:bg-navy-800/8 active:bg-navy-800/12 focus-visible:ring-navy-800/35',
        // Link 스타일
        link: 'text-link-blue underline-offset-4 hover:underline focus-visible:ring-link-blue/35',
        // Destructive
        destructive:
          'bg-error text-white hover:bg-error/90 focus-visible:ring-error/35',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
