import { useTheme } from '../../hooks';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      Theme: {theme}
    </button>
  );
};
