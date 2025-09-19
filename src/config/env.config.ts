/**
 * Environment Configuration
 * Centralized environment variable management with type safety
 */

/**
 * Environment configuration object
 * Merges functionality from utils/env.ts
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isClient: typeof window !== 'undefined',
  isServer: typeof window === 'undefined',

  site: {
    get url() {
      if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL;
      }
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      return 'http://localhost:3000';
    },
    get canonicalUrl() {
      return this.url;
    },
  },

  deployment: {
    vercelUrl: process.env.VERCEL_URL,
    vercelEnv: process.env.VERCEL_ENV,
    isVercel: !!process.env.VERCEL,
    isPrimaryBranch: process.env.VERCEL_ENV === 'production',
    isPreview: process.env.VERCEL_ENV === 'preview',
  },
} as const;

export type Env = typeof env;

/**
 * Log only in development
 * Prevents console logs from appearing in production builds
 */
export const devLog = {
  log: (...args: unknown[]) => env.isDevelopment && console.log(...args),
  warn: (...args: unknown[]) => env.isDevelopment && console.warn(...args),
  error: (...args: unknown[]) => env.isDevelopment && console.error(...args),
  info: (...args: unknown[]) => env.isDevelopment && console.info(...args),
  debug: (...args: unknown[]) => env.isDevelopment && console.debug(...args),
};