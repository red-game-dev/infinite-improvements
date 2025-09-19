/**
 * Navigation configuration
 */

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
  target?: '_blank' | '_self';
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'me',
    label: 'header.navigation.me',
    href: '/'
  },
  {
    id: 'create',
    label: 'header.navigation.create',
    href: 'https://www.useblitz.co/create#creatorSourcing',
    external: true,
    target: '_blank'
  },
  {
    id: 'collaborate',
    label: 'header.navigation.collaborate',
    href: 'https://www.useblitz.co/collaborate#acceleratedCollaborations',
    external: true,
    target: '_blank'
  },
  {
    id: 'solutions',
    label: 'header.navigation.solutions',
    href: 'https://www.useblitz.co/solutions#blitzPay',
    external: true,
    target: '_blank'
  }
];

export const externalLinks = {
  blitz: 'https://www.useblitz.co',
  create: 'https://www.useblitz.co/create#creatorSourcing',
  collaborate: 'https://www.useblitz.co/collaborate#acceleratedCollaborations',
  solutions: 'https://www.useblitz.co/solutions#blitzPay'
};