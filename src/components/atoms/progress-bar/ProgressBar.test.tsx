import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('shows value percentage', () => {
    render(<ProgressBar value={30} label="Upload" />);
    expect(screen.getByText('30%')).toBeInTheDocument();
  });

  it('sets aria attributes for determinate progress', () => {
    render(<ProgressBar value={75} label="Progress" />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '75');
  });
});
