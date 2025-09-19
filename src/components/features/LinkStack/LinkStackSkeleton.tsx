'use client';

import { memo } from 'react';
import { LinkItemSkeleton } from '@/components/features/LinkItem';

export const LinkStackSkeleton = memo(function LinkStackSkeleton() {
  return (
    <section className="space-y-4">
      {/* Show 8 skeleton items to match typical link count */}
      {Array.from({ length: 8 }).map((_, index) => (
        <LinkItemSkeleton
          key={index}
          variant={index === 1 ? 'image_tile' : 'standard'}
          index={index}
        />
      ))}
    </section>
  );
});