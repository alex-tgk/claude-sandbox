import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { OpportunityRadar, type OpportunityRadarItem } from './OpportunityRadar';

describe('OpportunityRadar', () => {
  const baseItems: OpportunityRadarItem[] = [
    { id: '1', label: 'Improve onboarding', impact: 'high', confidence: 0.8 },
    { id: '2', label: 'Self-serve billing', impact: 'medium', confidence: 0.6 },
    { id: '3', label: 'Automation recipes', impact: 'low', confidence: 0.4 },
    { id: '4', label: 'Risk review', impact: 'high', confidence: 0.3 },
    { id: '5', label: 'Data warehouse', impact: 'medium', confidence: 0.9 },
    { id: '6', label: 'Mobile parity', impact: 'low', confidence: 0.5 },
    { id: '7', label: 'AI copilot', impact: 'high', confidence: 1 },
  ];

  it('caps rendered opportunities to six items and shows derived completion', () => {
    render(
      <OpportunityRadar
        title="Growth opportunities"
        items={baseItems}
        primaryAction={<button>View roadmap</button>}
      />
    );

    const opportunities = screen.getAllByRole('listitem');
    expect(opportunities).toHaveLength(6);
    expect(screen.getByText(/64% validated confidence/i)).toBeInTheDocument();
  });

  it('renders empty state when no opportunities exist', () => {
    render(<OpportunityRadar title="Empty" items={[]} />);
    expect(screen.getByText(/Add opportunity signals/i)).toBeInTheDocument();
  });
});
