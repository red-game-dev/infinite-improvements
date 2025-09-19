import commonEn from './locales/en/common.json';
import { devLog } from '@/config/env.config';

export const t = commonEn;

export function getTranslation(path: string, options?: { replacements?: Record<string, string>; fallback?: string }): string {
  const keys = path.split('.');
  let value: unknown = t;

  for (const key of keys) {
    if (typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      value = undefined;
      break;
    }
  }

  if (value === undefined) {
    if (options?.fallback) {
      return options.fallback;
    }
    devLog.warn(`Translation missing for key: ${path}`);
    return path;
  }

  if (typeof value !== 'string') {
    if (options?.fallback) {
      return options.fallback;
    }
    devLog.warn(`Translation value is not a string for key: ${path}`);
    return path;
  }

  if (options?.replacements) {
    let result = value;
    Object.entries(options.replacements).forEach(([key, val]) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), val);
    });
    return result;
  }

  return value;
}

export const translations = t;