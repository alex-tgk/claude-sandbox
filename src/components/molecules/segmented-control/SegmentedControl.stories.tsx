import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'View toggle',
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('list');
    return (
      <SegmentedControl
        value={value}
        onChange={setValue}
        options={[
          { label: 'List', value: 'list' },
          { label: 'Board', value: 'board' },
          { label: 'Calendar', value: 'calendar' },
        ]}
        ariaLabel="View toggle"
      />
    );
  },
};
