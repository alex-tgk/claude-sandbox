import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: {
    name: 'Ada Lovelace',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away', undefined],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="xs" name="Small" />
      <Avatar size="sm" name="Medium" />
      <Avatar size="md" name="Large" />
      <Avatar size="lg" name="XL" />
    </div>
  ),
};
