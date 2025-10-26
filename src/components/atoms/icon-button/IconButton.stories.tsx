import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Settings',
    children: '*',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconButton ariaLabel="Solid" variant="solid">
        *
      </IconButton>
      <IconButton ariaLabel="Ghost" variant="ghost">
        o
      </IconButton>
    </div>
  ),
};
