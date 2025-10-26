/**
 * Ocean Theme
 * Blue-based calming theme
 *
 * @remarks
 * - Calming, professional aesthetic with teal/cyan accents
 * - Perfect for healthcare, finance, and productivity applications
 * - WCAG 2.2 AA compliant contrast ratios
 * - Sharp corners following IBM Carbon principles
 * - Inspired by ocean depths and coastal waters
 *
 * @since 0.1.0
 */

import type { Theme } from './types';

export const oceanTheme: Theme = {
  name: 'ocean',
  displayName: 'Ocean',
  description: 'Blue-based calming theme with teal accents',

  light: {
    colors: {
      brand: {
        10: '#e5f6fd',
        20: '#bae6fd',
        30: '#7dd3fc',
        40: '#38bdf8',
        50: '#0ea5e9',
        60: '#0284c7', // Primary Ocean Blue
        70: '#0369a1',
        80: '#075985',
        90: '#0c4a6e',
        100: '#082f49',
      },
      layer: {
        '01': '#f0f9ff',
        '02': '#ffffff',
        '03': '#f0f9ff',
        'accent-01': '#e0f2fe',
      },
      field: {
        '01': '#f0f9ff',
        '02': '#ffffff',
      },
      surface: {
        DEFAULT: '#ffffff',
        muted: '#f0f9ff',
        hover: '#e0f2fe',
        active: '#bae6fd',
      },
      text: {
        primary: '#0c4a6e',
        secondary: '#075985',
        placeholder: '#94a3b8',
        onColor: '#ffffff',
        helper: '#64748b',
        error: '#dc2626',
        inverse: '#ffffff',
      },
      border: {
        subtle: '#bae6fd',
        strong: '#0369a1',
        inverse: '#0c4a6e',
        interactive: '#0284c7',
        focus: '#0ea5e9',
      },
      interactive: {
        DEFAULT: '#0284c7',
        hover: '#0369a1',
        active: '#075985',
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
        sm: '0 1px 2px 0 rgb(2 132 199 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(2 132 199 / 0.1), 0 1px 2px -1px rgb(2 132 199 / 0.1)',
        md: '0 4px 6px -1px rgb(2 132 199 / 0.1), 0 2px 4px -2px rgb(2 132 199 / 0.1)',
        lg: '0 10px 15px -3px rgb(2 132 199 / 0.1), 0 4px 6px -4px rgb(2 132 199 / 0.1)',
        xl: '0 20px 25px -5px rgb(2 132 199 / 0.1), 0 8px 10px -6px rgb(2 132 199 / 0.1)',
      },
      transitions: {
        duration: '150ms',
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      focus: {
        ring: '0 0 0 3px #0ea5e9',
        ringOffset: '2px',
      },
    },
  },

  dark: {
    colors: {
      brand: {
        10: '#e5f6fd',
        20: '#bae6fd',
        30: '#7dd3fc',
        40: '#38bdf8',
        50: '#0ea5e9',
        60: '#0284c7',
        70: '#0369a1',
        80: '#075985',
        90: '#0c4a6e',
        100: '#082f49',
      },
      layer: {
        '01': '#0c2f3f',
        '02': '#134155',
        '03': '#1e5568',
        'accent-01': '#134155',
      },
      field: {
        '01': '#0c2f3f',
        '02': '#134155',
      },
      surface: {
        DEFAULT: '#082f49',
        muted: '#0c2f3f',
        hover: '#134155',
        active: '#1e5568',
      },
      text: {
        primary: '#e0f2fe',
        secondary: '#bae6fd',
        placeholder: '#64748b',
        onColor: '#ffffff',
        helper: '#94a3b8',
        error: '#fca5a5',
        inverse: '#082f49',
      },
      border: {
        subtle: '#134155',
        strong: '#0369a1',
        inverse: '#e0f2fe',
        interactive: '#38bdf8',
        focus: '#0ea5e9',
      },
      interactive: {
        DEFAULT: '#38bdf8',
        hover: '#7dd3fc',
        active: '#bae6fd',
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
        ring: '0 0 0 3px #0ea5e9',
        ringOffset: '2px',
      },
    },
  },
};
