'use client';

import { memo } from 'react';
import { getTranslation } from '@/i18n';

interface FooterProps {
  copyright?: string;
  className?: string;
}

export const Footer = memo(function Footer({
  copyright = getTranslation('footer.copyright', { replacements: { year: new Date().getFullYear().toString(), name: 'Alex Roa' } }),
  className = ''
}: FooterProps) {
  return (
    <footer className={`text-center mt-16 pb-8 ${className}`}>
      <p className="text-xs text-secondary-600 dark:text-secondary-400 tracking-wider">
        {copyright}
      </p>
    </footer>
  );
});