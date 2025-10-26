import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OnboardingChecklist } from './OnboardingChecklist';

describe('OnboardingChecklist', () => {
  const items = [
    { id: 'profile', title: 'Complete profile', completed: true },
    { id: 'invite', title: 'Invite teammates', completed: false, badge: '3 min' },
    { id: 'billing', title: 'Set up billing', completed: true },
  ];

  it('renders heading, items, and progress summary', () => {
    render(
      <OnboardingChecklist
        heading="Finish your setup"
        subheading="Do these in order"
        items={items}
      />
    );

    expect(screen.getByText('Finish your setup')).toBeInTheDocument();
    expect(screen.getByText('Do these in order')).toBeInTheDocument();
    expect(screen.getByText('Complete profile')).toBeInTheDocument();
    expect(screen.getByText('Invite teammates')).toBeInTheDocument();
    expect(screen.getByText('Set up billing')).toBeInTheDocument();

    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '67');
    expect(screen.getByText('67% complete')).toBeInTheDocument();
    expect(screen.getByText('2 / 3 complete')).toBeInTheDocument();
  });

  it('renders empty placeholder when no checklist items are provided', () => {
    render(<OnboardingChecklist items={[]} heading="Checklist" />);

    expect(
      screen.getByText(/Add checklist items to guide customers through onboarding moments/i)
    ).toBeInTheDocument();
  });
});
