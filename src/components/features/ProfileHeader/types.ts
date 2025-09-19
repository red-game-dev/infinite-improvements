import { ImageData } from '@/components/features/LinkItem/types';

export interface SocialLink {
  id: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'github' | 'youtube' | 'tiktok' | 'email';
  url: string;
  username?: string;
  icon?: string;
}

export interface SocialIconRowProps {
  links: SocialLink[];
  name?: string;
  bio?: string;
  messages?: {
    shareProfile?: string;
    shareSuccess?: string;
    shareSuccessTitle?: string;
    shareError?: string;
    shareErrorTitle?: string;
    visitProfile?: string;
  };
}

export interface ProfileHeaderProps {
  name: string;
  bio?: string;
  avatar?: ImageData;
  socialLinks: SocialLink[];
  onShare?: () => void;
  messages?: {
    shareProfile?: string;
    visitProfile?: string;
  };
}