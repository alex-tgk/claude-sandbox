/**
 * Minimal Theme
 * Ultra-clean monochrome theme
 *
 * @remarks
 * - Minimal, monochromatic aesthetic with subtle gray accents
 * - Perfect for content-focused, documentation, and editorial applications
 * - WCAG 2.2 AA compliant contrast ratios
 * - Sharp corners following IBM Carbon principles
 * - Inspired by minimalism, clarity, and focus
 *
 * @since 0.1.0
 */

import type { Theme } from './types';

export const minimalTheme: Theme = {
  name: 'minimal',
  displayName: 'Minimal',
  description: 'Ultra-clean monochrome theme',

  light: {
    colors: {
      brand: {
        10: '#f9fafb',
        20: '#f3f4f6',
        30: '#e5e7eb',
        40: '#d1d5db',
        50: '#9ca3af',
        60: '#6b7280', // Primary Minimal Gray
        70: '#4b5563',
        80: '#374151',
        90: '#1f2937',
        100: '#111827',
      },
      layer: {
        '01': '#f9fafb',
        '02': '#ffffff',
        '03': '#f9fafb',
        'accent-01': '#f3f4f6',
      },
      field: {
        '01': '#f9fafb',
        '02': '#ffffff',
      },
      surface: {
        DEFAULT: '#ffffff',
        muted: '#f9fafb',
        hover: '#f3f4f6',
        active: '#e5e7eb',
      },
      text: {
        primary: '#111827',
        secondary: '#4b5563',
        placeholder: '#9ca3af',
        onColor: '#ffffff',
        helper: '#6b7280',
        error: '#dc2626',
        inverse: '#ffffff',
      },
      border: {
        subtle: '#e5e7eb',
        strong: '#6b7280',
        inverse: '#111827',
        interactive: '#374151',
        focus: '#1f2937',
      },
      interactive: {
        DEFAULT: '#374151',
        hover: '#1f2937',
        active: '#111827',
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
        ring: '0 0 0 3px #1f2937',
        ringOffset: '2px',
      },
    },
  },

  dark: {
    colors: {
      brand: {
        10: '#f9fafb',
        20: '#f3f4f6',
        30: '#e5e7eb',
        40: '#d1d5db',
        50: '#9ca3af',
        60: '#6b7280',
        70: '#4b5563',
        80: '#374151',
        90: '#1f2937',
        100: '#111827',
      },
      layer: {
        '01': '#1f2937',
        '02': '#374151',
        '03': '#4b5563',
        'accent-01': '#374151',
      },
      field: {
        '01': '#1f2937',
        '02': '#374151',
      },
      surface: {
        DEFAULT: '#111827',
        muted: '#1f2937',
        hover: '#374151',
        active: '#4b5563',
      },
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        placeholder: '#6b7280',
        onColor: '#ffffff',
        helper: '#9ca3af',
        error: '#fca5a5',
        inverse: '#111827',
      },
      border: {
        subtle: '#374151',
        strong: '#6b7280',
        inverse: '#f9fafb',
        interactive: '#9ca3af',
        focus: '#d1d5db',
      },
      interactive: {
        DEFAULT: '#9ca3af',
        hover: '#d1d5db',
        active: '#e5e7eb',
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
        ring: '0 0 0 3px #d1d5db',
        ringOffset: '2px',
      },
    },
  },
};
