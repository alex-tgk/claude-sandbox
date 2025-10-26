import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { NotificationToast } from './NotificationToast';

describe('NotificationToast', () => {
  it('renders title and description', () => {
    render(<NotificationToast title="Saved" description="Draft saved" />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Draft saved')).toBeInTheDocument();
  });

  it('calls dismiss handler when close clicked', async () => {
    const handleDismiss = vi.fn();
    const user = userEvent.setup();
    render(
      <NotificationToast title="Test" dismissible onDismiss={handleDismiss} />
    );

    await user.click(screen.getByRole('button', { name: 'Dismiss notification' }));

    expect(handleDismiss).toHaveBeenCalled();
  });
});
