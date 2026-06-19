'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { themeContext, type Theme } from './appThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    return (localStorage.getItem('theme') as Theme) ?? 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <themeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};
