'use client';

import { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { isActiveLink } from '@/utils/navigation';
import { getTranslation } from '@/i18n';
import { navigationItems } from '@/config/navigation';

interface NavigationProps {
  /** Display variant */
  variant?: 'desktop' | 'mobile';
  /** Callback when navigation item is clicked (mobile) */
  onNavigate?: () => void;
  /** Custom className */
  className?: string;
}

export const Navigation = memo(function Navigation({
  variant = 'desktop',
  onNavigate,
  className = ''
}: NavigationProps) {
  const pathname = usePathname();

  if (variant === 'desktop') {
    return (
      <nav className={cn('hidden md:flex items-center gap-6', className)}>
        {navigationItems.map(item => {
          const linkClasses = cn(
            'text-sm font-medium tracking-wide transition-colors uppercase',
            isActiveLink(item.href, pathname)
              ? 'text-primary-600 dark:text-primary-400'
              : 'text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400'
          );

          if (item.external) {
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.target || '_blank'}
                rel="noopener noreferrer"
                className={linkClasses}
              >
                {getTranslation(item.label)}
              </a>
            );
          }

          return (
            <Link
              key={item.id}
              href={item.href}
              className={linkClasses}
            >
              {getTranslation(item.label)}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className={cn('flex flex-col space-y-1', className)}>
      {navigationItems.map(item => {
        const linkClasses = cn(
          'px-4 py-3 text-base font-medium rounded-lg transition-colors uppercase',
          isActiveLink(item.href, pathname)
            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
            : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800'
        );

        if (item.external) {
          return (
            <a
              key={item.id}
              href={item.href}
              target={item.target || '_blank'}
              rel="noopener noreferrer"
              className={linkClasses}
              onClick={onNavigate}
            >
              {getTranslation(item.label)}
            </a>
          );
        }

        return (
          <Link
            key={item.id}
            href={item.href}
            className={linkClasses}
            onClick={onNavigate}
          >
            {getTranslation(item.label)}
          </Link>
        );
      })}
    </nav>
  );
});

Navigation.displayName = 'Navigation';