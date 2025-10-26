import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('displays label and value', () => {
    render(<StatCard label="Signups" value="1,200" />);
    expect(screen.getByText('Signups')).toBeInTheDocument();
    expect(screen.getByText('1,200')).toBeInTheDocument();
  });

  it('shows delta text when provided', () => {
    render(<StatCard label="Retention" value="92%" delta="+2%" trend="up" />);
    expect(screen.getByText('+2%')).toBeInTheDocument();
  });
});
