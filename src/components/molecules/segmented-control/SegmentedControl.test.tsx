import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SegmentedControl } from './SegmentedControl';

describe('SegmentedControl', () => {
  it('invokes onChange when option clicked', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SegmentedControl
        ariaLabel="View"
        options={[
          { label: 'List', value: 'list' },
          { label: 'Board', value: 'board' },
        ]}
        value="list"
        onChange={handleChange}
      />
    );

    await user.click(screen.getByRole('radio', { name: 'Board' }));

    expect(handleChange).toHaveBeenCalledWith('board');
  });
});
