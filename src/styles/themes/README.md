# Theme System

Pre-built theme variants for the modular UI library with dynamic switching capabilities.

## Overview

The theme system provides 5 production-ready themes, each with light and dark mode variants. All themes follow IBM Carbon Design System principles with sharp corners, WCAG 2.2 AA compliant contrast ratios, and comprehensive design token coverage.

## Available Themes

### 1. Midnight (Default)
**Dark professional theme with IBM Blue accents**

- **Use Cases**: Developer tools, enterprise applications, technical products
- **Aesthetic**: Professional, technical, minimal
- **Primary Color**: IBM Blue (#0f62fe)
- **Best For**: Code editors, admin panels, dashboards

### 2. Ocean
**Blue-based calming theme with teal accents**

- **Use Cases**: Healthcare, finance, productivity applications
- **Aesthetic**: Calming, trustworthy, professional
- **Primary Color**: Ocean Blue (#0284c7)
- **Best For**: Medical software, financial apps, task managers

### 3. Forest
**Green-based natural theme with emerald accents**

- **Use Cases**: Environmental, sustainability, wellness applications
- **Aesthetic**: Natural, eco-friendly, growth-oriented
- **Primary Color**: Forest Green (#059669)
- **Best For**: Eco apps, health & fitness, sustainability tools

### 4. Sunset
**Warm orange/red theme with amber accents**

- **Use Cases**: Creative, social, entertainment applications
- **Aesthetic**: Warm, energetic, inviting
- **Primary Color**: Sunset Orange (#ea580c)
- **Best For**: Social media, creative tools, entertainment platforms

### 5. Minimal
**Ultra-clean monochrome theme**

- **Use Cases**: Content-focused, documentation, editorial applications
- **Aesthetic**: Minimal, clean, focused
- **Primary Color**: Minimal Gray (#374151)
- **Best For**: Documentation sites, blogs, reading apps

## Installation & Usage

### Basic Setup

```tsx
import { ThemeProvider } from '@/styles/themes';

function App() {
  return (
    <ThemeProvider defaultTheme="ocean" defaultMode="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using the Theme Hook

```tsx
import { useTheme } from '@/styles/themes';

function ThemeControls() {
  const { themeName, setTheme, mode, toggleMode, availableThemes } = useTheme();

  return (
    <div>
      <p>Current theme: {themeName}</p>

      {/* Theme switcher */}
      {availableThemes.map(theme => (
        <button
          key={theme.name}
          onClick={() => setTheme(theme.name)}
        >
          {theme.displayName}
        </button>
      ))}

      {/* Mode toggle */}
      <button onClick={toggleMode}>
        {mode === 'light' ? 'Switch to Dark' : 'Switch to Light'}
      </button>
    </div>
  );
}
```

### Using the ThemeSwitcher Component

```tsx
import { ThemeSwitcher } from '@/styles/themes/ThemeSwitcher';

function SettingsPage() {
  return (
    <div>
      <h1>Theme Settings</h1>
      <ThemeSwitcher showDescriptions orientation="vertical" />
    </div>
  );
}
```

## Theme Structure

Each theme includes:

### Colors
- **Brand Scale**: 10 shades (10-100) for primary brand color
- **Layer Colors**: Surface hierarchy (01, 02, 03, accent-01)
- **Field Colors**: Form input backgrounds
- **Surface Colors**: General backgrounds
- **Text Colors**: Primary, secondary, placeholder, helper, error, inverse
- **Border Colors**: Subtle, strong, inverse, interactive, focus
- **Interactive Colors**: Default, hover, active states
- **Semantic Colors**: Error, warning, success, info (with light variants)

### Spacing
- **Carbon Scale**: 01-10 (2px to 64px)
- **Legacy Scale**: xs, sm, md, lg, xl

### Typography
- **Font Families**: IBM Plex Sans, IBM Plex Mono
- **Font Sizes**: xs (12px) to 2xl (24px)
- **Line Heights**: Matched to font sizes
- **Letter Spacing**: Tight, normal, wide

### Effects
- **Shadows**: 5 levels (sm to xl)
- **Transitions**: Duration and timing functions
- **Focus**: Ring styles and offset

### Border Radius
- Sharp corners (0px) following IBM Carbon principles

## API Reference

### ThemeProvider

```tsx
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'midnight' | 'ocean' | 'forest' | 'sunset' | 'minimal';
  defaultMode?: 'light' | 'dark';
  followSystem?: boolean; // Default: true
}
```

### useTheme Hook

```tsx
interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  mode: 'light' | 'dark';
  setTheme: (name: ThemeName) => void;
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  availableThemes: Theme[];
}
```

### Theme Utilities

```typescript
// Convert theme to CSS variables
themeToCSSVariables(theme: ThemeMode): Record<string, string>

// Apply CSS variables to element
applyCSSVariables(element: HTMLElement, variables: Record<string, string>): void

// Apply theme to document
applyTheme(theme: Theme, mode: 'light' | 'dark'): void

// Get system color scheme preference
getSystemColorScheme(): 'light' | 'dark'

// Load theme preference from localStorage
loadThemePreference(): { themeName: string | null; mode: 'light' | 'dark' | null }

// Watch for system color scheme changes
watchSystemColorScheme(callback: (scheme: 'light' | 'dark') => void): () => void
```

## Theme Persistence

Themes are automatically persisted to `localStorage`:

- **Key**: `theme-name` - Current theme name
- **Key**: `theme-mode` - Current mode (light/dark)

The system automatically:
1. Saves preferences when changed
2. Loads preferences on mount
3. Follows system preference if no saved preference exists
4. Watches for system preference changes

## Creating Custom Themes

```typescript
import type { Theme } from '@/styles/themes';

export const customTheme: Theme = {
  name: 'custom',
  displayName: 'Custom Theme',
  description: 'My custom theme',

  light: {
    colors: {
      brand: { /* ... */ },
      layer: { /* ... */ },
      // ... all other properties
    },
    spacing: { /* ... */ },
    borderRadius: { /* ... */ },
    typography: { /* ... */ },
    effects: { /* ... */ },
  },

  dark: {
    // Same structure as light
  },
};
```

## Accessibility

All themes maintain:

- **WCAG 2.2 AA** contrast ratios (minimum 4.5:1 for text)
- **Focus indicators** with 3px offset rings
- **High contrast** borders and interactive elements
- **Semantic colors** for errors, warnings, success, info

## Design Principles

Following IBM Carbon Design System:

1. **Sharp Corners**: 0px border radius for technical aesthetic
2. **8px Grid**: Spacing based on 8px base unit
3. **Color Hierarchy**: Clear layer system for depth
4. **Typography Scale**: IBM Plex fonts with Carbon type scale
5. **Motion**: 150ms transitions with productive easing

## Browser Support

- All modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties required
- localStorage for persistence
- matchMedia API for system preferences

## Examples

See the Storybook stories for live examples:

```bash
npm run storybook
```

Navigate to "Themes" section to see all themes in action with interactive controls.

## License

MIT - Same as the main UI library
