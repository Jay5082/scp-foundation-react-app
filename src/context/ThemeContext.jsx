/**
 * ThemeContext
 * 
 * Provides global theme state (dark/light) to the entire app.
 * - Reads initial preference from localStorage (key: 'scp-theme')
 * - Falls back to 'dark' if no saved preference
 * - Applies theme by setting `data-theme` attribute on <html>
 * - Persists changes to localStorage automatically
 * 
 * Usage:
 *   const { theme, toggleTheme } = useTheme();
 */

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

/** Key used for localStorage persistence */
const STORAGE_KEY = 'scp-theme';

/**
 * Reads the saved theme from localStorage, or returns 'dark' as default.
 */
function getSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // localStorage unavailable (SSR, privacy mode, etc.)
  }
  return 'dark';
}

/**
 * ThemeProvider — Wrap your app with this to enable theme switching.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getSavedTheme);

  /**
   * Apply theme to the DOM and persist to localStorage
   * whenever theme changes.
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage write failed — silently ignore
    }
  }, [theme]);

  /**
   * Toggle between dark and light themes
   */
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme state and toggle function.
 * Must be used within a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
