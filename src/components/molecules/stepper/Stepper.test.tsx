import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stepper } from './Stepper';

describe('Stepper', () => {
  it('renders provided steps', () => {
    render(
      <Stepper
        steps={[
          { label: 'One' },
          { label: 'Two' },
        ]}
        currentStep={0}
      />
    );

    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
  });

  it('marks steps as complete based on currentStep', () => {
    render(
      <Stepper
        steps={[
          { label: 'One' },
          { label: 'Two' },
        ]}
        currentStep={1}
      />
    );

    expect(screen.getByLabelText('One status complete')).toBeInTheDocument();
  });

  it('applies status-driven text colors', () => {
    render(
      <Stepper
        steps={[
          { label: 'One' },
          { label: 'Two' },
        ]}
        currentStep={1}
      />
    );

    expect(screen.getByLabelText('One status complete')).toHaveClass('text-text-on-color');
    expect(screen.getByLabelText('Two status current')).toHaveClass('text-interactive');
  });
});
