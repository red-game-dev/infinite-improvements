'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, memo } from 'react';
import { Button } from '@/components/primitives/Button';
import { getTranslation } from '@/i18n';

export const ThemeToggle = memo(function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [displayTheme, setDisplayTheme] = useState<string | undefined>();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setDisplayTheme(theme);
  }, [theme, mounted]);


  const cycleTheme = () => {
    const themes = ['light', 'dark'];
    const currentIndex = themes.indexOf(theme || 'dark');
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      cycleTheme();
    }
  };

  const getIcon = () => {
    if (!mounted || !displayTheme) return Monitor;
    if (displayTheme === 'light') return Sun;
    if (displayTheme === 'dark') return Moon;
    return Sun;
  };

  const Icon = getIcon();

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 border-secondary-100 dark:border-secondary-800"
        aria-label={getTranslation('theme.loadingTheme')}
        disabled
        tabIndex={-1}
      >
        <Monitor className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <Button
      onClick={cycleTheme}
      onKeyDown={handleKeyDown}
      variant="outline"
      size="icon"
      className="h-10 w-10 shadow-sm border-secondary-100 dark:border-secondary-800"
      aria-label={getTranslation('theme.currentTheme', { replacements: { theme: displayTheme || theme || 'dark' } })}
      title={getTranslation('theme.themeDescription', { replacements: { theme: displayTheme || theme || 'dark', resolved: resolvedTheme || 'loading' } })}
      role="switch"
      aria-checked={displayTheme === 'dark'}
    >
      <Icon className="w-5 h-5" />
    </Button>
  );
});