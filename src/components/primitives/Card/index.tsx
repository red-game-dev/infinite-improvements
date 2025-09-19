'use client';

import React, { forwardRef, memo } from 'react';
import { cn } from '@/utils/cn';
import { Image } from '@/components/primitives/Image';

export type CardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variant of the card */
  size?: CardSize;
  /** Whether the card is interactive (hoverable/clickable) */
  interactive?: boolean;
  /** Whether to show a border */
  bordered?: boolean;
  /** Whether to add shadow */
  shadow?: boolean | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Whether to use glass morphism effect */
  glass?: boolean;
  /** Padding variant */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Whether the card should behave as a link */
  href?: string;
  /** Link target */
  target?: string;
  /** Link rel attribute */
  rel?: string;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Custom className */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
}

const getSizeClasses = (size: CardSize): string => {
  const sizeMap = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    xxl: 'max-w-2xl'
  };
  return sizeMap[size] || '';
};

const getPaddingClasses = (padding: CardProps['padding']): string => {
  const paddingMap = {
    none: '',
    sm: 'p-2 sm:p-3 lg:p-4',
    md: 'p-3 sm:p-4 lg:p-5',
    lg: 'p-4 sm:p-5 lg:p-6'
  };
  return paddingMap[padding || 'md'] || 'p-3 sm:p-4 lg:p-5';
};

const getShadowClass = (shadow: CardProps['shadow']): string => {
  if (typeof shadow === 'string') {
    return `shadow-${shadow}`;
  }
  return shadow ? 'shadow-lg' : '';
};

export const Card = memo(forwardRef<HTMLDivElement | HTMLAnchorElement, CardProps>(({
  size,
  interactive = false,
  bordered = true,
  shadow = false,
  glass = false,
  padding = 'md',
  href,
  target,
  rel,
  onClick,
  className = '',
  children,
  ...props
}, ref) => {
  const baseClasses = cn(
    'relative block rounded-xl',
    'transition-all duration-500 ease-out',
    glass
      ? 'bg-white/5 dark:bg-white/5 backdrop-blur-md'
      : 'bg-white dark:bg-secondary-800',
    bordered && (glass
      ? 'border border-white/10 dark:border-white/10'
      : 'border border-secondary-200/50 dark:border-secondary-700/50'),
    getShadowClass(shadow),
    size && getSizeClasses(size),
    padding !== 'none' && getPaddingClasses(padding),
    interactive && [
      'cursor-pointer group',
      'will-change-[box-shadow,border-color]',
      'hover:border-secondary-300 dark:hover:border-secondary-600',
      'hover:shadow-xl',
      'active:shadow-lg',
      'focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-purple-500 dark:focus-visible:ring-purple-400'
    ],
    className
  );

  const { id, title, style, 'aria-label': ariaLabel, ...restProps } = props;
  const commonProps = {
    id,
    title,
    style,
    'aria-label': ariaLabel,
    ...Object.fromEntries(
      Object.entries(restProps).filter(([key]) => key.startsWith('data-'))
    ),
  };

  if (href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target || (href.startsWith('http') ? '_blank' : undefined)}
        rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={baseClasses}
        onClick={onClick}
        {...commonProps}
      >
        {children}
      </a>
    );
  }

  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={baseClasses}
      onClick={onClick}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      {...commonProps}
    >
      {children}
    </div>
  );
}));

Card.displayName = 'Card';

export interface CardHeaderProps {
  /** Main title */
  title?: React.ReactNode;
  /** Subtitle */
  subtitle?: React.ReactNode;
  /** Actions (buttons, icons) */
  actions?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Children for custom content */
  children?: React.ReactNode;
}

export const CardHeader = memo<CardHeaderProps>(({
  title,
  subtitle,
  actions,
  className = '',
  children
}) => {
  if (children) {
    return (
      <div className={cn('flex items-start justify-between gap-3 min-h-14', className)}>
        {children}
      </div>
    );
  }

  return (
    <div className={cn('flex items-start justify-between gap-3 min-h-14', className)}>
      <div className="flex-1">
        {title && (
          <h3 className="text-lg font-semibold text-secondary-900 dark:text-white line-clamp-1">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm text-secondary-600 dark:text-secondary-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

export interface CardBodyProps {
  /** Custom className */
  className?: string;
  /** Children for content */
  children?: React.ReactNode;
}

export const CardBody = memo<CardBodyProps>(({
  className = '',
  children
}) => {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';

export interface CardFooterProps {
  /** Custom className */
  className?: string;
  /** Children for content */
  children?: React.ReactNode;
}

export const CardFooter = memo<CardFooterProps>(({
  className = '',
  children
}) => {
  return (
    <div className={cn('flex items-center justify-between gap-3 mt-3', className)}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

export interface CardImageProps {
  /** Image source */
  src?: string;
  /** Alt text for accessibility */
  alt: string;
  /** Height of the image container */
  height?: string;
  /** Whether to show overlay gradient for better text readability */
  overlay?: boolean;
  /** Whether this image should be prioritized for loading (for LCP optimization) */
  priority?: boolean;
  /** Custom className */
  className?: string;
  /** Style prop for background image */
  style?: React.CSSProperties;
}

export const CardImage = memo<CardImageProps>(({
  src,
  alt,
  height = 'h-48 sm:h-56 lg:h-64',
  overlay = false,
  priority = false,
  className = ''
}) => {
  if (!src) return null;

  return (
    <div className={cn('relative w-full overflow-hidden rounded-t-xl', height, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        objectFit="cover"
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 384px"
        showShimmer
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        rounded="none"
        containerClassName="!w-full !h-full"
        overlay={overlay ? "sm" : false}
        overlayPosition="bottom"
      />
    </div>
  );
});

CardImage.displayName = 'CardImage';