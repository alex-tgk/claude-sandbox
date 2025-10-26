/**
 * ThemeProvider Component
 * Provides theme context and dynamic theme switching
 *
 * @remarks
 * - Manages theme state and application
 * - Supports light/dark mode switching
 * - Persists theme preferences to localStorage
 * - Listens to system color scheme changes
 * - Provides theme context to all child components
 *
 * @since 0.1.0
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from 'react';
import type { Theme, ThemeName } from './types';
import { midnightTheme } from './midnight';
import { oceanTheme } from './ocean';
import { forestTheme } from './forest';
import { sunsetTheme } from './sunset';
import { minimalTheme } from './minimal';
import {
  applyTheme,
  getSystemColorScheme,
  loadThemePreference,
  watchSystemColorScheme,
} from './utils';

// Theme registry
const themes: Record<ThemeName, Theme> = {
  midnight: midnightTheme,
  ocean: oceanTheme,
  forest: forestTheme,
  sunset: sunsetTheme,
  minimal: minimalTheme,
};

interface ThemeContextValue {
  /** Current theme object */
  theme: Theme;
  /** Current theme name */
  themeName: ThemeName;
  /** Current mode (light or dark) */
  mode: 'light' | 'dark';
  /** Switch to a different theme */
  setTheme: (name: ThemeName) => void;
  /** Toggle between light and dark mode */
  toggleMode: () => void;
  /** Set mode explicitly */
  setMode: (mode: 'light' | 'dark') => void;
  /** All available themes */
  availableThemes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
  /** Default theme name (defaults to 'midnight') */
  defaultTheme?: ThemeName;
  /** Default mode (defaults to system preference) */
  defaultMode?: 'light' | 'dark';
  /** Whether to follow system color scheme (defaults to true) */
  followSystem?: boolean;
}

/**
 * ThemeProvider component
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from '@/styles/themes';
 *
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="ocean" defaultMode="dark">
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({
  children,
  defaultTheme = 'midnight',
  defaultMode,
  followSystem = true,
}: ThemeProviderProps): JSX.Element {
  // Load saved preferences or use defaults
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const saved = loadThemePreference();
    return (saved.themeName as ThemeName) || defaultTheme;
  });

  const [mode, setModeState] = useState<'light' | 'dark'>(() => {
    const saved = loadThemePreference();
    return saved.mode || defaultMode || getSystemColorScheme();
  });

  const theme = useMemo(() => themes[themeName], [themeName]);

  const availableThemes = useMemo(() => Object.values(themes), []);

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(theme, mode);
  }, [theme, mode]);

  // Watch system color scheme changes
  useEffect(() => {
    if (!followSystem) return;

    const unwatch = watchSystemColorScheme((systemScheme) => {
      // Only update if user hasn't explicitly set a preference
      const saved = loadThemePreference();
      if (!saved.mode) {
        setModeState(systemScheme);
      }
    });

    return unwatch;
  }, [followSystem]);

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
  };

  const setMode = (newMode: 'light' | 'dark') => {
    setModeState(newMode);
  };

  const toggleMode = () => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: ThemeContextValue = {
    theme,
    themeName,
    mode,
    setTheme,
    toggleMode,
    setMode,
    availableThemes,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * useTheme hook
 *
 * @example
 * ```tsx
 * import { useTheme } from '@/styles/themes';
 *
 * function ThemeSwitcher() {
 *   const { themeName, setTheme, mode, toggleMode } = useTheme();
 *
 *   return (
 *     <div>
 *       <p>Current theme: {themeName}</p>
 *       <button onClick={() => setTheme('ocean')}>Ocean</button>
 *       <button onClick={toggleMode}>
 *         {mode === 'light' ? 'Dark' : 'Light'}
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
