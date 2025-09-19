'use client';

import { memo } from 'react';
import { LinearGradient, gradientPresets } from '@/components/primitives/LinearGradient';
import { cn } from '@/utils/cn';

interface ProgressProps {
  /** Progress percentage (0-100) */
  progress: number;
  /** Progress variant */
  variant?: 'bar' | 'ring';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
  /** Show background */
  showBackground?: boolean;
  /** Gradient preset to use */
  gradientPreset?: keyof typeof gradientPresets;
  /** Show percentage text (bar only) */
  showPercentage?: boolean;
  /** Bar specific: animated stripes */
  animated?: boolean;
  /** Ring specific: radius */
  radius?: number;
  /** Ring specific: stroke width */
  strokeWidth?: number;
  /** Ring specific: custom size class */
  sizeClass?: string;
}

const ProgressBar = memo(function ProgressBar({
  progress,
  size = 'md',
  showBackground = true,
  gradientPreset = 'blueGreen',
  animated = false,
  showPercentage = false,
  className
}: Omit<ProgressProps, 'variant' | 'radius' | 'strokeWidth' | 'sizeClass'>) {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={cn('relative w-full', className)}>
      {showBackground && (
        <div className={cn(
          'w-full rounded-full bg-gray-200 dark:bg-gray-700',
          sizeClasses[size]
        )} />
      )}

      <div
        className={cn(
          'absolute top-0 left-0 rounded-full transition-all duration-500 ease-out',
          sizeClasses[size],
          animated && 'animate-pulse'
        )}
        style={{
          width: `${Math.min(100, Math.max(0, progress))}%`,
          background: `linear-gradient(90deg, ${gradientPresets[gradientPreset].map(s => s.color).join(', ')})`
        }}
      />

      {showPercentage && (
        <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
});

const ProgressRing = memo(function ProgressRing({
  progress,
  radius = 54,
  strokeWidth = 3,
  size = 'md',
  sizeClass,
  className = '',
  showBackground = true,
  gradientPreset = 'blueGreen'
}: Omit<ProgressProps, 'variant' | 'animated' | 'showPercentage'>) {
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const defaultSizeClasses = {
    sm: 'w-20 h-20',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const finalSizeClass = sizeClass || defaultSizeClasses[size || 'md'];

  return (
    <svg
      className={cn('absolute -inset-2 transition-all duration-300 -rotate-90', finalSizeClass, className)}
      viewBox="0 0 120 120"
    >
      {showBackground && (
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-secondary-300 dark:text-secondary-700 opacity-50"
        />
      )}

      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="url(#progressGradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        className="drop-shadow-lg will-change-[stroke-dashoffset]"
        strokeDasharray={`${circumference} ${circumference}`}
        style={{
          strokeDashoffset: strokeDashoffset,
          transition: 'stroke-dashoffset 0.5s ease-out'
        }}
      />

      <defs>
        <LinearGradient
          id="progressGradient"
          stops={[...gradientPresets[gradientPreset]]}
        />
      </defs>
    </svg>
  );
});

export const Progress = memo(function Progress(props: ProgressProps) {
  const { variant = 'bar', ...rest } = props;

  if (variant === 'ring') {
    return <ProgressRing {...rest} />;
  }

  return <ProgressBar {...rest} />;
});

Progress.displayName = 'Progress';