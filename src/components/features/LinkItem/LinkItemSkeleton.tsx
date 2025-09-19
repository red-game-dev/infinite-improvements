'use client';

import { memo } from 'react';
import { Skeleton } from '@/components/primitives/Skeleton';
import { LinkItemSkeletonProps } from './types';

export const LinkItemSkeleton = memo(function LinkItemSkeleton({
  variant = 'standard',
  index = 0
}: LinkItemSkeletonProps) {
  if (variant === 'image_tile') {
    return (
      <article
        className="block overflow-hidden rounded-xl bg-white dark:bg-secondary-800 shadow-sm animate-fade-in-up"
        style={{ animationDelay: `${index * 50}ms` }}
        aria-busy="true"
        aria-label="Loading link"
      >
        <Skeleton variant="rectangular" height="full" />
        <div className="p-4 space-y-2">
          <Skeleton variant="text" height="lg" width="xl" />
          <Skeleton variant="text" height="sm" width="full" />
          <Skeleton variant="text" height="xs" width="md" />
        </div>
      </article>
    );
  }

  return (
    <article
      className="flex items-center justify-between px-6 py-4 bg-white dark:bg-secondary-800 rounded-xl shadow-sm animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
      aria-busy="true"
      aria-label="Loading link"
    >
      <div className="flex items-center gap-3 flex-1">
        <Skeleton variant="circular" width="xs" height="xs" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" height="md" width="lg" />
          <Skeleton variant="text" height="sm" width="xl" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton variant="text" width="lg" height="xs" />
        <Skeleton variant="circular" width="xs" height="xs" />
      </div>
    </article>
  );
});