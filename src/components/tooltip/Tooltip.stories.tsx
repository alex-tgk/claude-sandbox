import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../button/Button';

/**
 * Tooltip component displays contextual information when hovering or focusing on an element.
 *
 * ## Features
 *
 * - **Four placements**: top, bottom, left, right with automatic viewport-aware flipping
 * - **Hover and focus triggers**: Works with mouse and keyboard
 * - **Configurable delays**: Control show/hide timing
 * - **Arrow indicator**: Visual pointer to the trigger element
 * - **Keyboard accessible**: Escape key to close
 * - **ARIA support**: Proper describedby relationships
 * - **Max-width constraint**: Prevents overly wide tooltips
 * - **SSR-safe**: Uses portal for proper rendering
 *
 * ## Usage
 *
 * Wrap any element with the Tooltip component and provide content:
 *
 * ```tsx
 * <Tooltip content="This is helpful information">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 *
 * ## Accessibility
 *
 * - Keyboard navigable (shows on focus, closes on Escape)
 * - Screen reader friendly with ARIA describedby
 * - WCAG 2.2 AA compliant
 * - Works with any focusable element
 */
const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content to display in the tooltip',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to trigger',
    },
    showDelay: {
      control: 'number',
      description: 'Delay before showing tooltip (ms)',
    },
    hideDelay: {
      control: 'number',
      description: 'Delay before hiding tooltip (ms)',
    },
    offset: {
      control: 'number',
      description: 'Distance from trigger element (px)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the tooltip',
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of tooltip',
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-[300px] flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tooltip with standard configuration.
 */
export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip positioned at the top of the trigger element.
 */
export const Top: Story = {
  args: {
    content: 'Tooltip on top',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Top Tooltip</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip positioned at the bottom of the trigger element.
 */
export const Bottom: Story = {
  args: {
    content: 'Tooltip on bottom',
    placement: 'bottom',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Bottom Tooltip</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip positioned to the left of the trigger element.
 */
export const Left: Story = {
  args: {
    content: 'Tooltip on left',
    placement: 'left',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Left Tooltip</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip positioned to the right of the trigger element.
 */
export const Right: Story = {
  args: {
    content: 'Tooltip on right',
    placement: 'right',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Right Tooltip</Button>
    </Tooltip>
  ),
};

/**
 * All four placement options demonstrated together.
 */
export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <Tooltip content="Tooltip on top" placement="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip on bottom" placement="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip on left" placement="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Tooltip on right" placement="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

/**
 * Tooltip with longer content that wraps within the max-width constraint.
 */
export const LongContent: Story = {
  args: {
    content:
      'This is a much longer tooltip with more detailed information that will wrap to multiple lines within the max-width constraint.',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover for long content</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip with custom maximum width.
 */
export const CustomMaxWidth: Story = {
  args: {
    content: 'This tooltip has a custom maximum width of 200px instead of the default 320px.',
    maxWidth: '200px',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Custom width</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip with a longer delay before showing (500ms).
 */
export const WithShowDelay: Story = {
  args: {
    content: 'This tooltip appears after a 500ms delay',
    showDelay: 500,
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover with delay</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip with a delay before hiding (300ms).
 */
export const WithHideDelay: Story = {
  args: {
    content: 'This tooltip stays visible for 300ms after you stop hovering',
    hideDelay: 300,
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip that is disabled and won't show.
 */
export const Disabled: Story = {
  args: {
    content: "You won't see this",
    disabled: true,
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Disabled tooltip</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip with custom offset (larger distance from trigger).
 */
export const CustomOffset: Story = {
  args: {
    content: 'This tooltip is 20px away from the trigger',
    offset: 20,
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Custom offset</Button>
    </Tooltip>
  ),
};

/**
 * Tooltip with custom styling using className.
 */
export const CustomStyling: Story = {
  args: {
    content: 'Custom purple tooltip',
    className: 'bg-purple-600 text-white',
    arrowClassName: 'bg-purple-600',
    placement: 'top',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Custom styled</Button>
    </Tooltip>
  ),
};

/**
 * Tooltips on different button variants.
 */
export const WithButtonVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Primary button tooltip" placement="top">
        <Button variant="primary">Primary</Button>
      </Tooltip>
      <Tooltip content="Secondary button tooltip" placement="top">
        <Button variant="secondary">Secondary</Button>
      </Tooltip>
      <Tooltip content="Outline button tooltip" placement="top">
        <Button variant="outline">Outline</Button>
      </Tooltip>
      <Tooltip content="Ghost button tooltip" placement="top">
        <Button variant="ghost">Ghost</Button>
      </Tooltip>
    </div>
  ),
};

/**
 * Tooltip on different interactive elements.
 */
export const WithDifferentElements: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <Tooltip content="Button tooltip" placement="right">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">
          Native Button
        </button>
      </Tooltip>
      <Tooltip content="Link tooltip" placement="right">
        <a href="#example" className="text-blue-600 hover:underline">
          Anchor Link
        </a>
      </Tooltip>
      <Tooltip content="Input tooltip" placement="right">
        <input
          type="text"
          placeholder="Input field"
          className="px-3 py-2 border rounded"
        />
      </Tooltip>
      <Tooltip content="Icon button tooltip" placement="right">
        <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};

/**
 * Tooltips in a grid layout demonstrating boundary detection.
 */
export const BoundaryDetection: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 w-full">
      <Tooltip content="Top-left corner tooltip" placement="top">
        <Button size="sm">Top Left</Button>
      </Tooltip>
      <Tooltip content="Top-center tooltip" placement="top">
        <Button size="sm">Top Center</Button>
      </Tooltip>
      <Tooltip content="Top-right corner tooltip" placement="top">
        <Button size="sm">Top Right</Button>
      </Tooltip>
      <Tooltip content="Middle-left tooltip" placement="left">
        <Button size="sm">Middle Left</Button>
      </Tooltip>
      <Tooltip content="Center tooltip" placement="top">
        <Button size="sm">Center</Button>
      </Tooltip>
      <Tooltip content="Middle-right tooltip" placement="right">
        <Button size="sm">Middle Right</Button>
      </Tooltip>
      <Tooltip content="Bottom-left corner tooltip" placement="bottom">
        <Button size="sm">Bottom Left</Button>
      </Tooltip>
      <Tooltip content="Bottom-center tooltip" placement="bottom">
        <Button size="sm">Bottom Center</Button>
      </Tooltip>
      <Tooltip content="Bottom-right corner tooltip" placement="bottom">
        <Button size="sm">Bottom Right</Button>
      </Tooltip>
    </div>
  ),
  decorators: [
    (Story) => (
      <div className="min-h-[400px] p-8">
        <Story />
      </div>
    ),
  ],
};

/**
 * Keyboard accessibility demonstration.
 * Tab through the buttons to see tooltips on focus.
 */
export const KeyboardAccessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-start">
      <p className="text-sm text-gray-600 mb-2">
        Press Tab to navigate through buttons. Tooltips will appear on focus.
        Press Escape to close.
      </p>
      <Tooltip content="First button - Press Escape to close" placement="right">
        <Button>First Button</Button>
      </Tooltip>
      <Tooltip content="Second button - Tab to navigate" placement="right">
        <Button>Second Button</Button>
      </Tooltip>
      <Tooltip content="Third button - Fully keyboard accessible" placement="right">
        <Button>Third Button</Button>
      </Tooltip>
    </div>
  ),
};

/**
 * Interactive playground for testing different configurations.
 */
export const Playground: Story = {
  args: {
    content: 'Customize this tooltip using the controls below',
    placement: 'top',
    showDelay: 200,
    hideDelay: 0,
    offset: 8,
    disabled: false,
    maxWidth: '320px',
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button>Interactive Tooltip</Button>
    </Tooltip>
  ),
};
