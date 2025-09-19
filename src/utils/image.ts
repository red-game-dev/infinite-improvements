/**
 * Image utility functions for placeholder generation and optimization
 */

/**
 * Convert string to base64
 */
export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

/**
 * Simple solid color placeholder - neutral gray that works in both themes
 */
export const getSolidPlaceholder = (color = '#9ca3af'): string => {
  const svg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="${color}"/></svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
};

/**
 * Get optimized image sizes for responsive loading
 * Provides responsive sizing hints for Next.js Image srcset generation
 */
export const getImageSizes = (type: 'avatar' | 'card' | 'hero' | 'thumbnail' = 'card'): string => {
  const sizes = {
    avatar: '112px',
    card: '(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw',
    hero: '100vw',
    thumbnail: '(max-width: 640px) 128px, (max-width: 768px) 192px, 256px'
  };
  return sizes[type];
};