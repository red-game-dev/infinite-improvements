import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { ProfileData } from '@/components/pages/ProfilePage/types';
import { createProgressAnimation, delay } from '@/utils/progress';
import { fetchProfile } from '@/services/profile/GET/fetchProfile';

/**
 * React Query hook for fetching user profile
 * Includes loading progress animation
 */
export function useProfile() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  const query = useQuery<ProfileData, Error>({
    queryKey: ['profile'],
    queryFn: async () => {
      setLoadingProgress(0);

      await delay(50);

      const stopProgress = createProgressAnimation({
        duration: 2500,
        steps: 100,
        onProgress: setLoadingProgress
      });

      try {
        const data = await fetchProfile();
        stopProgress();
        setLoadingProgress(100);
        await delay(300);
        return data;
      } catch (error) {
        stopProgress();
        setLoadingProgress(0);
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (!query.isLoading && loadingProgress === 100) {
      const timer = setTimeout(() => setLoadingProgress(0), 300);
      return () => clearTimeout(timer);
    }
  }, [query.isLoading, loadingProgress]);

  return {
    ...query,
    loadingProgress
  };
}