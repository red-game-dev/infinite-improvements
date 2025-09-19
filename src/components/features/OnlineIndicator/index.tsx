'use client';

import { memo } from 'react';
import { cn } from '@/utils/cn';

interface OnlineIndicatorProps {
  /** Position of the indicator */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Size of the indicator */
  size?: 'sm' | 'md' | 'lg';
  /** Show pulsing animation */
  animate?: boolean;
  /** Custom className */
  className?: string;
  /** Color variant */
  variant?: 'success' | 'warning' | 'danger';
}

export const OnlineIndicator = memo(function OnlineIndicator({
  position = 'bottom-right',
  size = 'md',
  animate = true,
  className = '',
  variant = 'success'
}: OnlineIndicatorProps) {
  const positionClasses = {
    'top-left': 'top-1 left-1',
    'top-right': 'top-1 right-1',
    'bottom-left': 'bottom-1 left-1',
    'bottom-right': 'bottom-1 right-1'
  };

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const variantClasses = {
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500'
  };

  const borderSizeClasses = {
    sm: 'border',
    md: 'border-2',
    lg: 'border-2'
  };

  return (
    <div
      className={cn(
        'absolute z-dropdown',
        positionClasses[position],
        sizeClasses[size],
        variantClasses[variant],
        borderSizeClasses[size],
        'rounded-full border-white dark:border-secondary-900 shadow-md',
        className
      )}
    >
      {/* Pulsing effect */}
      {animate && (
        <div
          className={cn(
            'absolute inset-0 rounded-full animate-ping opacity-75',
            variantClasses[variant]
          )}
        />
      )}
    </div>
  );
});

OnlineIndicator.displayName = 'OnlineIndicator';