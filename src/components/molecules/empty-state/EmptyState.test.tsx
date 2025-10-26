import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders headline content, description, and actions with polite live region', () => {
    render(
      <EmptyState
        title="No projects yet"
        description="Create your first workspace to get started."
        primaryAction={<button>New project</button>}
        secondaryAction={<button>Invite teammates</button>}
      />
    );

    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByRole('heading', { name: 'No projects yet' })).toBeInTheDocument();
    expect(screen.getByText('Create your first workspace to get started.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New project' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Invite teammates' })).toBeInTheDocument();
  });

  it('renders custom media when provided', () => {
    render(
      <EmptyState
        title="Custom media"
        media={<div data-testid="custom-media">📦</div>}
        description="Media slot"
      />
    );

    expect(screen.getByTestId('custom-media')).toBeInTheDocument();
  });

  it('supports hiding the media slot entirely', () => {
    render(
      <EmptyState
        title="Media hidden"
        media={<div data-testid="custom-media">media</div>}
        hideMedia
      />
    );

    expect(screen.queryByTestId('custom-media')).not.toBeInTheDocument();
  });
});
