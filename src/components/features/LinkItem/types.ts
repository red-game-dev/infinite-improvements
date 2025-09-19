export enum LinkType {
  STANDARD = 'standard',
  HEADER = 'header',
  IMAGE_TILE = 'image_tile',
  MUSIC = 'music',
}

export interface ImageData {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface LinkMetadata {
  description?: string;
  icon?: string;
  badge?: string;
  priority: number;
  createdAt: Date;
  viewCount: number;
  author?: string;
  duration?: string;
  readTime?: string;
}

export interface LinkItem {
  id: string;
  type: LinkType;
  title: string;
  url: string;
  thumbnail?: ImageData;
  metadata?: LinkMetadata;
  updatedAt?: Date;
}

export interface LinkItemProps {
  link: LinkItem;
  onClick?: (link: LinkItem) => void;
  onShare?: (link: LinkItem) => void;
  index: number;
}

export interface LinkItemSkeletonProps {
  variant?: 'standard' | 'image_tile';
  index?: number;
}