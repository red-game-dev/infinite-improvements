'use client';

import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { translations } from '@/i18n';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'subtle'
  | 'destructive'
  | 'outline'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';

export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'full';
export type ButtonShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  iconOnly?: boolean;
  rounded?: ButtonRounded;
  shadow?: ButtonShadow;
  children?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
  secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
  ghost: 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300',
  subtle: 'bg-transparent hover:bg-secondary-100 dark:hover:bg-secondary-800 text-secondary-600 dark:text-secondary-400 hover:text-secondary-900 dark:hover:text-white',
  destructive: 'bg-error-600 text-white hover:bg-error-700 focus:ring-error-500',
  outline: 'border border-secondary-300 dark:border-secondary-600 bg-transparent hover:bg-secondary-50 dark:hover:bg-secondary-800 text-secondary-700 dark:text-secondary-300',
  link: 'bg-transparent underline-offset-4 hover:underline text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300'
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-base gap-2',
  lg: 'px-5 py-2.5 text-lg gap-2.5',
  xl: 'px-6 py-3 text-xl gap-3',
  icon: 'p-2'
};

const iconOnlySizes: Record<ButtonSize, string> = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-14 h-14',
  icon: 'w-8 h-8'
};

const roundedStyles: Record<ButtonRounded, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
};

const shadowStyles: Record<ButtonShadow, string> = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  iconOnly = false,
  rounded = 'lg',
  shadow,
  className = '',
  children,
  disabled,
  ...props
}, ref) => {
  const isDisabled = disabled || loading;
  const effectiveRounded = iconOnly && rounded === 'lg' ? 'full' : rounded;
  const effectiveShadow = shadow ?? (
    variant === 'ghost' ? 'sm' :
    variant === 'subtle' ? 'none' :
    variant === 'link' ? 'none' :
    variant === 'outline' ? 'none' :
    'sm'
  );

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-500 cursor-pointer',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-secondary-900',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        shadowStyles[effectiveShadow],
        iconOnly ? iconOnlySizes[size] : sizeStyles[size],
        roundedStyles[effectiveRounded],
        fullWidth && 'w-full',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className={cn('animate-spin', iconOnly ? 'w-4 h-4' : 'w-4 h-4 mr-2')} />
          {!iconOnly && <span>{translations.common?.loading || 'Loading...'}</span>}
        </>
      ) : (
        <>
          {leftIcon && !iconOnly && <span className="inline-flex">{leftIcon}</span>}
          {children}
          {rightIcon && !iconOnly && <span className="inline-flex">{rightIcon}</span>}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';