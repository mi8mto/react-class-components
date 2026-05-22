import { createContext } from 'react';

export type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const themeContext = createContext<ThemeContextType | null>(null);
