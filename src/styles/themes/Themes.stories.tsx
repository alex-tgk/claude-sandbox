/**
 * Theme System Stories
 * Showcases all available themes and the ThemeSwitcher component
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from './ThemeProvider';
import { ThemeSwitcher } from './ThemeSwitcher';
import { Button } from '../../components/atoms/button/Button';
import { Input } from '../../components/atoms/input/Input';
import { Badge } from '../../components/atoms/badge/Badge';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Themes/Theme System',
  component: ThemeProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Complete theme system with 5 pre-built themes, each with light and dark mode variants. All themes follow IBM Carbon Design System principles.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

/**
 * Showcase component that displays theme colors and components
 */
function ThemeShowcase() {
  return (
    <div className="space-y-8">
      {/* Theme Switcher */}
      <div className="border-2 border-border-subtle p-6 bg-layer-02">
        <h2 className="text-2xl font-bold mb-4 text-text-primary">
          Theme Controls
        </h2>
        <ThemeSwitcher showDescriptions />
      </div>

      {/* Color Palette */}
      <div className="border-2 border-border-subtle p-6 bg-layer-02">
        <h2 className="text-2xl font-bold mb-4 text-text-primary">
          Color Palette
        </h2>

        {/* Brand Colors */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-text-secondary">
            Brand Scale
          </h3>
          <div className="grid grid-cols-10 gap-2">
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((shade) => (
              <div key={shade} className="text-center">
                <div
                  className={`h-16 border border-border-subtle`}
                  style={{ backgroundColor: `var(--brand-${shade})` }}
                />
                <p className="text-xs mt-1 text-text-helper">{shade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-text-secondary">
            Semantic Colors
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="h-16 bg-error border border-border-subtle" />
              <p className="text-xs mt-1 text-text-helper">Error</p>
            </div>
            <div>
              <div className="h-16 bg-warning border border-border-subtle" />
              <p className="text-xs mt-1 text-text-helper">Warning</p>
            </div>
            <div>
              <div className="h-16 bg-success border border-border-subtle" />
              <p className="text-xs mt-1 text-text-helper">Success</p>
            </div>
            <div>
              <div className="h-16 bg-info border border-border-subtle" />
              <p className="text-xs mt-1 text-text-helper">Info</p>
            </div>
          </div>
        </div>

        {/* Layer Colors */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-text-secondary">
            Layer Hierarchy
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="h-16 bg-layer-01 border border-border-subtle" />
              <p className="text-xs mt-1 text-text-helper">Layer 01</p>
            </div>
            <div>
              <div className="h-16 bg-layer-02 border border-border-subtle" />
              <p className="text-xs mt-1 text-text-helper">Layer 02</p>
            </div>
            <div>
              <div className="h-16 bg-layer-03 border border-border-subtle" />
              <p className="text-xs mt-1 text-text-helper">Layer 03</p>
            </div>
            <div>
              <div className="h-16 bg-layer-accent-01 border border-border-subtle" />
              <p className="text-xs mt-1 text-text-helper">Accent 01</p>
            </div>
          </div>
        </div>
      </div>

      {/* Component Examples */}
      <div className="border-2 border-border-subtle p-6 bg-layer-02">
        <h2 className="text-2xl font-bold mb-4 text-text-primary">
          Components in Current Theme
        </h2>

        <div className="space-y-6">
          {/* Buttons */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-text-secondary">
              Buttons
            </h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          {/* Inputs */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-text-secondary">
              Inputs
            </h3>
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <Input placeholder="Default input" />
              <Input placeholder="With error" error="Error message" />
            </div>
          </div>

          {/* Badges */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-text-secondary">
              Badges
            </h3>
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-text-secondary">
              Typography
            </h3>
            <div className="space-y-2">
              <p className="text-2xl text-text-primary">
                Heading 1 - 2xl (24px)
              </p>
              <p className="text-xl text-text-primary">
                Heading 2 - xl (20px)
              </p>
              <p className="text-lg text-text-primary">
                Heading 3 - lg (18px)
              </p>
              <p className="text-base text-text-primary">
                Body - base (16px)
              </p>
              <p className="text-sm text-text-secondary">
                Small text - sm (14px)
              </p>
              <p className="text-xs text-text-helper">
                Helper text - xs (12px)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive theme switcher with live preview
 */
export const Interactive: Story = {
  render: () => (
    <ThemeProvider defaultTheme="midnight" followSystem={false}>
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Theme System Demo
            </h1>
            <p className="text-text-secondary">
              Switch between themes and modes to see the design system in
              action
            </p>
          </div>
          <ThemeShowcase />
        </div>
      </div>
    </ThemeProvider>
  ),
};

/**
 * Midnight theme (default)
 */
export const Midnight: Story = {
  render: () => (
    <ThemeProvider defaultTheme="midnight" defaultMode="light" followSystem={false}>
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Midnight Theme
            </h1>
            <p className="text-text-secondary">
              Dark professional theme with IBM Blue accents
            </p>
          </div>
          <ThemeShowcase />
        </div>
      </div>
    </ThemeProvider>
  ),
};

/**
 * Ocean theme
 */
export const Ocean: Story = {
  render: () => (
    <ThemeProvider defaultTheme="ocean" defaultMode="light" followSystem={false}>
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Ocean Theme
            </h1>
            <p className="text-text-secondary">
              Blue-based calming theme with teal accents
            </p>
          </div>
          <ThemeShowcase />
        </div>
      </div>
    </ThemeProvider>
  ),
};

/**
 * Forest theme
 */
export const Forest: Story = {
  render: () => (
    <ThemeProvider defaultTheme="forest" defaultMode="light" followSystem={false}>
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Forest Theme
            </h1>
            <p className="text-text-secondary">
              Green-based natural theme with emerald accents
            </p>
          </div>
          <ThemeShowcase />
        </div>
      </div>
    </ThemeProvider>
  ),
};

/**
 * Sunset theme
 */
export const Sunset: Story = {
  render: () => (
    <ThemeProvider defaultTheme="sunset" defaultMode="light" followSystem={false}>
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Sunset Theme
            </h1>
            <p className="text-text-secondary">
              Warm orange/red theme with amber accents
            </p>
          </div>
          <ThemeShowcase />
        </div>
      </div>
    </ThemeProvider>
  ),
};

/**
 * Minimal theme
 */
export const Minimal: Story = {
  render: () => (
    <ThemeProvider defaultTheme="minimal" defaultMode="light" followSystem={false}>
      <div className="min-h-screen bg-surface p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Minimal Theme
            </h1>
            <p className="text-text-secondary">
              Ultra-clean monochrome theme
            </p>
          </div>
          <ThemeShowcase />
        </div>
      </div>
    </ThemeProvider>
  ),
};
