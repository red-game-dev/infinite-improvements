'use client';

import { NextThemeProvider } from '@/providers/NextThemeProvider';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ReactQueryProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
      >
        {children}
      </NextThemeProvider>
    </ReactQueryProvider>
  );
}