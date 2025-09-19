import { Providers } from '@/providers';
import { ErrorBoundary } from '@/components/features/ErrorBoundary';
import { DebugPanel } from '@/components/features/DebugPanel';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ToastProvider } from '@/components/primitives/Toast';
import { translations } from '@/i18n';

interface BaseLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

/**
 * BaseLayout component for body content structure
 * Used for consistent layout across pages
 */
export function BaseLayout({ children, showHeader = true }: BaseLayoutProps) {
  return (
    <Providers>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-max"
      >
        {translations.navigation.skipToMain}
      </a>
      <ErrorBoundary>
        {showHeader && (
          <Header
            showBackButton
            showThemeToggle
          />
        )}
        <main
          id="main-content"
          className={`min-h-screen bg-white dark:bg-secondary-950 ${showHeader ? 'pt-16' : ''}`}
        >
          {children}
          <Footer />
        </main>
        <DebugPanel />
      </ErrorBoundary>
      <ToastProvider />
    </Providers>
  );
}