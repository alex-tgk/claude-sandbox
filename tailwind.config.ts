import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v3 configuration for the modular UI system.
 *
 * @remarks
 * - Uses CSS variables for theming (light/dark/system modes)
 * - Design tokens are defined in src/styles/tokens.css
 * - Zero runtime CSS-in-JS, all utilities are static
 * - Tree-shakable and optimized for production
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './example/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors using CSS variables
        brand: {
          50: 'var(--brand-50)',
          100: 'var(--brand-100)',
          200: 'var(--brand-200)',
          300: 'var(--brand-300)',
          400: 'var(--brand-400)',
          500: 'var(--brand-500)',
          600: 'var(--brand-600)',
          700: 'var(--brand-700)',
          800: 'var(--brand-800)',
          900: 'var(--brand-900)',
          950: 'var(--brand-950)',
        },
        // Surface colors
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
          hover: 'var(--surface-hover)',
          active: 'var(--surface-active)',
        },
        // Text colors
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        // Border colors
        border: {
          DEFAULT: 'var(--border)',
          focus: 'var(--border-focus)',
        },
        // Semantic colors
        error: 'var(--error)',
        'error-light': 'var(--error-light)',
        warning: 'var(--warning)',
        'warning-light': 'var(--warning-light)',
        success: 'var(--success)',
        'success-light': 'var(--success-light)',
        info: 'var(--info)',
        'info-light': 'var(--info-light)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
        'xl': 'var(--spacing-xl)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        'xs': ['var(--text-xs)', { lineHeight: 'var(--leading-xs)' }],
        'sm': ['var(--text-sm)', { lineHeight: 'var(--leading-sm)' }],
        'base': ['var(--text-base)', { lineHeight: 'var(--leading-base)' }],
        'lg': ['var(--text-lg)', { lineHeight: 'var(--leading-lg)' }],
        'xl': ['var(--text-xl)', { lineHeight: 'var(--leading-xl)' }],
        '2xl': ['var(--text-2xl)', { lineHeight: 'var(--leading-2xl)' }],
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        DEFAULT: 'var(--transition-duration)',
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--transition-timing)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-from-top': {
          '0%': { transform: 'translateY(-0.5rem)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'in': 'fade-in 0.2s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
