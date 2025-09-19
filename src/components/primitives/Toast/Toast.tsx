'use client';

import { memo, useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Toast as ToastType } from '@/stores/toast/useToastStore';
import { Button } from '@/components/primitives/Button';
import { translations } from '@/i18n';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800/50 text-success-800 dark:text-success-200',
    iconClassName: 'text-success-500 dark:text-success-400'
  },
  error: {
    icon: AlertCircle,
    className: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800/50 text-error-800 dark:text-error-200',
    iconClassName: 'text-error-500 dark:text-error-400'
  },
  warning: {
    icon: AlertTriangle,
    className: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800/50 text-warning-800 dark:text-warning-200',
    iconClassName: 'text-warning-500 dark:text-warning-400'
  },
  info: {
    icon: Info,
    className: 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800/50 text-primary-800 dark:text-primary-200',
    iconClassName: 'text-primary-500 dark:text-primary-400'
  }
};

export const Toast = memo(function Toast({ toast, onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  const config = variantConfig[toast.variant];
  const Icon = toast.icon || config.icon;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(toast.id), 200);
  };

  const handleActionClick = () => {
    if (toast.action) {
      toast.action.onClick();
      handleDismiss();
    }
  };

  return (
    <div
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-lg border shadow-lg backdrop-blur-sm transition-all duration-200 ease-out max-w-md will-change-[transform,opacity]',
        config.className,
        toast.className,
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
        toast.priority === 'urgent' && 'ring-2 ring-error-500 ring-opacity-50',
        toast.priority === 'high' && 'shadow-xl',
        toast.persistent && 'border-2'
      )}
      role="alert"
      aria-live={toast.priority === 'urgent' ? 'assertive' : 'polite'}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.iconClassName)} />

      <div className="flex-1 min-w-0">
        {toast.title && (
          <h4 className="font-medium text-sm mb-1">
            {toast.title}
          </h4>
        )}
        <p className="text-sm">
          {toast.message}
        </p>

        {/* Action button */}
        {toast.action && (
          <div className="mt-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleActionClick}
              className="h-8 px-3 text-xs"
            >
              {toast.action.label}
            </Button>
          </div>
        )}
      </div>

      {/* Only show dismiss button for non-persistent toasts or when there's an action */}
      {(!toast.persistent || toast.action) && (
        <Button
          onClick={handleDismiss}
          variant="ghost"
          size="icon"
          className="flex-shrink-0 h-auto w-auto p-1"
          aria-label={translations.toast.dismiss}
        >
          <X className="w-4 h-4 opacity-70" />
        </Button>
      )}
    </div>
  );
});