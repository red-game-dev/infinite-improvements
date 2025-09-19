'use client';

import { memo, useCallback } from 'react';
import { ExternalLink, Share2 } from 'lucide-react';
import { Button } from '@/components/primitives/Button';
import { Card, CardImage } from '@/components/primitives/Card';
import { LinkType, LinkItemProps } from './types';
import { translations } from '@/i18n';


export const LinkItem = memo(
  ({ link, onClick, onShare, index }: LinkItemProps) => {

    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        if (onClick) {
          e.preventDefault();
          onClick(link);
        }
      },
      [link, onClick]
    );

    const handleShare = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        if (onShare) {
          onShare(link);
        }
      },
      [link, onShare]
    );

    if (link.type === LinkType.HEADER) {
      return (
        <h2 className="text-center py-2 text-sm font-semibold text-secondary-600 dark:text-secondary-400 uppercase tracking-wider">
          {link.title}
        </h2>
      );
    }

    if (link.type === LinkType.IMAGE_TILE) {
      return (
        <Card
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          interactive
          padding="none"
          className="animate-fade-in-up overflow-hidden"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {link.thumbnail && (
            <CardImage
              src={link.thumbnail.url}
              alt={link.title}
              height="h-48 sm:h-56 lg:h-64"
              overlay
              priority={index < 3}
              className="-mt-[1px] -mx-[1px]"
            />
          )}

          <div className="p-4 sm:p-5">
            <h2 className="font-bold text-lg sm:text-xl text-secondary-900 dark:text-white mb-2">
              {link.title}
            </h2>

            {link.metadata?.description && (
              <p className={`text-sm sm:text-base text-secondary-600 dark:text-secondary-400 line-clamp-2 ${link.thumbnail ? 'hidden sm:block' : ''}`}>
                {link.metadata.description}
              </p>
            )}

            {(link.metadata?.viewCount || link.metadata?.duration) && (
              <div className="flex items-center gap-3 mt-3">
                {link.metadata?.viewCount && link.metadata.viewCount > 0 && (
                  <span className="text-xs text-secondary-600 dark:text-secondary-400">
                    {link.metadata.viewCount.toLocaleString()} views
                  </span>
                )}
                {link.metadata?.duration && (
                  <span className="text-xs text-secondary-600 dark:text-secondary-400">
                    {link.metadata.duration}
                  </span>
                )}
              </div>
            )}
          </div>

          {onShare && (
            <div className="absolute top-3 right-3 z-dropdown hidden sm:block">
              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                iconOnly
                rounded="full"
                shadow="sm"
                aria-label={translations.links.shareLink}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          )}
        </Card>
      );
    }

    return (
      <article className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="group relative flex flex-col sm:flex-row sm:items-center sm:justify-between px-5 py-5 sm:px-6 sm:py-4 bg-white dark:bg-secondary-800 rounded-xl sm:rounded-lg transition-all duration-500 ease-out border border-secondary-200/50 dark:border-secondary-700/50 hover:border-secondary-300 dark:hover:border-secondary-600 hover:shadow-xl cursor-pointer will-change-[box-shadow,border-color] active:shadow-lg block"
        >
        <div className="flex-1 pr-8 sm:pr-4">
          <h2 className="font-semibold text-lg sm:text-base text-secondary-900 dark:text-white mb-2 sm:mb-0">
            {link.title}
          </h2>

          {link.metadata?.description && (
            <p className="text-base sm:text-sm text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-3 sm:mb-0 sm:mt-0.5">
              {link.metadata.description}
            </p>
          )}

          {link.metadata?.viewCount && link.metadata.viewCount > 0 && (
            <span className="text-sm text-secondary-600 dark:text-secondary-400 block sm:hidden mt-2">
              {link.metadata.viewCount.toLocaleString()} views
            </span>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {link.metadata?.viewCount && link.metadata.viewCount > 0 && (
            <span className="text-xs text-secondary-600 dark:text-secondary-400 mr-2">
              {link.metadata.viewCount.toLocaleString()} views
            </span>
          )}
          {onShare && (
            <Button
              onClick={handleShare}
              variant="subtle"
              size="sm"
              iconOnly
              rounded="md"
              shadow="none"
              aria-label={translations.links.shareLink}
            >
              <Share2 className="w-4 h-4" />
            </Button>
          )}
          <ExternalLink className="w-4 h-4 text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300 transition-colors" />
        </div>
        </a>
      </article>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.link.id === nextProps.link.id &&
      prevProps.link.updatedAt === nextProps.link.updatedAt &&
      prevProps.index === nextProps.index
    );
  }
);

LinkItem.displayName = 'LinkItem';