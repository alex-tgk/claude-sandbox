/**
 * Sunset Theme
 * Warm orange/red theme
 *
 * @remarks
 * - Warm, energetic aesthetic with orange/amber accents
 * - Perfect for creative, social, and entertainment applications
 * - WCAG 2.2 AA compliant contrast ratios
 * - Sharp corners following IBM Carbon principles
 * - Inspired by sunsets, warmth, and energy
 *
 * @since 0.1.0
 */

import type { Theme } from './types';

export const sunsetTheme: Theme = {
  name: 'sunset',
  displayName: 'Sunset',
  description: 'Warm orange/red theme with amber accents',

  light: {
    colors: {
      brand: {
        10: '#ffedd5',
        20: '#fed7aa',
        30: '#fdba74',
        40: '#fb923c',
        50: '#f97316',
        60: '#ea580c', // Primary Sunset Orange
        70: '#c2410c',
        80: '#9a3412',
        90: '#7c2d12',
        100: '#431407',
      },
      layer: {
        '01': '#fff7ed',
        '02': '#ffffff',
        '03': '#fff7ed',
        'accent-01': '#ffedd5',
      },
      field: {
        '01': '#fff7ed',
        '02': '#ffffff',
      },
      surface: {
        DEFAULT: '#ffffff',
        muted: '#fff7ed',
        hover: '#ffedd5',
        active: '#fed7aa',
      },
      text: {
        primary: '#7c2d12',
        secondary: '#9a3412',
        placeholder: '#94a3b8',
        onColor: '#ffffff',
        helper: '#78716c',
        error: '#dc2626',
        inverse: '#ffffff',
      },
      border: {
        subtle: '#fed7aa',
        strong: '#c2410c',
        inverse: '#7c2d12',
        interactive: '#ea580c',
        focus: '#f97316',
      },
      interactive: {
        DEFAULT: '#ea580c',
        hover: '#c2410c',
        active: '#9a3412',
      },
      semantic: {
        error: '#dc2626',
        errorLight: '#fee2e2',
        warning: '#f59e0b',
        warningLight: '#fef3c7',
        success: '#059669',
        successLight: '#d1fae5',
        info: '#0284c7',
        infoLight: '#e0f2fe',
      },
    },
    spacing: {
      '01': '0.125rem',
      '02': '0.25rem',
      '03': '0.5rem',
      '04': '0.75rem',
      '05': '1rem',
      '06': '1.5rem',
      '07': '2rem',
      '08': '2.5rem',
      '09': '3rem',
      '10': '4rem',
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      none: '0',
      sm: '0',
      DEFAULT: '0',
      md: '0',
      lg: '0',
      xl: '0',
    },
    typography: {
      fontFamily: {
        sans: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        mono: "'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', monospace",
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      lineHeight: {
        xs: '1rem',
        sm: '1.25rem',
        base: '1.5rem',
        lg: '1.75rem',
        xl: '1.75rem',
        '2xl': '2rem',
      },
      letterSpacing: {
        tight: '0.32px',
        normal: '0.16px',
        wide: '0',
      },
    },
    effects: {
      shadows: {
        sm: '0 1px 2px 0 rgb(234 88 12 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(234 88 12 / 0.1), 0 1px 2px -1px rgb(234 88 12 / 0.1)',
        md: '0 4px 6px -1px rgb(234 88 12 / 0.1), 0 2px 4px -2px rgb(234 88 12 / 0.1)',
        lg: '0 10px 15px -3px rgb(234 88 12 / 0.1), 0 4px 6px -4px rgb(234 88 12 / 0.1)',
        xl: '0 20px 25px -5px rgb(234 88 12 / 0.1), 0 8px 10px -6px rgb(234 88 12 / 0.1)',
      },
      transitions: {
        duration: '150ms',
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      focus: {
        ring: '0 0 0 3px #f97316',
        ringOffset: '2px',
      },
    },
  },

  dark: {
    colors: {
      brand: {
        10: '#ffedd5',
        20: '#fed7aa',
        30: '#fdba74',
        40: '#fb923c',
        50: '#f97316',
        60: '#ea580c',
        70: '#c2410c',
        80: '#9a3412',
        90: '#7c2d12',
        100: '#431407',
      },
      layer: {
        '01': '#3d1f10',
        '02': '#52291a',
        '03': '#663424',
        'accent-01': '#52291a',
      },
      field: {
        '01': '#3d1f10',
        '02': '#52291a',
      },
      surface: {
        DEFAULT: '#431407',
        muted: '#3d1f10',
        hover: '#52291a',
        active: '#663424',
      },
      text: {
        primary: '#ffedd5',
        secondary: '#fed7aa',
        placeholder: '#78716c',
        onColor: '#ffffff',
        helper: '#a8a29e',
        error: '#fca5a5',
        inverse: '#431407',
      },
      border: {
        subtle: '#52291a',
        strong: '#c2410c',
        inverse: '#ffedd5',
        interactive: '#fb923c',
        focus: '#f97316',
      },
      interactive: {
        DEFAULT: '#fb923c',
        hover: '#fdba74',
        active: '#fed7aa',
      },
      semantic: {
        error: '#fca5a5',
        errorLight: '#7f1d1d',
        warning: '#fbbf24',
        warningLight: '#78350f',
        success: '#34d399',
        successLight: '#064e3b',
        info: '#38bdf8',
        infoLight: '#0c4a6e',
      },
    },
    spacing: {
      '01': '0.125rem',
      '02': '0.25rem',
      '03': '0.5rem',
      '04': '0.75rem',
      '05': '1rem',
      '06': '1.5rem',
      '07': '2rem',
      '08': '2.5rem',
      '09': '3rem',
      '10': '4rem',
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
    },
    borderRadius: {
      none: '0',
      sm: '0',
      DEFAULT: '0',
      md: '0',
      lg: '0',
      xl: '0',
    },
    typography: {
      fontFamily: {
        sans: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        mono: "'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', monospace",
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
      },
      lineHeight: {
        xs: '1rem',
        sm: '1.25rem',
        base: '1.5rem',
        lg: '1.75rem',
        xl: '1.75rem',
        '2xl': '2rem',
      },
      letterSpacing: {
        tight: '0.32px',
        normal: '0.16px',
        wide: '0',
      },
    },
    effects: {
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.5)',
        DEFAULT: '0 2px 6px 0 rgb(0 0 0 / 0.6)',
        md: '0 4px 8px 0 rgb(0 0 0 / 0.6)',
        lg: '0 8px 16px 0 rgb(0 0 0 / 0.6)',
        xl: '0 12px 24px 0 rgb(0 0 0 / 0.6)',
      },
      transitions: {
        duration: '150ms',
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      focus: {
        ring: '0 0 0 3px #f97316',
        ringOffset: '2px',
      },
    },
  },
};
