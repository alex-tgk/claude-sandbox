import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
    inset: {
      control: 'inline-radio',
      options: ['none', 'start', 'end'],
    },
    length: {
      control: 'inline-radio',
      options: ['full', 'content'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    length: 'content',
  },
  render: (args) => (
    <div className="flex h-32 items-center space-x-4">
      <span>A</span>
      <Divider {...args} />
      <span>B</span>
    </div>
  ),
};
