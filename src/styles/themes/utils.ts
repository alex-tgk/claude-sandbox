/**
 * Theme Utilities
 * Helper functions for theme conversion and application
 *
 * @remarks
 * - Converts theme objects to CSS custom properties
 * - Applies themes to the DOM
 * - Type-safe theme operations
 *
 * @since 0.1.0
 */

import type { Theme, ThemeMode } from './types';

/**
 * Converts a theme mode to CSS custom properties
 */
export function themeToCSSVariables(theme: ThemeMode): Record<string, string> {
  return {
    // Brand colors
    '--brand-10': theme.colors.brand[10],
    '--brand-20': theme.colors.brand[20],
    '--brand-30': theme.colors.brand[30],
    '--brand-40': theme.colors.brand[40],
    '--brand-50': theme.colors.brand[50],
    '--brand-60': theme.colors.brand[60],
    '--brand-70': theme.colors.brand[70],
    '--brand-80': theme.colors.brand[80],
    '--brand-90': theme.colors.brand[90],
    '--brand-100': theme.colors.brand[100],

    // Layer colors
    '--layer-01': theme.colors.layer['01'],
    '--layer-02': theme.colors.layer['02'],
    '--layer-03': theme.colors.layer['03'],
    '--layer-accent-01': theme.colors.layer['accent-01'],

    // Field colors
    '--field-01': theme.colors.field['01'],
    '--field-02': theme.colors.field['02'],

    // Surface colors
    '--surface': theme.colors.surface.DEFAULT,
    '--surface-muted': theme.colors.surface.muted,
    '--surface-hover': theme.colors.surface.hover,
    '--surface-active': theme.colors.surface.active,

    // Text colors
    '--text-primary': theme.colors.text.primary,
    '--text-secondary': theme.colors.text.secondary,
    '--text-placeholder': theme.colors.text.placeholder,
    '--text-on-color': theme.colors.text.onColor,
    '--text-helper': theme.colors.text.helper,
    '--text-error': theme.colors.text.error,
    '--text-inverse': theme.colors.text.inverse,

    // Legacy text colors
    '--text': theme.colors.text.primary,
    '--text-muted': theme.colors.text.secondary,

    // Border colors
    '--border-subtle': theme.colors.border.subtle,
    '--border-strong': theme.colors.border.strong,
    '--border-inverse': theme.colors.border.inverse,
    '--border-interactive': theme.colors.border.interactive,
    '--border-focus': theme.colors.border.focus,

    // Legacy border
    '--border': theme.colors.border.subtle,

    // Interactive colors
    '--interactive': theme.colors.interactive.DEFAULT,
    '--interactive-hover': theme.colors.interactive.hover,
    '--interactive-active': theme.colors.interactive.active,

    // Semantic colors
    '--error': theme.colors.semantic.error,
    '--error-light': theme.colors.semantic.errorLight,
    '--warning': theme.colors.semantic.warning,
    '--warning-light': theme.colors.semantic.warningLight,
    '--success': theme.colors.semantic.success,
    '--success-light': theme.colors.semantic.successLight,
    '--info': theme.colors.semantic.info,
    '--info-light': theme.colors.semantic.infoLight,

    // Spacing
    '--spacing-01': theme.spacing['01'],
    '--spacing-02': theme.spacing['02'],
    '--spacing-03': theme.spacing['03'],
    '--spacing-04': theme.spacing['04'],
    '--spacing-05': theme.spacing['05'],
    '--spacing-06': theme.spacing['06'],
    '--spacing-07': theme.spacing['07'],
    '--spacing-08': theme.spacing['08'],
    '--spacing-09': theme.spacing['09'],
    '--spacing-10': theme.spacing['10'],
    '--spacing-xs': theme.spacing.xs,
    '--spacing-sm': theme.spacing.sm,
    '--spacing-md': theme.spacing.md,
    '--spacing-lg': theme.spacing.lg,
    '--spacing-xl': theme.spacing.xl,

    // Border radius
    '--radius-none': theme.borderRadius.none,
    '--radius-sm': theme.borderRadius.sm,
    '--radius': theme.borderRadius.DEFAULT,
    '--radius-md': theme.borderRadius.md,
    '--radius-lg': theme.borderRadius.lg,
    '--radius-xl': theme.borderRadius.xl,

    // Typography
    '--font-sans': theme.typography.fontFamily.sans,
    '--font-mono': theme.typography.fontFamily.mono,
    '--text-xs': theme.typography.fontSize.xs,
    '--text-sm': theme.typography.fontSize.sm,
    '--text-base': theme.typography.fontSize.base,
    '--text-lg': theme.typography.fontSize.lg,
    '--text-xl': theme.typography.fontSize.xl,
    '--text-2xl': theme.typography.fontSize['2xl'],
    '--leading-xs': theme.typography.lineHeight.xs,
    '--leading-sm': theme.typography.lineHeight.sm,
    '--leading-base': theme.typography.lineHeight.base,
    '--leading-lg': theme.typography.lineHeight.lg,
    '--leading-xl': theme.typography.lineHeight.xl,
    '--leading-2xl': theme.typography.lineHeight['2xl'],
    '--tracking-tight': theme.typography.letterSpacing.tight,
    '--tracking-normal': theme.typography.letterSpacing.normal,
    '--tracking-wide': theme.typography.letterSpacing.wide,

    // Effects
    '--shadow-sm': theme.effects.shadows.sm,
    '--shadow': theme.effects.shadows.DEFAULT,
    '--shadow-md': theme.effects.shadows.md,
    '--shadow-lg': theme.effects.shadows.lg,
    '--shadow-xl': theme.effects.shadows.xl,
    '--transition-duration': theme.effects.transitions.duration,
    '--transition-timing': theme.effects.transitions.timing,
    '--focus-ring': theme.effects.focus.ring,
    '--focus-ring-offset': theme.effects.focus.ringOffset,
  };
}

/**
 * Applies CSS variables to a target element
 */
export function applyCSSVariables(
  element: HTMLElement,
  variables: Record<string, string>
): void {
  Object.entries(variables).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

/**
 * Applies a theme to the document
 */
export function applyTheme(theme: Theme, mode: 'light' | 'dark'): void {
  const root = document.documentElement;
  const themeMode = mode === 'light' ? theme.light : theme.dark;
  const variables = themeToCSSVariables(themeMode);

  applyCSSVariables(root, variables);

  // Update dark mode class
  if (mode === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.add('light');
    root.classList.remove('dark');
  }

  // Store current theme in localStorage
  localStorage.setItem('theme-name', theme.name);
  localStorage.setItem('theme-mode', mode);
}

/**
 * Gets the preferred color scheme from system
 */
export function getSystemColorScheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/**
 * Loads theme preference from localStorage
 */
export function loadThemePreference(): {
  themeName: string | null;
  mode: 'light' | 'dark' | null;
} {
  if (typeof window === 'undefined')
    return { themeName: null, mode: null };

  return {
    themeName: localStorage.getItem('theme-name'),
    mode: localStorage.getItem('theme-mode') as 'light' | 'dark' | null,
  };
}

/**
 * Watches for system color scheme changes
 */
export function watchSystemColorScheme(
  callback: (scheme: 'light' | 'dark') => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', handler);

  return () => {
    mediaQuery.removeEventListener('change', handler);
  };
}
