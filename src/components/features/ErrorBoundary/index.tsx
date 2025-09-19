'use client';

import { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { AppError, isAppError } from '@/types/error';
import { env, devLog } from '@/config/env.config';
import { translations } from '@/i18n';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | AppError | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    devLog.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full">
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error-100 dark:bg-error-900/20 mb-4">
                <AlertCircle className="w-8 h-8 text-error-600 dark:text-error-400" />
              </div>

              <h2 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
                {isAppError(this.state.error) && this.state.error.title
                  ? this.state.error.title
                  : translations.error.boundary.title}
              </h2>

              <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                {isAppError(this.state.error) && this.state.error.description
                  ? this.state.error.description
                  : this.state.error?.message || translations.error.boundary.defaultMessage}
              </p>

              <Button
                onClick={this.handleReset}
                variant="primary"
                leftIcon={<RefreshCw className="w-4 h-4" />}
                aria-label={translations.error.boundary.tryAgain}
              >
                {translations.error.boundary.tryAgain}
              </Button>

              {env.isDevelopment && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="text-sm text-secondary-500 cursor-pointer hover:text-secondary-700 dark:hover:text-secondary-300">
                    {translations.error.boundary.errorDetails}
                  </summary>
                  <pre className="mt-2 text-xs bg-secondary-100 dark:bg-secondary-900 p-3 rounded overflow-x-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}