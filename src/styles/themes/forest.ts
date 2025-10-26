/**
 * Forest Theme
 * Green-based natural theme
 *
 * @remarks
 * - Natural, eco-friendly aesthetic with emerald/green accents
 * - Perfect for environmental, sustainability, and wellness applications
 * - WCAG 2.2 AA compliant contrast ratios
 * - Sharp corners following IBM Carbon principles
 * - Inspired by forests, nature, and growth
 *
 * @since 0.1.0
 */

import type { Theme } from './types';

export const forestTheme: Theme = {
  name: 'forest',
  displayName: 'Forest',
  description: 'Green-based natural theme with emerald accents',

  light: {
    colors: {
      brand: {
        10: '#d1fae5',
        20: '#a7f3d0',
        30: '#6ee7b7',
        40: '#34d399',
        50: '#10b981',
        60: '#059669', // Primary Forest Green
        70: '#047857',
        80: '#065f46',
        90: '#064e3b',
        100: '#022c22',
      },
      layer: {
        '01': '#f0fdf4',
        '02': '#ffffff',
        '03': '#f0fdf4',
        'accent-01': '#dcfce7',
      },
      field: {
        '01': '#f0fdf4',
        '02': '#ffffff',
      },
      surface: {
        DEFAULT: '#ffffff',
        muted: '#f0fdf4',
        hover: '#dcfce7',
        active: '#bbf7d0',
      },
      text: {
        primary: '#064e3b',
        secondary: '#065f46',
        placeholder: '#94a3b8',
        onColor: '#ffffff',
        helper: '#6b7280',
        error: '#dc2626',
        inverse: '#ffffff',
      },
      border: {
        subtle: '#bbf7d0',
        strong: '#047857',
        inverse: '#064e3b',
        interactive: '#059669',
        focus: '#10b981',
      },
      interactive: {
        DEFAULT: '#059669',
        hover: '#047857',
        active: '#065f46',
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
        sm: '0 1px 2px 0 rgb(5 150 105 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(5 150 105 / 0.1), 0 1px 2px -1px rgb(5 150 105 / 0.1)',
        md: '0 4px 6px -1px rgb(5 150 105 / 0.1), 0 2px 4px -2px rgb(5 150 105 / 0.1)',
        lg: '0 10px 15px -3px rgb(5 150 105 / 0.1), 0 4px 6px -4px rgb(5 150 105 / 0.1)',
        xl: '0 20px 25px -5px rgb(5 150 105 / 0.1), 0 8px 10px -6px rgb(5 150 105 / 0.1)',
      },
      transitions: {
        duration: '150ms',
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      focus: {
        ring: '0 0 0 3px #10b981',
        ringOffset: '2px',
      },
    },
  },

  dark: {
    colors: {
      brand: {
        10: '#d1fae5',
        20: '#a7f3d0',
        30: '#6ee7b7',
        40: '#34d399',
        50: '#10b981',
        60: '#059669',
        70: '#047857',
        80: '#065f46',
        90: '#064e3b',
        100: '#022c22',
      },
      layer: {
        '01': '#0a2f1f',
        '02': '#134132',
        '03': '#1e5545',
        'accent-01': '#134132',
      },
      field: {
        '01': '#0a2f1f',
        '02': '#134132',
      },
      surface: {
        DEFAULT: '#022c22',
        muted: '#0a2f1f',
        hover: '#134132',
        active: '#1e5545',
      },
      text: {
        primary: '#d1fae5',
        secondary: '#a7f3d0',
        placeholder: '#6b7280',
        onColor: '#ffffff',
        helper: '#9ca3af',
        error: '#fca5a5',
        inverse: '#022c22',
      },
      border: {
        subtle: '#134132',
        strong: '#047857',
        inverse: '#d1fae5',
        interactive: '#34d399',
        focus: '#10b981',
      },
      interactive: {
        DEFAULT: '#34d399',
        hover: '#6ee7b7',
        active: '#a7f3d0',
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
        ring: '0 0 0 3px #10b981',
        ringOffset: '2px',
      },
    },
  },
};
