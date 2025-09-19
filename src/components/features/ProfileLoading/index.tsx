'use client';

import { memo } from 'react';
import { ProfileHeaderSkeleton } from '@/components/features/ProfileHeader/ProfileHeaderSkeleton';
import { LinkStackSkeleton } from '@/components/features/LinkStack/LinkStackSkeleton';

interface ProfileLoadingProps {
  progress?: number;
}

export const ProfileLoading = memo(function ProfileLoading({ progress }: ProfileLoadingProps) {
  return (
    <>
      <ProfileHeaderSkeleton progress={progress} />
      <LinkStackSkeleton />
    </>
  );
});