import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders with provided aria label', () => {
    render(<IconButton ariaLabel="Notifications">N</IconButton>);
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    render(
      <IconButton ariaLabel="Primary" variant="solid">
        O
      </IconButton>
    );
    expect(screen.getByLabelText('Primary')).toHaveClass('bg-brand-600');
  });
});
