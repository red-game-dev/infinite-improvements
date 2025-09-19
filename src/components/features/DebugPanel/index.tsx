'use client';

import { useState, memo, useEffect } from 'react';
import { Bug, X, AlertTriangle, RefreshCw, Trash2, MessageSquare } from 'lucide-react';
import { env, devLog } from '@/config/env.config';
import { useToastActions } from '@/stores/toast/useToastStore';
import { Button } from '@/components/primitives/Button';
import { translations } from '@/i18n';

function ErrorThrower({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error(translations.debug.intentionalError);
  }
  return null;
}

export const DebugPanel = memo(function DebugPanel() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');

  const toastActions = useToastActions();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!env.isDevelopment || !mounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted]);

  useEffect(() => {
    if (!env.isDevelopment || !mounted) return;

    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, [mounted]);

  if (!env.isDevelopment) {
    return null;
  }

  const clearLocalStorage = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  const clearCache = () => {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }
    window.location.reload();
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-critical">
        <Button
          onClick={() => setIsOpen(true)}
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg group"
          aria-label={translations.debug.openPanel}
          title={`${translations.debug.panel} (${translations.debug.shortcut})`}
        >
          <Bug className="w-5 h-5" />
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs bg-secondary-900 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {translations.debug.shortcut}
          </span>
        </Button>
      </div>
    );
  }

  return (
    <>
      <ErrorThrower shouldThrow={shouldThrowError} />

      <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-secondary-900 rounded-lg shadow-xl border border-secondary-200 dark:border-secondary-700 z-critical">
        <div className="flex items-center justify-between p-3 border-b border-secondary-200 dark:border-secondary-700">
          <div className="flex items-center gap-2">
            <Bug className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
            <span className="text-sm font-medium text-secondary-900 dark:text-white">
              {translations.debug.panel}
            </span>
            <span className="text-xs text-secondary-600 dark:text-secondary-400">
              {translations.debug.devOnly}
            </span>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="h-auto w-auto p-1"
            aria-label={translations.debug.closePanel}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-3 space-y-2">
          <Button
            onClick={() => setShouldThrowError(true)}
            variant="destructive"
            size="sm"
            leftIcon={<AlertTriangle className="w-4 h-4" />}
            className="w-full justify-start bg-error-600 hover:bg-error-700 dark:bg-error-600 dark:hover:bg-error-700 text-white"
          >
            {translations.debug.triggerError}
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="primary"
            size="sm"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="w-full justify-start"
          >
            {translations.debug.reloadPage}
          </Button>

          <Button
            onClick={clearLocalStorage}
            variant="outline"
            size="sm"
            leftIcon={<Trash2 className="w-4 h-4" />}
            className="w-full justify-start border-warning-200 dark:border-warning-800 text-warning-600 dark:text-warning-400 hover:bg-warning-50 dark:hover:bg-warning-900/20"
          >
            {translations.debug.clearStorage}
          </Button>

          <Button
            onClick={clearCache}
            variant="outline"
            size="sm"
            leftIcon={<Trash2 className="w-4 h-4" />}
            className="w-full justify-start border-accent-200 dark:border-accent-800 text-accent-600 dark:text-accent-400 hover:bg-accent-50 dark:hover:bg-accent-900/20"
          >
            {translations.debug.clearCache}
          </Button>

          <Button
            onClick={() => {
              if (mounted && toastActions) {
                toastActions.success(translations.debug.toastTestSuccess, {
                  title: translations.debug.panel,
                  priority: 'normal',
                  action: {
                    label: 'View More',
                    onClick: () => devLog.log('Toast action clicked!')
                  }
                });
              }
            }}
            variant="outline"
            size="sm"
            leftIcon={<MessageSquare className="w-4 h-4" />}
            className="w-full justify-start border-success-200 dark:border-success-800 text-success-600 dark:text-success-400 hover:bg-success-50 dark:hover:bg-success-900/20"
          >
            {translations.debug.testToast}
          </Button>

          <div className="pt-2 border-t border-secondary-200 dark:border-secondary-700">
            <div className="text-xs text-secondary-600 dark:text-secondary-400 space-y-1">
              <p>{translations.debug.environment.nodeEnv}: {process.env.NODE_ENV}</p>
              <p>{translations.debug.environment.client}: {typeof window !== 'undefined' ? translations.debug.environment.yes : translations.debug.environment.no}</p>
              <p>{translations.debug.environment.theme}: {currentTheme === 'dark' ? translations.debug.environment.dark : translations.debug.environment.light}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});