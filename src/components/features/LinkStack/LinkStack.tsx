'use client';

import { useMemo, useRef, useEffect, useCallback } from 'react';
import { LinkItem } from '@/components/features/LinkItem/types';
import { LinkItem as LinkItemComponent } from '@/components/features/LinkItem';
import { EmptyState } from '@/components/features/EmptyState';
import { LinkIcon } from 'lucide-react';
import { translations } from '@/i18n';

interface LinkStackProps {
  links: LinkItem[];
  onLinkClick?: (link: LinkItem) => void;
  onLinkShare?: (link: LinkItem) => void;
}

export function LinkStack({ links, onLinkClick, onLinkShare }: LinkStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLDivElement | null)[]>([]);

  const sortedLinks = useMemo(
    () => [...links].sort((a, b) => {
      const priorityA = a.metadata?.priority ?? 999;
      const priorityB = b.metadata?.priority ?? 999;
      return priorityA - priorityB;
    }),
    [links]
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const activeElement = document.activeElement;
    const currentIndex = linkRefs.current.findIndex(ref => ref?.contains(activeElement as Node));

    switch (e.key) {
      case 'ArrowDown':
      case 'j':
        e.preventDefault();
        const nextIndex = currentIndex < sortedLinks.length - 1 ? currentIndex + 1 : 0;
        linkRefs.current[nextIndex]?.querySelector<HTMLAnchorElement>('a')?.focus();
        break;
      case 'ArrowUp':
      case 'k':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : sortedLinks.length - 1;
        linkRefs.current[prevIndex]?.querySelector<HTMLAnchorElement>('a')?.focus();
        break;
      case 'Home':
        e.preventDefault();
        linkRefs.current[0]?.querySelector<HTMLAnchorElement>('a')?.focus();
        break;
      case 'End':
        e.preventDefault();
        const lastIndex = sortedLinks.length - 1;
        linkRefs.current[lastIndex]?.querySelector<HTMLAnchorElement>('a')?.focus();
        break;
    }
  }, [sortedLinks.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (links.length === 0) {
    return (
      <EmptyState
        icon={<LinkIcon className="w-8 h-8 text-secondary-400 dark:text-secondary-600" />}
        title={translations.links.emptyTitle}
        description={translations.links.emptyDescription}
        variant="minimal"
        className="mt-8"
      />
    );
  }

  return (
    <nav
      ref={containerRef}
      className="flex flex-col gap-5 sm:gap-3"
      role="navigation"
      aria-label={translations.links.profileLinks}
    >
      {sortedLinks.map((link, index) => (
        <div key={link.id} ref={el => {
          if (el) linkRefs.current[index] = el;
        }}>
          <LinkItemComponent
            link={link}
            onClick={onLinkClick}
            onShare={onLinkShare}
            index={index}
          />
        </div>
      ))}
    </nav>
  );
}