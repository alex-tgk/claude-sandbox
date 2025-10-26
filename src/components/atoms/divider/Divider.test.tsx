import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal separator by default', () => {
    render(<Divider data-testid="divider" />);
    const divider = screen.getByTestId('divider');
    expect(divider).toHaveAttribute('role', 'separator');
    expect(divider).not.toHaveAttribute('aria-orientation');
  });

  it('renders vertical orientation when specified', () => {
    render(<Divider orientation="vertical" data-testid="divider" />);
    expect(screen.getByTestId('divider')).toHaveAttribute('aria-orientation', 'vertical');
  });
});
