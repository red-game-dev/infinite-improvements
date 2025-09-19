import { ImageData, LinkItem } from '@/components/features/LinkItem/types';
import { SocialLink } from '@/components/features/ProfileHeader/types';

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  accentColor?: string;
  backgroundImage?: ImageData;
  backgroundBlur?: number;
}

export interface ProfileData {
  name: string;
  bio?: string;
  avatar?: ImageData;
  backgroundImage?: ImageData;
  theme: ThemeConfig;
  links: LinkItem[];
  socialLinks: SocialLink[];
}

export interface ProfilePageProps {
  onLinkClick?: (link: LinkItem) => void;
  onLinkShare?: (link: LinkItem) => void;
  onProfileShare?: () => void;
}