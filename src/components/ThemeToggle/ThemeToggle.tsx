'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from '../../hooks';

export const ThemeToggle = () => {
  const t = useTranslations('Common');
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      suppressHydrationWarning
    >
      {t('theme')}: {t(theme)}
    </button>
  );
};
