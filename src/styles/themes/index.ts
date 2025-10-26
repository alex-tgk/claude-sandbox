/**
 * Theme System
 * Pre-built theme variants for the UI library
 *
 * @remarks
 * - Five production-ready themes: Midnight, Ocean, Forest, Sunset, Minimal
 * - Each theme includes light and dark mode variants
 * - All themes follow IBM Carbon Design System principles
 * - WCAG 2.2 AA compliant contrast ratios
 * - Dynamic theme switching via ThemeProvider
 * - Type-safe theme configuration
 *
 * @example
 * ```tsx
 * import { ThemeProvider, useTheme } from '@/styles/themes';
 *
 * // In your app root
 * function App() {
 *   return (
 *     <ThemeProvider defaultTheme="ocean">
 *       <YourApp />
 *     </ThemeProvider>
 *   );
 * }
 *
 * // In a component
 * function ThemeSwitcher() {
 *   const { setTheme, toggleMode, availableThemes } = useTheme();
 *
 *   return (
 *     <div>
 *       {availableThemes.map(theme => (
 *         <button onClick={() => setTheme(theme.name)}>
 *           {theme.displayName}
 *         </button>
 *       ))}
 *       <button onClick={toggleMode}>Toggle Dark Mode</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @since 0.1.0
 */

// Types
export type {
  Theme,
  ThemeMode,
  ThemeName,
  ThemeConfig,
  ColorScale,
  LayerColors,
  FieldColors,
  SurfaceColors,
  TextColors,
  BorderColors,
  InteractiveColors,
  SemanticColors,
  ThemeColors,
  SpacingScale,
  BorderRadius,
  Typography,
  Effects,
} from './types';

// Theme configurations
export { midnightTheme } from './midnight';
export { oceanTheme } from './ocean';
export { forestTheme } from './forest';
export { sunsetTheme } from './sunset';
export { minimalTheme } from './minimal';

// Theme utilities
export {
  themeToCSSVariables,
  applyCSSVariables,
  applyTheme,
  getSystemColorScheme,
  loadThemePreference,
  watchSystemColorScheme,
} from './utils';

// Theme provider and hook
export { ThemeProvider, useTheme } from './ThemeProvider';
export type { ThemeProviderProps } from './ThemeProvider';

// Theme registry
import { midnightTheme } from './midnight';
import { oceanTheme } from './ocean';
import { forestTheme } from './forest';
import { sunsetTheme } from './sunset';
import { minimalTheme } from './minimal';
import type { ThemeConfig } from './types';

/**
 * Default theme configuration
 */
export const themeConfig: ThemeConfig = {
  defaultTheme: 'midnight',
  themes: {
    midnight: midnightTheme,
    ocean: oceanTheme,
    forest: forestTheme,
    sunset: sunsetTheme,
    minimal: minimalTheme,
  },
};

/**
 * Get a theme by name
 */
export function getTheme(name: keyof typeof themeConfig.themes) {
  return themeConfig.themes[name];
}

/**
 * Get all available theme names
 */
export function getThemeNames() {
  return Object.keys(themeConfig.themes) as Array<
    keyof typeof themeConfig.themes
  >;
}
