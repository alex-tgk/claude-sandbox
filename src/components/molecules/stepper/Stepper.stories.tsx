import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const sampleSteps = [
  { label: 'Create workspace', description: 'Name and describe your space' },
  { label: 'Invite teammates', description: 'Send email invites' },
  { label: 'Connect data', description: 'Add integrations' },
];

const meta = {
  title: 'Molecules/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: {
    steps: sampleSteps,
    currentStep: 1,
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};
