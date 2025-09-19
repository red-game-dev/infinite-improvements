'use client';

import { memo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Drawer } from '@/components/primitives/Drawer';
import { Navigation } from '@/components/layout/Navigation';
import { ThemeToggle } from '@/components/features/ThemeToggle';
import { translations } from '@/i18n';
import { externalLinks } from '@/config/navigation';

interface MobileMenuProps {
  /** Whether the menu is open */
  isOpen: boolean;
  /** Callback to close the menu */
  onClose: () => void;
  /** Show theme toggle */
  showThemeToggle?: boolean;
  /** Show back button */
  showBackButton?: boolean;
  /** Custom back button action */
  onBackClick?: () => void;
}

export const MobileMenu = memo(function MobileMenu({
  isOpen,
  onClose,
  showThemeToggle = false,
  showBackButton = false,
  onBackClick
}: MobileMenuProps) {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      window.open(externalLinks.blitz, '_blank');
    }
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      size="sm"
      title={translations.header.menu}
      showCloseButton
      closeOnOverlay
      closeOnEsc
      lockScroll
      id="mobile-navigation"
      footer={
        <div className="space-y-4">
          {/* Theme Toggle in Drawer */}
          {showThemeToggle && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary-600 dark:text-secondary-400">
                {translations.theme.toggle}
              </span>
              <ThemeToggle />
            </div>
          )}

          {/* Back Button in Drawer */}
          {showBackButton && (
            <Button
              variant="primary"
              size="sm"
              fullWidth
              rounded="md"
              className="flex items-center justify-center gap-2"
              onClick={handleBackClick}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wide">{translations.header.backToBlitz}</span>
            </Button>
          )}
        </div>
      }
    >
      {/* Mobile Navigation */}
      <Navigation variant="mobile" onNavigate={onClose} />
    </Drawer>
  );
});

MobileMenu.displayName = 'MobileMenu';