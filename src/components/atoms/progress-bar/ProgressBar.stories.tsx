import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  args: {
    value: 42,
    label: 'File upload',
  },
  argTypes: {
    tone: {
      control: 'select',
      options: ['brand', 'success', 'warning', 'danger'],
    },
    indeterminate: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
    showValue: false,
    label: 'Syncing data',
  },
};
