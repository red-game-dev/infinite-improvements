import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Infinite Improvements",
  description: "A Next.js demo showcasing component architecture and external image handling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
