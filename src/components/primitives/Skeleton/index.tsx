'use client';

import { memo } from 'react';
import { cn } from '@/utils/cn';

type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | 'full';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: SkeletonSize;
  height?: SkeletonSize;
  animation?: 'pulse' | 'shimmer' | 'none';
}

export const Skeleton = memo(function Skeleton({
  className,
  variant = 'rectangular',
  width = 'full',
  height = 'md',
  animation = 'pulse'
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg'
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    shimmer: 'animate-shimmer',
    none: ''
  };


  const widthClasses = {
    xs: 'w-4',      // 1rem
    sm: 'w-6',      // 1.5rem
    md: 'w-8',      // 2rem
    lg: 'w-12',     // 3rem
    xl: 'w-16',     // 4rem
    '2xl': 'w-20',  // 5rem
    '3xl': 'w-24',  // 6rem
    '4xl': 'w-32',  // 8rem
    '5xl': 'w-40',  // 10rem
    '6xl': 'w-48',  // 12rem
    full: 'w-full'
  };

  const heightClasses = {
    xs: 'h-4',      // 1rem
    sm: 'h-6',      // 1.5rem
    md: 'h-8',      // 2rem
    lg: 'h-12',     // 3rem
    xl: 'h-16',     // 4rem
    '2xl': 'h-20',  // 5rem
    '3xl': 'h-24',  // 6rem
    '4xl': 'h-32',  // 8rem
    '5xl': 'h-40',  // 10rem
    '6xl': 'h-48',  // 12rem
    full: 'h-full'
  };

  return (
    <div
      className={cn(
        'bg-secondary-200 dark:bg-secondary-800',
        variantClasses[variant],
        animationClasses[animation],
        widthClasses[width],
        heightClasses[height],
        className
      )}
      aria-busy="true"
      aria-live="polite"
    />
  );
});

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lastLineWidth?: SkeletonSize;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const SkeletonText = memo(function SkeletonText({
  lines = 1,
  className,
  lastLineWidth = 'xl',
  align = 'left'
}: SkeletonTextProps) {
  const alignmentClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    justify: 'justify-between'
  };

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => {
        const isLastLine = index === lines - 1;
        const width = isLastLine ? lastLineWidth : 'full';

        return (
          <div
            key={index}
            className={cn(
              'flex',
              alignmentClasses[align]
            )}
          >
            <Skeleton
              variant="text"
              height="sm"
              width={width}
            />
          </div>
        );
      })}
    </div>
  );
});

interface SkeletonAvatarProps {
  size?: SkeletonSize;
  className?: string;
}

export const SkeletonAvatar = memo(function SkeletonAvatar({
  size = 'lg',
  className
}: SkeletonAvatarProps) {
  return (
    <Skeleton
      variant="circular"
      width={size}
      height={size}
      className={className}
    />
  );
});

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  imageHeight?: SkeletonSize;
}

export const SkeletonCard = memo(function SkeletonCard({
  className,
  showImage = false,
  imageHeight = '2xl'
}: SkeletonCardProps) {
  return (
    <div className={cn('bg-white dark:bg-secondary-800 rounded-xl shadow-sm', className)}>
      {showImage && (
        <Skeleton
          variant="rectangular"
          height={imageHeight}
          className="rounded-t-xl"
        />
      )}
      <div className="p-4 space-y-3">
        <SkeletonText lines={2} />
        <div className="flex items-center justify-between">
          <Skeleton variant="text" width="lg" height="xs" />
          <Skeleton variant="circular" width="sm" height="sm" />
        </div>
      </div>
    </div>
  );
});