import type { Meta, StoryObj } from '@storybook/react';
import { StatCard } from './StatCard';

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  args: {
    label: 'Monthly active users',
    value: '12,394',
    delta: '+12% vs last month',
    trend: 'up',
    helperText: 'Updated 5 minutes ago',
  },
  argTypes: {
    trend: {
      control: 'inline-radio',
      options: ['up', 'down', 'neutral'],
    },
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Grid: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Revenue" value="$240K" delta="+5%" trend="up" />
      <StatCard label="Churn" value="3.4%" delta="+0.4%" trend="down" />
      <StatCard label="NPS" value="62" helperText="Stable" trend="neutral" />
    </div>
  ),
};
