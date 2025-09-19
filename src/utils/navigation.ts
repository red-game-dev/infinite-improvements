/**
 * Check if a link is currently active based on the pathname
 * @param href - The link href to check
 * @param pathname - The current pathname
 * @returns Whether the link is active
 */
export function isActiveLink(href: string, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname.startsWith(href);
}