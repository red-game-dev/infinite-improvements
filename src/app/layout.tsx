import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { BaseLayout } from '@/components/layout/BaseLayout';
import { getTranslation } from "@/i18n";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

const siteName = getTranslation('seo.siteName');
const defaultTitle = getTranslation('seo.defaultTitle');
const defaultDescription = getTranslation('seo.defaultDescription');

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <BaseLayout>
          {children}
        </BaseLayout>
      </body>
    </html>
  );
}