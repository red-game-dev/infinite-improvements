import { copyToClipboard, isWebShareSupported } from './clipboard';
import { LinkItem } from '@/components/features/LinkItem/types';

export interface ShareResult {
  success: boolean;
  method: 'webshare' | 'clipboard';
  error?: string;
}

/**
 * Share a profile URL with title and description
 */
export async function shareProfile(options: {
  name: string;
  bio?: string;
  url?: string;
}): Promise<ShareResult> {
  const url = options.url || window.location.href;
  const title = `${options.name}'s Profile`;
  const text = options.bio || `Check out ${options.name}'s profile`;

  try {
    if (isWebShareSupported()) {
      await navigator.share({ title, text, url });
      return { success: true, method: 'webshare' };
    }

    await copyToClipboard(url);
    return { success: true, method: 'clipboard' };
  } catch (error) {
    return {
      success: false,
      method: 'clipboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Share a link with its metadata
 */
export async function shareLink(link: LinkItem): Promise<ShareResult> {
  const title = link.title;
  const text = link.metadata?.description || `Check out this link: ${link.title}`;
  const url = link.url;

  try {
    if (isWebShareSupported()) {
      await navigator.share({ title, text, url });
      return { success: true, method: 'webshare' };
    }

    await copyToClipboard(url);
    return { success: true, method: 'clipboard' };
  } catch (error) {
    return {
      success: false,
      method: 'clipboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Generic share function for any URL with optional metadata
 */
export async function shareUrl(options: {
  url: string;
  title?: string;
  text?: string;
}): Promise<ShareResult> {
  try {
    if (isWebShareSupported() && options.title && options.text) {
      await navigator.share({
        title: options.title,
        text: options.text,
        url: options.url
      });
      return { success: true, method: 'webshare' };
    }

    await copyToClipboard(options.url);
    return { success: true, method: 'clipboard' };
  } catch (error) {
    return {
      success: false,
      method: 'clipboard',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}