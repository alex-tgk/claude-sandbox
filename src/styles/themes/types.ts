/**
 * Theme Type Definitions
 * IBM Carbon Design System Inspired
 *
 * @remarks
 * - Comprehensive type safety for all theme tokens
 * - Supports light and dark mode variants
 * - Extensible for custom themes
 *
 * @since 0.1.0
 */

export interface ColorScale {
  10: string;
  20: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  80: string;
  90: string;
  100: string;
}

export interface LayerColors {
  '01': string;
  '02': string;
  '03': string;
  'accent-01': string;
}

export interface FieldColors {
  '01': string;
  '02': string;
}

export interface SurfaceColors {
  DEFAULT: string;
  muted: string;
  hover: string;
  active: string;
}

export interface TextColors {
  primary: string;
  secondary: string;
  placeholder: string;
  onColor: string;
  helper: string;
  error: string;
  inverse: string;
}

export interface BorderColors {
  subtle: string;
  strong: string;
  inverse: string;
  interactive: string;
  focus: string;
}

export interface InteractiveColors {
  DEFAULT: string;
  hover: string;
  active: string;
}

export interface SemanticColors {
  error: string;
  errorLight: string;
  warning: string;
  warningLight: string;
  success: string;
  successLight: string;
  info: string;
  infoLight: string;
}

export interface ThemeColors {
  brand: ColorScale;
  layer: LayerColors;
  field: FieldColors;
  surface: SurfaceColors;
  text: TextColors;
  border: BorderColors;
  interactive: InteractiveColors;
  semantic: SemanticColors;
}

export interface SpacingScale {
  '01': string;
  '02': string;
  '03': string;
  '04': string;
  '05': string;
  '06': string;
  '07': string;
  '08': string;
  '09': string;
  '10': string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface BorderRadius {
  none: string;
  sm: string;
  DEFAULT: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Typography {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  lineHeight: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

export interface Effects {
  shadows: {
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    xl: string;
  };
  transitions: {
    duration: string;
    timing: string;
  };
  focus: {
    ring: string;
    ringOffset: string;
  };
}

export interface ThemeMode {
  colors: ThemeColors;
  spacing: SpacingScale;
  borderRadius: BorderRadius;
  typography: Typography;
  effects: Effects;
}

export interface Theme {
  name: string;
  displayName: string;
  description: string;
  light: ThemeMode;
  dark: ThemeMode;
}

export type ThemeName = 'midnight' | 'ocean' | 'forest' | 'sunset' | 'minimal';

export interface ThemeConfig {
  defaultTheme: ThemeName;
  themes: Record<ThemeName, Theme>;
}
