'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// Base Card
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight text-navy-900', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-500', className)}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

// Service Card - 서비스 페이지용
interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, icon, title, description, href, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn(
        'group cursor-pointer p-6 hover:border-cta hover:shadow-lg',
        className
      )}
      {...props}
    >
      {icon && (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cta/10 text-cta transition-colors group-hover:bg-cta group-hover:text-white">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-lg font-semibold text-navy-900 group-hover:text-cta">
        {title}
      </h3>
      <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
    </Card>
  )
);
ServiceCard.displayName = 'ServiceCard';

// Portfolio Card - 포트폴리오용
interface PortfolioCardProps extends React.HTMLAttributes<HTMLDivElement> {
  image: string;
  title: string;
  category: string;
  description?: string;
}

const PortfolioCard = React.forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ className, image, title, category, description, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn('group overflow-hidden cursor-pointer', className)}
      {...props}
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="p-4">
        <span className="text-xs font-medium text-cta">{category}</span>
        <h3 className="mt-1 font-semibold text-navy-900 line-clamp-1">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Card>
  )
);
PortfolioCard.displayName = 'PortfolioCard';

// Post Card - 게시물용 (공지/칼럼)
interface PostCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  excerpt?: string;
  date: string;
  category?: string;
  image?: string;
}

const PostCard = React.forwardRef<HTMLDivElement, PostCardProps>(
  ({ className, title, excerpt, date, category, image, ...props }, ref) => (
    <Card
      ref={ref}
      className={cn('group cursor-pointer', className)}
      {...props}
    >
      {image && (
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          {category && (
            <span className="rounded bg-navy-100 px-2 py-0.5 text-xs font-medium text-navy-700">
              {category}
            </span>
          )}
          <span className="text-xs text-gray-400">{date}</span>
        </div>
        <h3 className="font-semibold text-navy-900 line-clamp-2 group-hover:text-cta">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{excerpt}</p>
        )}
      </div>
    </Card>
  )
);
PostCard.displayName = 'PostCard';

// Stat Card - 통계용
interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, value, label, icon, trend, ...props }, ref) => (
    <Card ref={ref} className={cn('p-6', className)} {...props}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-navy-900">{value}</p>
          {trend && (
            <p
              className={cn(
                'mt-1 text-sm font-medium',
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cta/10 text-cta">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
);
StatCard.displayName = 'StatCard';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  ServiceCard,
  PortfolioCard,
  PostCard,
  StatCard,
};
