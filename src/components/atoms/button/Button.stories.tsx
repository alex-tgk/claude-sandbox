import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

/**
 * Button component for user interactions.
 *
 * ## Usage
 *
 * Buttons are used to trigger actions. They come in multiple variants and sizes
 * to support different use cases and hierarchies.
 *
 * ## Accessibility
 *
 * - Keyboard navigable with Tab
 * - Activatable with Enter or Space
 * - Clear focus indicators
 * - Disabled state prevents interaction
 * - Loading state communicated via ARIA
 */
const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Whether button takes full width',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default primary button with medium size
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

/**
 * All button variants displayed together
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

/**
 * All button sizes displayed together
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * Button with a loading spinner
 */
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading...',
  },
};

/**
 * Disabled button state
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

/**
 * Full width button
 */
export const FullWidth: Story = {
  args: {
    isFullWidth: true,
    children: 'Full Width Button',
  },
};

/**
 * Button with start icon
 */
export const WithStartIcon: Story = {
  args: {
    startIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 3V13M3 8H13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    children: 'Add Item',
  },
};

/**
 * Button with end icon
 */
export const WithEndIcon: Story = {
  args: {
    endIcon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 3L11 8L6 13"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    children: 'Next',
  },
};

/**
 * All variants in different sizes
 */
export const AllCombinations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Small</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">
            Primary
          </Button>
          <Button variant="secondary" size="sm">
            Secondary
          </Button>
          <Button variant="outline" size="sm">
            Outline
          </Button>
          <Button variant="ghost" size="sm">
            Ghost
          </Button>
          <Button variant="danger" size="sm">
            Danger
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Medium</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="md">
            Primary
          </Button>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="outline" size="md">
            Outline
          </Button>
          <Button variant="ghost" size="md">
            Ghost
          </Button>
          <Button variant="danger" size="md">
            Danger
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Large</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="lg">
            Primary
          </Button>
          <Button variant="secondary" size="lg">
            Secondary
          </Button>
          <Button variant="outline" size="lg">
            Outline
          </Button>
          <Button variant="ghost" size="lg">
            Ghost
          </Button>
          <Button variant="danger" size="lg">
            Danger
          </Button>
        </div>
      </div>
    </div>
  ),
};

/**
 * Interactive button states
 */
export const InteractiveStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button>Normal</Button>
        <Button disabled>Disabled</Button>
        <Button isLoading>Loading</Button>
      </div>
      <div className="flex gap-4">
        <Button variant="secondary">Normal</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
        <Button variant="secondary" isLoading>
          Loading
        </Button>
      </div>
      <div className="flex gap-4">
        <Button variant="outline">Normal</Button>
        <Button variant="outline" disabled>
          Disabled
        </Button>
        <Button variant="outline" isLoading>
          Loading
        </Button>
      </div>
    </div>
  ),
};
