'use client';

import { useContext } from 'react';

import { themeContext } from '../context/appThemeContext';

export const useTheme = () => {
  const context = useContext(themeContext);

  if (!context) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
};
