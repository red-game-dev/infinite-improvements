'use client';

import { memo } from 'react';
import { Skeleton, SkeletonText } from '@/components/primitives/Skeleton';
import { Avatar } from '@/components/primitives/Avatar';

interface ProfileHeaderSkeletonProps {
  progress?: number;
}

export const ProfileHeaderSkeleton = memo(function ProfileHeaderSkeleton({ progress = 0 }: ProfileHeaderSkeletonProps) {
  return (
    <header className="text-center mb-8 animate-fade-in-up">
      {/* Avatar with loading progress - handles its own skeleton */}
      <Avatar loading={true} showProgress={true} showOnlineIndicator={false} progress={progress} />

      {/* Name Skeleton */}
      <div className="flex justify-center mb-2">
        <Skeleton variant="text" height="xl" width="6xl" />
      </div>

      {/* Bio Skeleton */}
      <div className="max-w-md mx-auto mb-4 px-4 sm:px-0">
        <SkeletonText lines={2} lastLineWidth="6xl" align="center" />
      </div>

      {/* Social Icons Row Skeleton - matching the real SocialIconRow layout */}
      <div className="flex items-center justify-center gap-3">
        {/* Social icons (typically 3-4) */}
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} variant="circular" width="lg" height="lg" />
        ))}

        {/* Share button */}
        <Skeleton variant="rounded" width="xl" height="lg" />
      </div>
    </header>
  );
});