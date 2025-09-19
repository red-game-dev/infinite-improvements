'use client';

import { useCallback, useEffect, useState } from 'react';
import { LinkStack } from '@/components/features/LinkStack';
import { ProfileHeader } from '@/components/features/ProfileHeader';
import { ProfileLoading } from '@/components/features/ProfileLoading';
import { ErrorState } from '@/components/features/ErrorState';
import { useProfile } from '@/services/profile';
import { ProfilePageProps } from './types';
import { useToastActions } from '@/stores/toast/useToastStore';
import { LinkItem } from '@/components/features/LinkItem/types';
import { shareLink } from '@/utils/share';
import { translations } from '@/i18n';

export function ProfilePage({
  onLinkClick,
  onLinkShare,
  onProfileShare
}: ProfilePageProps = {}) {
  const [mounted, setMounted] = useState(false);
  const { data: profileData, isLoading, error, refetch, loadingProgress } = useProfile();
  const toastActions = useToastActions();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkShare = useCallback(async (link: LinkItem) => {
    const result = await shareLink(link);

    if (mounted && toastActions) {
      if (result.success && result.method === 'clipboard') {
        toastActions.success(translations.links.shareLinkSuccess, {
          title: link.title,
          duration: 3000
        });
      } else if (!result.success) {
        toastActions.error(translations.links.shareLinkError, {
          title: translations.links.shareLinkErrorTitle,
          priority: 'high'
        });
      }
    }

    if (onLinkShare) {
      onLinkShare(link);
    }
  }, [mounted, toastActions, onLinkShare]);

  return (
    <div className="max-w-xl mx-auto px-6 py-12 md:py-16">
      {isLoading && <ProfileLoading progress={loadingProgress} />}

      {error && <ErrorState error={error} title={translations.profile.unableToLoadProfile} onRetry={refetch} />}

      {profileData && (
        <>
          <ProfileHeader
            name={profileData.name}
            bio={profileData.bio}
            avatar={profileData.avatar}
            socialLinks={profileData.socialLinks}
            onShare={onProfileShare}
            messages={{
              shareProfile: translations.profile.shareProfile,
              visitProfile: translations.profile.visitProfile
            }}
          />

          <LinkStack
            links={profileData.links}
            onLinkClick={onLinkClick}
            onLinkShare={handleLinkShare}
          />
        </>
      )}
    </div>
  );
}