'use client';

import React, { useEffect, useCallback, useRef, memo } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { cn } from '@/utils/cn';
import { createPortal } from 'react-dom';
import { usePortal } from '@/hooks/usePortal';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Position of the drawer */
  position?: 'left' | 'right' | 'top' | 'bottom';
  /** Size of the drawer */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show overlay */
  showOverlay?: boolean;
  /** Close on overlay click */
  closeOnOverlay?: boolean;
  /** Close on ESC key */
  closeOnEsc?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Title for the drawer header */
  title?: string;
  /** Custom header content */
  header?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Content padding */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Children content */
  children: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Element ID for accessibility */
  id?: string;
  /** Lock body scroll when open */
  lockScroll?: boolean;
}

const sizeClasses = {
  left: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full'
  },
  right: {
    sm: 'w-64',
    md: 'w-80',
    lg: 'w-96',
    xl: 'w-[32rem]',
    full: 'w-full'
  },
  top: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-96',
    full: 'h-full'
  },
  bottom: {
    sm: 'h-32',
    md: 'h-48',
    lg: 'h-64',
    xl: 'h-96',
    full: 'h-full'
  }
};

const positionClasses = {
  left: 'left-0 top-0 h-full',
  right: 'right-0 top-0 h-full',
  top: 'top-0 left-0 w-full',
  bottom: 'bottom-0 left-0 w-full'
};

const translateClasses = {
  left: {
    open: 'translate-x-0',
    closed: '-translate-x-full'
  },
  right: {
    open: 'translate-x-0',
    closed: 'translate-x-full'
  },
  top: {
    open: 'translate-y-0',
    closed: '-translate-y-full'
  },
  bottom: {
    open: 'translate-y-0',
    closed: 'translate-y-full'
  }
};

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8'
};

export const Drawer = memo(function Drawer({
  isOpen,
  onClose,
  position = 'right',
  size = 'md',
  showOverlay = true,
  closeOnOverlay = true,
  closeOnEsc = true,
  showCloseButton = true,
  title,
  header,
  footer,
  padding = 'md',
  children,
  className = '',
  id,
  lockScroll = true
}: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  const portalContainer = usePortal('drawer-portal');
  useBodyScrollLock(isOpen && lockScroll);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEscKey = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' && closeOnEsc && onClose) {
      onClose();
    }
  }, [closeOnEsc, onClose]);

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (closeOnOverlay && onClose) {
      onClose();
    }
  }, [closeOnOverlay, onClose]);


  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    if (closeOnEsc) {
      document.addEventListener('keydown', handleEscKey);
    }

    drawerRef.current?.focus();

    return () => {
      if (closeOnEsc) {
        document.removeEventListener('keydown', handleEscKey);
      }

      previousActiveElement.current?.focus();
    };
  }, [isOpen, closeOnEsc, handleEscKey]);

  if (!mounted || !portalContainer) return null;

  const drawerContent = (
    <>
      {/* Overlay */}
      {showOverlay && (
        <div
          className={cn(
            'fixed inset-0 z-overlay',
            'transition-all duration-300 ease-out will-change-[backdrop-filter,opacity]',
            isOpen
              ? 'bg-black/50 backdrop-blur-sm opacity-100'
              : 'bg-black/0 backdrop-blur-none opacity-0 pointer-events-none'
          )}
          onClick={handleOverlayClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={cn(
          'fixed z-drawer bg-white dark:bg-secondary-900',
          'shadow-2xl focus:outline-none',
          'transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          'will-change-transform',
          positionClasses[position],
          sizeClasses[position][size],
          translateClasses[position][isOpen ? 'open' : 'closed'],
          isOpen
            ? 'scale-100 opacity-100'
            : 'scale-95 opacity-0 pointer-events-none',
          className
        )}
        tabIndex={-1}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        data-position={position}
      >
        {/* Header */}
        {(showCloseButton || title || header) && (
          <div className={cn(
            'flex items-center justify-between p-4 border-b border-secondary-200 dark:border-secondary-700',
            'transition-all duration-300 ease-out will-change-transform',
            isOpen
              ? 'translate-y-0 opacity-100 delay-100'
              : 'translate-y-2 opacity-0 delay-0'
          )}>
            {header || (
              title && (
                <h2 id="drawer-title" className="text-lg font-semibold text-secondary-900 dark:text-white">
                  {title}
                </h2>
              )
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                iconOnly
                rounded="md"
                onClick={onClose}
                className="ml-auto"
                aria-label="Close drawer"
                tabIndex={isOpen ? 0 : -1}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
        )}

        {/* Body */}
        <div
          className={cn(
            'flex-1 overflow-y-auto transition-all duration-300 ease-out will-change-transform',
            paddingClasses[padding],
            isOpen
              ? 'translate-y-0 opacity-100 delay-200'
              : 'translate-y-4 opacity-0 delay-0'
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              'p-4 border-t border-secondary-200 dark:border-secondary-700',
              'transition-all duration-300 ease-out will-change-transform',
              isOpen
                ? 'translate-y-0 opacity-100 delay-300'
                : 'translate-y-6 opacity-0 delay-0'
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );

  return createPortal(drawerContent, portalContainer);
});

Drawer.displayName = 'Drawer';