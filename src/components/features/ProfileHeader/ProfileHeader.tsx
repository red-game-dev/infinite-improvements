'use client';

import { SocialIconRow } from '@/components/features/ProfileHeader/SocialIconRow';
import { Avatar } from '@/components/primitives/Avatar';
import { ProfileHeaderProps } from './types';

export function ProfileHeader({ name, bio, avatar, socialLinks, messages = {} }: ProfileHeaderProps) {
  return (
    <header className="text-center mb-8">
      <Avatar data={avatar} />

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-2">
        {name}
      </h1>

      {bio && (
        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400 max-w-md mx-auto mb-4 px-4 sm:px-0">
          {bio}
        </p>
      )}

      <SocialIconRow
        links={socialLinks}
        name={name}
        bio={bio}
        messages={{
          shareProfile: messages.shareProfile,
          visitProfile: messages.visitProfile
        }}
      />
    </header>
  );
}