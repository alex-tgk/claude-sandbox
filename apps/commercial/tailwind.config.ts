import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS configuration for the commercial showcase website.
 * Extends the design tokens from the @modular-ui/system library.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // Include the library's components for proper class detection
    '../../src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // IBM Carbon Design System inspired color palette
      colors: {
        primary: {
          50: '#e8f4fd',
          100: '#d1e9fb',
          200: '#a3d3f7',
          300: '#75bdf3',
          400: '#47a7ef',
          500: '#0f62fe', // IBM Blue
          600: '#0353e9',
          700: '#0043ce',
          800: '#002d9c',
          900: '#001d6c',
        },
        neutral: {
          50: '#f4f4f4',
          100: '#e0e0e0',
          200: '#c6c6c6',
          300: '#a8a8a8',
          400: '#8d8d8d',
          500: '#6f6f6f',
          600: '#525252',
          700: '#393939',
          800: '#262626',
          900: '#161616',
        },
        success: {
          50: '#defbe6',
          100: '#a7f0ba',
          200: '#6fdc8c',
          300: '#42be65',
          400: '#24a148',
          500: '#198038',
          600: '#0e6027',
          700: '#044317',
          800: '#022d0d',
          900: '#071908',
        },
        warning: {
          50: '#fcf4d6',
          100: '#fddc69',
          200: '#f1c21b',
          300: '#d2a106',
          400: '#b28600',
          500: '#8e6a00',
          600: '#684e00',
          700: '#483700',
          800: '#302400',
          900: '#1c1500',
        },
        error: {
          50: '#fff1f1',
          100: '#ffd7d9',
          200: '#ffb3b8',
          300: '#ff8389',
          400: '#fa4d56',
          500: '#da1e28',
          600: '#a2191f',
          700: '#750e13',
          800: '#520408',
          900: '#2d0709',
        },
      },
      // Sharp corners matching IBM Carbon
      borderRadius: {
        none: '0',
        sm: '0',
        DEFAULT: '0',
        md: '0',
        lg: '0',
        xl: '0',
        '2xl': '0',
        '3xl': '0',
      },
      // Typography scale
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
