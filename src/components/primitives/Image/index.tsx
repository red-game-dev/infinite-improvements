'use client';

import React, { useState, useEffect, memo } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { ImageOff } from 'lucide-react';
import { cn } from '@/utils/cn';
import { getSolidPlaceholder, getImageSizes } from '@/utils/image';

export type ImageAspectRatio =
  | 'square'     // 1:1
  | 'video'      // 16:9
  | 'portrait'   // 9:16
  | 'landscape'  // 21:9
  | '4-3'        // 4:3
  | '3-2'        // 3:2
  | '16-9'       // 16:9
  | '1-1'        // 1:1
  | 'auto';      // No fixed aspect ratio

export type ImageObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

export interface ImageProps extends Omit<NextImageProps, 'onError' | 'onLoad'> {
  /** Aspect ratio of the image container */
  aspectRatio?: ImageAspectRatio;
  /** Object fit behavior */
  objectFit?: ImageObjectFit;
  /** Fallback content when image fails */
  fallback?: React.ReactNode;
  /** Fallback image URL to try when main fails */
  fallbackSrc?: string;
  /** Show default fallback */
  showDefaultFallback?: boolean;
  /** Container className */
  containerClassName?: string;
  /** Show loading shimmer */
  showShimmer?: boolean;
  /** Rounded corners */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Add overlay gradient - boolean or size */
  overlay?: boolean | 'sm' | 'md' | 'lg';
  /** Overlay position */
  overlayPosition?: 'top' | 'bottom' | 'full' | 'edges';
  /** Image load callback */
  onLoad?: () => void;
  /** Image error callback */
  onError?: () => void;
  /** Use Next.js Image optimization */
  useNextImage?: boolean;
  /** Image type for sizing */
  sizeType?: 'avatar' | 'card' | 'hero' | 'thumbnail';
}

const aspectRatioClasses: Record<ImageAspectRatio, string> = {
  'square': 'aspect-square',
  'video': 'aspect-video',
  'portrait': 'aspect-[9/16]',
  'landscape': 'aspect-[21/9]',
  '4-3': 'aspect-[4/3]',
  '3-2': 'aspect-[3/2]',
  '16-9': 'aspect-[16/9]',
  '1-1': 'aspect-square',
  'auto': ''
};

const roundedClasses: Record<NonNullable<ImageProps['rounded']>, string> = {
  'none': '',
  'sm': 'rounded-sm',
  'md': 'rounded-md',
  'lg': 'rounded-lg',
  'xl': 'rounded-xl',
  'full': 'rounded-full'
};

const objectFitClasses: Record<ImageObjectFit, string> = {
  'cover': 'object-cover',
  'contain': 'object-contain',
  'fill': 'object-fill',
  'none': 'object-none',
  'scale-down': 'object-scale-down'
};

export const ImageFallback = memo<{
  className?: string;
  message?: string;
}>(({
  className = '',
  message = 'Image not available'
}) => (
  <div className={cn(
    'flex flex-col items-center justify-center w-full h-full',
    'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600',
    className
  )}>
    <ImageOff className="w-12 h-12 mb-2" />
    <span className="text-sm">{message}</span>
  </div>
));

ImageFallback.displayName = 'ImageFallback';

export const Image = memo<ImageProps>(({
  src,
  alt,
  aspectRatio = 'auto',
  objectFit = 'cover',
  fallback,
  fallbackSrc,
  showDefaultFallback = true,
  containerClassName = '',
  showShimmer = true,
  rounded = 'none',
  overlay = false,
  overlayPosition = 'bottom',
  onLoad,
  onError,
  useNextImage = true,
  sizeType = 'card',
  className = '',
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    if (fallbackSrc && !triedFallback) {
      setCurrentSrc(fallbackSrc);
      setTriedFallback(true);
      return;
    }

    setError(true);
    setIsLoading(false);
    onError?.();
  };

  useEffect(() => {
    if (src !== currentSrc && !triedFallback) {
      setCurrentSrc(src);
      setError(false);
      setIsLoading(true);
      setTriedFallback(false);
    }
  }, [src, currentSrc, triedFallback]);

  const containerClasses = cn(
    'relative w-full h-full',
    aspectRatioClasses[aspectRatio],
    roundedClasses[rounded],
    containerClassName
  );

  const imageClasses = cn(
    objectFitClasses[objectFit],
    'transition-all duration-700 ease-out',
    isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0',
    className
  );

  const overlaySize = typeof overlay === 'string' ? overlay : (overlay ? 'md' : null);

  const getOverlayGradient = () => {
    if (!overlaySize) return '';

    const gradients = {
      sm: {
        top: 'bg-gradient-to-b from-black/30 via-transparent to-transparent',
        bottom: 'bg-gradient-to-t from-black/30 to-transparent',
        full: 'bg-black/20',
        edges: 'bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]'
      },
      md: {
        top: 'bg-gradient-to-b from-black/50 via-black/20 to-transparent',
        bottom: 'bg-gradient-to-t from-black/50 via-black/20 to-transparent',
        full: 'bg-black/40',
        edges: 'bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]'
      },
      lg: {
        top: 'bg-gradient-to-b from-black/70 via-black/30 to-transparent',
        bottom: 'bg-gradient-to-t from-black/70 via-black/30 to-transparent',
        full: 'bg-black/60',
        edges: 'bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]'
      }
    };

    return gradients[overlaySize][overlayPosition || 'bottom'];
  };

  const overlayClasses = cn(
    'absolute inset-0 pointer-events-none z-dropdown',
    getOverlayGradient()
  );

  if (error || !currentSrc) {
    if (fallback) {
      return <div className={containerClasses}>{fallback}</div>;
    }
    if (showDefaultFallback) {
      return (
        <div className={containerClasses}>
          <ImageFallback />
        </div>
      );
    }
    return null;
  }

  return (
    <div className={containerClasses}>
      {/* Loading shimmer */}
      {showShimmer && isLoading && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 animate-pulse">
          <div className="absolute inset-0 shimmer" />
        </div>
      )}

      {/* Image */}
      {useNextImage ? (
        <NextImage
          src={currentSrc}
          alt={alt}
          className={imageClasses}
          onLoad={handleLoad}
          onError={handleError}
          placeholder="blur"
          blurDataURL={getSolidPlaceholder()}
          quality={90}
          sizes={props.sizes || getImageSizes(sizeType)}
          {...props}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc as string}
          alt={alt}
          className={cn(
            props.fill && 'absolute inset-0 w-full h-full',
            imageClasses
          )}
          onLoad={handleLoad}
          onError={handleError}
          width={props.width as number}
          height={props.height as number}
        />
      )}

      {/* Overlay gradient */}
      {overlaySize && !isLoading && !error && (
        <div className={overlayClasses} />
      )}
    </div>
  );
});

Image.displayName = 'Image';

export default Image;