import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

/**
 * The Spinner component provides a visual loading indicator with multiple variants and customization options.
 *
 * ## Features
 *
 * - **Three visual variants**: circular (spinning circle), dots (bouncing dots), bars (pulsing bars)
 * - **Four sizes**: xs, sm, md, lg
 * - **Color variants**: primary, secondary, success, warning, error, inherit
 * - **Speed control**: slow, normal, fast
 * - **Accessibility**: Full ARIA support with customizable labels
 * - **Positioning**: Optional center positioning within container
 *
 * ## Usage
 *
 * Use spinners to indicate loading states, data fetching, or ongoing processes.
 * Choose the variant that best fits your design:
 * - **Circular**: Classic spinning loader, best for general loading states
 * - **Dots**: Playful bouncing dots, good for content loading
 * - **Bars**: Clean pulsing bars, ideal for progress indication
 *
 * ## Accessibility
 *
 * - Uses `role="status"` for screen reader announcements
 * - Includes `aria-live="polite"` for non-intrusive updates
 * - Provides customizable labels via `label` prop
 * - Visual elements are hidden from screen readers with `aria-hidden`
 * - WCAG 2.2 AA compliant
 */
const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'dots', 'bars'],
      description: 'Visual style of the spinner',
      table: {
        defaultValue: { summary: 'circular' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the spinner',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'inherit'],
      description: 'Color variant matching theme',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    speed: {
      control: 'select',
      options: ['slow', 'normal', 'fast'],
      description: 'Animation speed',
      table: {
        defaultValue: { summary: 'normal' },
      },
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
      table: {
        defaultValue: { summary: 'Loading...' },
      },
    },
    center: {
      control: 'boolean',
      description: 'Center spinner in container',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default spinner with circular variant
 */
export const Default: Story = {
  args: {},
};

/**
 * All three spinner variants
 */
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="circular" />
        <span className="text-sm text-text-secondary">Circular</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="dots" />
        <span className="text-sm text-text-secondary">Dots</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" />
        <span className="text-sm text-text-secondary">Bars</span>
      </div>
    </div>
  ),
};

/**
 * All available sizes from extra small to large
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xs" />
        <span className="text-xs text-text-secondary">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-xs text-text-secondary">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="md" />
        <span className="text-xs text-text-secondary">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-xs text-text-secondary">LG</span>
      </div>
    </div>
  ),
};

/**
 * Different color variants matching the theme
 */
export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="primary" />
        <span className="text-xs text-text-secondary">Primary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="secondary" />
        <span className="text-xs text-text-secondary">Secondary</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span className="text-xs text-text-secondary">Success</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="warning" />
        <span className="text-xs text-text-secondary">Warning</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="error" />
        <span className="text-xs text-text-secondary">Error</span>
      </div>
    </div>
  ),
};

/**
 * Animation speed variations
 */
export const Speeds: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="slow" />
        <span className="text-xs text-text-secondary">Slow</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="normal" />
        <span className="text-xs text-text-secondary">Normal</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner speed="fast" />
        <span className="text-xs text-text-secondary">Fast</span>
      </div>
    </div>
  ),
};

/**
 * Dots variant in different sizes
 */
export const DotsVariant: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="dots" size="xs" />
        <span className="text-xs text-text-secondary">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="dots" size="sm" />
        <span className="text-xs text-text-secondary">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="dots" size="md" />
        <span className="text-xs text-text-secondary">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="dots" size="lg" />
        <span className="text-xs text-text-secondary">LG</span>
      </div>
    </div>
  ),
};

/**
 * Bars variant in different sizes
 */
export const BarsVariant: Story = {
  render: () => (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" size="xs" />
        <span className="text-xs text-text-secondary">XS</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" size="sm" />
        <span className="text-xs text-text-secondary">SM</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" size="md" />
        <span className="text-xs text-text-secondary">MD</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner variant="bars" size="lg" />
        <span className="text-xs text-text-secondary">LG</span>
      </div>
    </div>
  ),
};

/**
 * Centered spinner - useful for full-page loading states
 */
export const Centered: Story = {
  render: () => (
    <div className="relative h-64 rounded-lg border-2 border-dashed border-border bg-surface-muted">
      <Spinner center size="lg" />
    </div>
  ),
};

/**
 * Custom label for screen readers
 */
export const CustomLabel: Story = {
  args: {
    label: 'Fetching user data...',
  },
};

/**
 * Loading button example
 */
export const LoadingButton: Story = {
  render: () => (
    <button
      className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700"
      disabled
    >
      <Spinner size="sm" color="inherit" />
      Loading...
    </button>
  ),
};

/**
 * Inline with text
 */
export const InlineWithText: Story = {
  render: () => (
    <div className="flex items-center gap-2 text-text">
      <Spinner size="sm" />
      <span>Loading data...</span>
    </div>
  ),
};

/**
 * Card loading state
 */
export const CardLoading: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-border bg-surface p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text">User Profile</h3>
        <Spinner size="sm" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-4 animate-pulse rounded bg-surface-muted" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-surface-muted" />
      </div>
    </div>
  ),
};

/**
 * Full-page overlay loading
 */
export const OverlayLoading: Story = {
  render: () => (
    <div className="relative h-96 rounded-lg bg-surface">
      <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-text-secondary">Processing your request...</p>
        </div>
      </div>
    </div>
  ),
};

/**
 * Different variants with colors
 */
export const VariantsWithColors: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Circular</h4>
        <div className="flex items-center gap-4">
          <Spinner variant="circular" color="primary" />
          <Spinner variant="circular" color="success" />
          <Spinner variant="circular" color="warning" />
          <Spinner variant="circular" color="error" />
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Dots</h4>
        <div className="flex items-center gap-4">
          <Spinner variant="dots" color="primary" />
          <Spinner variant="dots" color="success" />
          <Spinner variant="dots" color="warning" />
          <Spinner variant="dots" color="error" />
        </div>
      </div>
      <div>
        <h4 className="mb-3 text-sm font-medium text-text">Bars</h4>
        <div className="flex items-center gap-4">
          <Spinner variant="bars" color="primary" />
          <Spinner variant="bars" color="success" />
          <Spinner variant="bars" color="warning" />
          <Spinner variant="bars" color="error" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Large centered spinner for page loading
 */
export const PageLoading: Story = {
  render: () => (
    <div className="relative h-screen max-h-96 rounded-lg bg-gradient-to-br from-surface to-surface-muted">
      <Spinner center size="lg" color="primary" />
    </div>
  ),
};
