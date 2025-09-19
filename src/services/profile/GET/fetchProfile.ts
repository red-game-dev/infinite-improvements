import { ProfileData } from '@/components/pages/ProfilePage/types';
import { createError, ErrorTypes } from '@/types/error';
import { env } from '@/config/env.config';
import mockProfileData from '@/data/mockProfile.json';

const SIMULATE_DELAY = env.isDevelopment ? 500 : 0;

/**
 * Fetches the user profile data
 * GET /api/profile
 */
export async function fetchProfile(): Promise<ProfileData> {
  try {
    if (SIMULATE_DELAY > 0) {
      await new Promise(resolve => setTimeout(resolve, SIMULATE_DELAY));
    }

    // const response = await fetch('/api/profile');
    // if (!response.ok) {
    //   throw createError(
    //     response.status >= 500 ? ErrorTypes.SERVER : ErrorTypes.CLIENT,
    //     `Failed to fetch profile: ${response.statusText}`,
    //     {
    //       statusCode: response.status,
    //       title: 'Unable to load profile',
    //       description: response.status === 404
    //         ? 'Profile not found'
    //         : 'We couldn\'t load your profile. Please try again later.'
    //     }
    //   );
    // }
    // const data = await response.json();

    const processedData: ProfileData = {
      ...mockProfileData,
      links: mockProfileData.links.map(link => ({
        ...link,
        metadata: link.metadata ? {
          ...link.metadata,
          createdAt: new Date(link.metadata.createdAt)
        } : undefined
      }))
    } as ProfileData;

    return processedData;
  } catch (error) {
    if (error instanceof Error && 'code' in error) {
      throw error;
    }

    throw createError(
      ErrorTypes.NETWORK,
      error instanceof Error ? error.message : 'Failed to fetch profile',
      {
        title: 'Connection Error',
        description: 'Unable to connect to our servers. Please check your internet connection and try again.'
      }
    );
  }
}