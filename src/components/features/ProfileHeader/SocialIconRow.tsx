'use client';

import { memo, useCallback, useMemo } from 'react';
import { Mail, Share2 } from 'lucide-react';
import {
  InstagramIcon,
  LinkedInIcon
} from '@/components/features/Icons';
import { Button } from '@/components/primitives/Button';
import { useToastActions } from '@/stores/toast/useToastStore';
import { shareProfile } from '@/utils/share';
import { SocialIconRowProps } from './types';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  twitter: Mail,
  facebook: Mail,
  github: Mail,
  youtube: Mail,
  tiktok: Mail,
};

export const SocialIconRow = memo(function SocialIconRow({ links, name, bio, messages = {} }: SocialIconRowProps) {
  const { success, error } = useToastActions();

  const msgs = useMemo(() => ({
    shareProfile: messages.shareProfile || 'Share Profile',
    shareSuccess: messages.shareSuccess || 'Profile link copied to clipboard!',
    shareSuccessTitle: messages.shareSuccessTitle || 'Ready to share',
    shareError: messages.shareError || 'Failed to share profile link',
    shareErrorTitle: messages.shareErrorTitle || 'Share failed',
    visitProfile: messages.visitProfile || 'Visit profile'
  }), [messages]);

  const handleShare = useCallback(async () => {
    const result = await shareProfile({ name: name || '', bio: bio || '' });

    if (result.success && result.method === 'clipboard') {
      success(msgs.shareSuccess, {
        title: msgs.shareSuccessTitle,
        duration: 3000
      });
    } else if (!result.success) {
      error(msgs.shareError, {
        title: msgs.shareErrorTitle,
        priority: 'high'
      });
    }
  }, [name, bio, success, error, msgs]);

  return (
    <nav className="flex justify-center items-center gap-2" aria-label="Social links and share">
      {links.length > 0 && (
        <ul className="flex items-center gap-2 list-none m-0 p-0">
          {links.map((link) => {
            const Icon = iconMap[link.platform];
            return (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <Button
                    variant="subtle"
                    size="sm"
                    iconOnly
                    rounded="full"
                    shadow="none"
                    aria-label={`${msgs.visitProfile} ${link.platform}`}
                    tabIndex={-1}
                  >
                    <Icon className="w-5 h-5" />
                  </Button>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      {links.length > 0 && (
        <div className="h-4 w-px bg-secondary-300 dark:bg-secondary-600" role="separator" aria-hidden="true" />
      )}

      <Button
        onClick={handleShare}
        variant="subtle"
        size="sm"
        iconOnly
        rounded="full"
        shadow="none"
        aria-label={msgs.shareProfile}
        title={msgs.shareProfile}
      >
        <Share2 className="w-5 h-5" />
      </Button>
    </nav>
  );
});