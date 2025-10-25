import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v3 configuration for the modular UI system.
 * IBM Carbon Design System Inspired
 *
 * @remarks
 * - Uses CSS variables for theming (white/g10, dark/g100 modes)
 * - Design tokens are defined in src/styles/tokens.css
 * - Zero runtime CSS-in-JS, all utilities are static
 * - Tree-shakable and optimized for production
 * - Sharp corners and IBM Blue color scheme
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}', './example/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand colors - IBM Blue scale
        brand: {
          10: 'var(--brand-10)',
          20: 'var(--brand-20)',
          30: 'var(--brand-30)',
          40: 'var(--brand-40)',
          50: 'var(--brand-50)',
          60: 'var(--brand-60)', // Primary IBM Blue
          70: 'var(--brand-70)',
          80: 'var(--brand-80)',
          90: 'var(--brand-90)',
          100: 'var(--brand-100)',
        },
        // Layer colors - Carbon UI layers
        layer: {
          '01': 'var(--layer-01)',
          '02': 'var(--layer-02)',
          '03': 'var(--layer-03)',
          'accent-01': 'var(--layer-accent-01)',
        },
        // Field colors
        field: {
          '01': 'var(--field-01)',
          '02': 'var(--field-02)',
        },
        // Surface colors (legacy support)
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
          hover: 'var(--surface-hover)',
          active: 'var(--surface-active)',
        },
        // Text colors - Carbon text hierarchy
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-placeholder': 'var(--text-placeholder)',
        'text-on-color': 'var(--text-on-color)',
        'text-helper': 'var(--text-helper)',
        'text-error': 'var(--text-error)',
        'text-inverse': 'var(--text-inverse)',
        // Text colors (legacy support)
        text: {
          DEFAULT: 'var(--text)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
        // Border colors - Carbon borders
        'border-subtle': 'var(--border-subtle)',
        'border-strong': 'var(--border-strong)',
        'border-inverse': 'var(--border-inverse)',
        'border-interactive': 'var(--border-interactive)',
        'border-focus': 'var(--border-focus)',
        // Border (legacy support)
        border: {
          DEFAULT: 'var(--border)',
          focus: 'var(--border-focus)',
        },
        // Interactive colors
        interactive: {
          DEFAULT: 'var(--interactive)',
          hover: 'var(--interactive-hover)',
          active: 'var(--interactive-active)',
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
        '110': '110ms', // Carbon standard transition
      },
      transitionTimingFunction: {
        DEFAULT: 'var(--transition-timing)',
        'productive': 'cubic-bezier(0.2, 0, 0.38, 0.9)', // Carbon productive
        'expressive': 'cubic-bezier(0.4, 0.14, 0.3, 1)', // Carbon expressive
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
