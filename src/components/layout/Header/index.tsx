'use client';

import { memo, useState, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/primitives/Button';
import { Navigation } from '@/components/layout/Navigation';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { cn } from '@/utils/cn';
import { ArrowLeft, Menu } from 'lucide-react';
import { translations } from '@/i18n';
import { externalLinks } from '@/config/navigation';

interface HeaderProps {
  /** Show back button */
  showBackButton?: boolean;
  /** Custom back button action */
  onBackClick?: () => void;
  /** Show theme toggle */
  showThemeToggle?: boolean;
  /** Custom className */
  className?: string;
  /** Fixed header */
  fixed?: boolean;
  /** Transparent background */
  transparent?: boolean;
}

export const Header = memo(function Header({
  showBackButton = false,
  onBackClick,
  showThemeToggle = false,
  className = '',
  fixed = true,
  transparent = false
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleBackClick = useCallback(() => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.open(externalLinks.blitz, '_blank');
    }
  }, [onBackClick]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <header
        className={cn(
          'w-full z-header',
          fixed && 'fixed top-0 left-0 right-0',
          transparent
            ? 'bg-transparent'
            : 'bg-secondary-50 dark:bg-secondary-900',
          'border-b border-secondary-200 dark:border-secondary-800',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="font-bold text-xl tracking-tight text-secondary-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {translations.header.logo}
              </Link>

              <Navigation variant="desktop" />
            </div>

            <div className="flex items-center gap-4">
              {showThemeToggle && (
                <div className="hidden md:block">
                  <ThemeToggle />
                </div>
              )}

              {showBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  rounded="md"
                  className="hidden md:flex items-center gap-2 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400"
                  onClick={handleBackClick}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm uppercase tracking-wide">{translations.header.backToBlitz}</span>
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                iconOnly
                rounded="md"
                className="md:hidden"
                onClick={toggleMobileMenu}
                aria-label={translations.header.menu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        showThemeToggle={showThemeToggle}
        showBackButton={showBackButton}
        onBackClick={onBackClick}
      />
    </>
  );
});

Header.displayName = 'Header';