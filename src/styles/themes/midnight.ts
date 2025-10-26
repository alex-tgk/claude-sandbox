/**
 * Midnight Theme
 * Dark professional theme with IBM Blue accents
 *
 * @remarks
 * - Default theme for the UI library
 * - Professional, technical aesthetic
 * - Excellent for developer tools and enterprise applications
 * - WCAG 2.2 AA compliant contrast ratios
 * - Sharp corners following IBM Carbon principles
 *
 * @since 0.1.0
 */

import type { Theme } from './types';

export const midnightTheme: Theme = {
  name: 'midnight',
  displayName: 'Midnight',
  description: 'Dark professional theme with IBM Blue accents',

  light: {
    colors: {
      brand: {
        10: '#edf5ff',
        20: '#d0e2ff',
        30: '#a6c8ff',
        40: '#78a9ff',
        50: '#4589ff',
        60: '#0f62fe', // Primary IBM Blue
        70: '#0043ce',
        80: '#002d9c',
        90: '#001d6c',
        100: '#001141',
      },
      layer: {
        '01': '#f4f4f4',
        '02': '#ffffff',
        '03': '#f4f4f4',
        'accent-01': '#e0e0e0',
      },
      field: {
        '01': '#f4f4f4',
        '02': '#ffffff',
      },
      surface: {
        DEFAULT: '#ffffff',
        muted: '#f4f4f4',
        hover: '#e8e8e8',
        active: '#e0e0e0',
      },
      text: {
        primary: '#161616',
        secondary: '#525252',
        placeholder: '#a8a8a8',
        onColor: '#ffffff',
        helper: '#6f6f6f',
        error: '#da1e28',
        inverse: '#ffffff',
      },
      border: {
        subtle: '#e0e0e0',
        strong: '#8d8d8d',
        inverse: '#161616',
        interactive: '#0f62fe',
        focus: '#0f62fe',
      },
      interactive: {
        DEFAULT: '#0f62fe',
        hover: '#0050e6',
        active: '#002d9c',
      },
      semantic: {
        error: '#da1e28',
        errorLight: '#fff1f1',
        warning: '#f1c21b',
        warningLight: '#fcf4d6',
        success: '#24a148',
        successLight: '#defbe6',
        info: '#0f62fe',
        infoLight: '#edf5ff',
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
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      transitions: {
        duration: '150ms',
        timing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      focus: {
        ring: '0 0 0 3px #0f62fe',
        ringOffset: '2px',
      },
    },
  },

  dark: {
    colors: {
      brand: {
        10: '#edf5ff',
        20: '#d0e2ff',
        30: '#a6c8ff',
        40: '#78a9ff',
        50: '#4589ff',
        60: '#0f62fe',
        70: '#0043ce',
        80: '#002d9c',
        90: '#001d6c',
        100: '#001141',
      },
      layer: {
        '01': '#262626',
        '02': '#393939',
        '03': '#525252',
        'accent-01': '#393939',
      },
      field: {
        '01': '#262626',
        '02': '#393939',
      },
      surface: {
        DEFAULT: '#161616',
        muted: '#262626',
        hover: '#393939',
        active: '#525252',
      },
      text: {
        primary: '#f4f4f4',
        secondary: '#c6c6c6',
        placeholder: '#6f6f6f',
        onColor: '#ffffff',
        helper: '#a8a8a8',
        error: '#ff8389',
        inverse: '#161616',
      },
      border: {
        subtle: '#393939',
        strong: '#8d8d8d',
        inverse: '#f4f4f4',
        interactive: '#4589ff',
        focus: '#4589ff',
      },
      interactive: {
        DEFAULT: '#4589ff',
        hover: '#78a9ff',
        active: '#a6c8ff',
      },
      semantic: {
        error: '#ff8389',
        errorLight: '#520408',
        warning: '#f1c21b',
        warningLight: '#393939',
        success: '#42be65',
        successLight: '#044317',
        info: '#4589ff',
        infoLight: '#001d6c',
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
        ring: '0 0 0 3px #4589ff',
        ringOffset: '2px',
      },
    },
  },
};
