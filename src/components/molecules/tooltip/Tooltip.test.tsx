import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

// Setup portal container before each test
beforeEach(() => {
  // Remove existing portal if any
  const existing = document.getElementById('tooltip-portal');
  if (existing) {
    existing.remove();
  }

  // Create fresh portal container
  const portalContainer = document.createElement('div');
  portalContainer.id = 'tooltip-portal';
  document.body.appendChild(portalContainer);

  // Mock getBoundingClientRect to return non-zero values for positioning
  Element.prototype.getBoundingClientRect = vi.fn(function (this: Element) {
    return {
      width: 100,
      height: 50,
      top: 100,
      left: 100,
      bottom: 150,
      right: 200,
      x: 100,
      y: 100,
      toJSON: () => {},
    } as DOMRect;
  });
});

describe('Tooltip', () => {
  describe('rendering', () => {
    it('renders trigger element', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Trigger</button>
        </Tooltip>
      );
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('does not render tooltip initially', () => {
      render(
        <Tooltip content="Tooltip text">
          <button>Trigger</button>
        </Tooltip>
      );
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('renders tooltip after hover', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));

      await waitFor(
        () => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
      expect(screen.getByRole('tooltip')).toHaveTextContent('Tooltip text');
    });

    it('renders with custom className', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" className="custom-tooltip" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveClass('custom-tooltip');
      });
    });

    it('renders with custom maxWidth', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" maxWidth="500px" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        expect(tooltip).toHaveStyle({ maxWidth: '500px' });
      });
    });
  });

  describe('interactions', () => {
    it('shows tooltip on mouse enter', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('hides tooltip on mouse leave', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0} hideDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');
      await user.hover(trigger);

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.unhover(trigger);

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('shows tooltip on focus', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.tab();

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('hides tooltip on blur', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0} hideDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.tab();

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.tab();

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('closes tooltip on Escape key', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      });
    });

    it('does not show when disabled', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" disabled showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));

      // Wait a bit to ensure it doesn't show
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    });

    it('preserves original event handlers', async () => {
      const user = userEvent.setup();
      const onMouseEnter = vi.fn();
      const onMouseLeave = vi.fn();
      const onFocus = vi.fn();
      const onBlur = vi.fn();

      render(
        <Tooltip content="Tooltip text" showDelay={0} hideDelay={0}>
          <button
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
          >
            Trigger
          </button>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      await user.hover(trigger);
      expect(onMouseEnter).toHaveBeenCalled();

      await user.unhover(trigger);
      expect(onMouseLeave).toHaveBeenCalled();

      await user.tab();
      expect(onFocus).toHaveBeenCalled();

      await user.tab();
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('has role="tooltip"', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
      });
    });

    it('connects trigger and tooltip with aria-describedby', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      const trigger = screen.getByText('Trigger');

      // Before hover, no aria-describedby
      expect(trigger).not.toHaveAttribute('aria-describedby');

      await user.hover(trigger);

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const tooltipId = tooltip.getAttribute('id');
        expect(trigger).toHaveAttribute('aria-describedby', tooltipId);
      });
    });

    it('hides arrow from screen readers', async () => {
      const user = userEvent.setup();
      render(
        <Tooltip content="Tooltip text" showDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));

      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip');
        const arrow = tooltip.querySelector('[aria-hidden="true"]');
        expect(arrow).toBeInTheDocument();
      });
    });

    it('works with keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Tooltip content="Tooltip 1" showDelay={0} hideDelay={0}>
            <button>Button 1</button>
          </Tooltip>
          <Tooltip content="Tooltip 2" showDelay={0}>
            <button>Button 2</button>
          </Tooltip>
        </div>
      );

      // Tab to first button
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Tooltip 1')).toBeInTheDocument();
      });

      // Tab to second button
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText('Tooltip 1')).not.toBeInTheDocument();
        expect(screen.getByText('Tooltip 2')).toBeInTheDocument();
      });
    });
  });

  describe('placements', () => {
    it('renders with different placements', async () => {
      const placements = ['top', 'bottom', 'left', 'right'] as const;

      for (const placement of placements) {
        const user = userEvent.setup();
        const { unmount } = render(
          <Tooltip content="Tooltip text" placement={placement} showDelay={0}>
            <button>Trigger</button>
          </Tooltip>
        );

        await user.hover(screen.getByText('Trigger'));

        await waitFor(() => {
          expect(screen.getByRole('tooltip')).toBeInTheDocument();
        });

        unmount();
      }
    });
  });

  describe('edge cases', () => {
    it('handles invalid children gracefully', () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <Tooltip content="Tooltip text">
          {/* @ts-expect-error - Testing invalid children */}
          Invalid child
        </Tooltip>
      );

      expect(consoleError).toHaveBeenCalledWith(
        'Tooltip: children must be a valid React element'
      );

      consoleError.mockRestore();
    });

    it('cleans up on unmount', async () => {
      const user = userEvent.setup();
      const { unmount } = render(
        <Tooltip content="Tooltip text" showDelay={100}>
          <button>Trigger</button>
        </Tooltip>
      );

      await user.hover(screen.getByText('Trigger'));
      unmount();

      // Should not throw or cause issues
      await new Promise((resolve) => setTimeout(resolve, 200));
    });
  });
});
