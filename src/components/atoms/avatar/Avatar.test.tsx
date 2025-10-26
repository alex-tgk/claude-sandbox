import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials when no image provided', () => {
    render(<Avatar name="Grace Hopper" />);
    expect(screen.getByLabelText('Avatar for Grace Hopper')).toBeInTheDocument();
    expect(screen.getByText('GH')).toBeInTheDocument();
  });

  it('renders img when src provided', () => {
    render(<Avatar name="Image" src="https://example.com/avatar.png" />);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.png');
  });
});
