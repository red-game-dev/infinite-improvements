'use client';

import { memo, ReactNode } from 'react';
import { Inbox, FileX, LinkIcon } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { translations } from '@/i18n';

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: 'default' | 'minimal' | 'card';
  className?: string;
  messages?: {
    title?: string;
    description?: string;
    actionLabel?: string;
  };
}

const defaultIcons = {
  default: <Inbox className="w-12 h-12 text-secondary-400 dark:text-secondary-600" />,
  links: <LinkIcon className="w-12 h-12 text-secondary-400 dark:text-secondary-600" />,
  files: <FileX className="w-12 h-12 text-secondary-400 dark:text-secondary-600" />
};

export const EmptyState = memo(function EmptyState({
  icon,
  title,
  description,
  action,
  variant = 'default',
  className = '',
  messages = {}
}: EmptyStateProps) {
  const displayIcon = icon || defaultIcons.default;
  const displayTitle = messages.title || title || translations.empty.defaultTitle;
  const displayDescription = messages.description || description || translations.empty.defaultDescription;
  const actionLabel = messages.actionLabel || action?.label;

  if (variant === 'minimal') {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-secondary-500 dark:text-secondary-400 text-sm">
          {displayTitle}
        </p>
        {displayDescription && (
          <p className="text-secondary-600 dark:text-secondary-400 text-xs mt-1">
            {displayDescription}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`bg-white dark:bg-secondary-800 rounded-lg border border-secondary-200 dark:border-secondary-700 p-8 ${className}`}>
        <div className="text-center max-w-sm mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/50 mb-4">
            {displayIcon}
          </div>
          <h2 className="text-lg font-medium text-secondary-900 dark:text-white mb-2">
            {displayTitle}
          </h2>
          {displayDescription && (
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              {displayDescription}
            </p>
          )}
          {action && actionLabel && (
            <Button
              onClick={action.onClick}
              variant="primary"
              size="sm"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center min-h-[200px] ${className}`}>
      <div className="text-center max-w-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary-100 dark:bg-secondary-900/50 mb-4">
          {displayIcon}
        </div>
        <h2 className="text-base font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          {displayTitle}
        </h2>
        {displayDescription && (
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
            {displayDescription}
          </p>
        )}
        {action && actionLabel && (
          <Button
            onClick={action.onClick}
            variant="outline"
            size="sm"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
});