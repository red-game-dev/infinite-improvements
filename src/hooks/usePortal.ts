import { useEffect, useState } from 'react';

/**
 * Custom hook to create and manage portal containers
 * Avoids direct document.body manipulation in components
 */
export function usePortal(id: string = 'portal-root') {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let container = document.getElementById(id);

    if (!container) {
      container = document.createElement('div');
      container.id = id;
      container.setAttribute('data-portal', 'true');

      document.body.appendChild(container);
    }

    setPortalContainer(container);

    return () => {
      if (container && container.children.length === 0 && container.getAttribute('data-portal') === 'true') {
        document.body.removeChild(container);
      }
    };
  }, [id]);

  return portalContainer;
}