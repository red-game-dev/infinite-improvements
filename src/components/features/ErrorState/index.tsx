'use client';

import { memo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { AppError, isAppError } from '@/types/error';
import { translations } from '@/i18n';

interface ErrorStateProps {
  error: Error | AppError | null;
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
  icon?: ReactNode;
  className?: string;
}

export const ErrorState = memo(function ErrorState({
  error,
  title,
  description,
  onRetry,
  retryLabel = translations.error.state.retry,
  icon,
  className = ''
}: ErrorStateProps) {
  const displayTitle = title || (isAppError(error) && error.title) || translations.loading.loadingContent;
  const errorMessage = description ||
    (isAppError(error) && error.description) ||
    error?.message ||
    translations.error.boundary.defaultMessage;

  const showRetry = onRetry && (!isAppError(error) || error.retry !== false);

  return (
    <div
      className={`flex items-center justify-center min-h-[50vh] ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="text-center max-w-md px-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-error-100 dark:bg-error-900/20 mb-4">
          {icon || <AlertCircle className="w-6 h-6 text-error-600 dark:text-error-400" />}
        </div>

        <h2 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
          {displayTitle}
        </h2>

        <p className="text-secondary-600 dark:text-secondary-400 mb-6">
          {errorMessage}
        </p>

        {showRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            size="md"
            leftIcon={<RefreshCw className="w-4 h-4" />}
            aria-label={`Retry: ${retryLabel}`}
          >
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
});