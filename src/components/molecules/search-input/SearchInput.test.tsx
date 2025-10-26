import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders input with placeholder', () => {
    render(<SearchInput placeholder="Search docs" value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search docs')).toBeInTheDocument();
  });

  it('calls onClear when clear button clicked', async () => {
    const handleClear = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchInput value="foo" onChange={() => {}} onClear={handleClear} />
    );

    await user.click(screen.getByRole('button', { name: 'Clear search' }));

    expect(handleClear).toHaveBeenCalled();
  });
});
