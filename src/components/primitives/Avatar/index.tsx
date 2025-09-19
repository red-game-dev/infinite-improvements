'use client';

import { memo } from 'react';
import { ImageData } from '@/components/features/LinkItem/types';
import { Image } from '@/components/primitives/Image';
import { Skeleton } from '@/components/primitives/Skeleton';
import { Progress } from '@/components/primitives/Progress';
import { OnlineIndicator } from '@/components/features/OnlineIndicator';

interface AvatarProps {
  data?: ImageData;
  loading?: boolean;
  progress?: number; // 0-100
  size?: 'sm' | 'md' | 'lg';
  showOnlineIndicator?: boolean;
  showProgress?: boolean;
}

export const Avatar = memo(function Avatar({
  data,
  loading = false,
  progress = 0,
  size = 'lg',
  showOnlineIndicator = true,
  showProgress = false
}: AvatarProps) {
  const displayProgress = loading && showProgress ? progress : 0;

  const sizeConfig = {
    sm: { width: 'w-16 h-16', svg: 'w-20 h-20', image: 64, radius: 30 },
    md: { width: 'w-20 h-20', svg: 'w-24 h-24', image: 80, radius: 42 },
    lg: { width: 'w-28 h-28', svg: 'w-32 h-32', image: 112, radius: 54 }
  };

  const config = sizeConfig[size];

  return (
    <div className="relative inline-block mb-6">
      {/* Progress Ring Border - Only shown when showProgress is true and loading */}
      {showProgress && loading && (
        <Progress
          variant="ring"
          progress={displayProgress}
          radius={config.radius}
          sizeClass={config.svg}
        />
      )}

      {/* Avatar or Skeleton */}
      <div className={`relative ${config.width} overflow-hidden rounded-full shadow-xl`}>
        {loading ? (
          <Skeleton
            variant="circular"
            width="full"
            height="full"
            className="w-full h-full"
          />
        ) : data ? (
          <Image
            src={data.url}
            alt={data.alt}
            width={config.image}
            height={config.image}
            className="w-full h-full"
            objectFit="cover"
            sizes={`${config.image}px`}
            quality={95}
            priority
            fetchPriority="high"
            showShimmer={false}
            overlay="lg"
            overlayPosition="edges"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600" />
        )}
      </div>

      {/* Online indicator - only show when not loading and showOnlineIndicator is true */}
      {!loading && showOnlineIndicator && data && (
        <OnlineIndicator
          position="bottom-right"
          size="md"
          animate
        />
      )}
    </div>
  );
});