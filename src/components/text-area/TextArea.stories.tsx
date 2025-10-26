import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

/**
 * TextArea component description.
 *
 * ## Usage
 *
 * Add usage guidelines here.
 *
 * ## Accessibility
 *
 * - Keyboard navigable
 * - Screen reader friendly
 * - WCAG 2.2 AA compliant
 */
const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default TextArea
 */
export const Default: Story = {
  args: {
    children: 'TextArea content',
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    children: 'TextArea content',
    disabled: true,
  },
};
