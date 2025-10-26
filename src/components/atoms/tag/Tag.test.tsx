import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders tag content', () => {
    render(<Tag>Example</Tag>);
    expect(screen.getByText('Example')).toBeInTheDocument();
  });

  it('calls onRemove when removable tag remove button clicked', async () => {
    const handleRemove = vi.fn();
    render(
      <Tag removable onRemove={handleRemove}>
        Removable
      </Tag>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Remove tag' }));

    expect(handleRemove).toHaveBeenCalled();
  });
});
