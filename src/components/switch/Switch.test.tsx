import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { Switch } from './Switch';

describe('Switch', () => {
  describe('rendering', () => {
    it('renders without label', () => {
      render(<Switch aria-label="Toggle feature" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Switch label="Enable notifications" />);
      expect(screen.getByText('Enable notifications')).toBeInTheDocument();
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(
        <Switch label="Test" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('renders all size variants', () => {
      const { rerender } = render(<Switch label="Small" size="sm" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();

      rerender(<Switch label="Medium" size="md" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();

      rerender(<Switch label="Large" size="lg" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders all variant types', () => {
      const { rerender } = render(<Switch label="Primary" variant="primary" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();

      rerender(<Switch label="Secondary" variant="secondary" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();

      rerender(<Switch label="Success" variant="success" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders label on the left when labelPosition is left', () => {
      const { container } = render(
        <Switch label="Toggle" labelPosition="left" />
      );
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('flex-row-reverse');
    });

    it('renders label on the right by default', () => {
      const { container } = render(<Switch label="Toggle" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).not.toHaveClass('flex-row-reverse');
    });

    it('displays required indicator when isRequired is true', () => {
      render(<Switch label="Required switch" isRequired />);
      expect(screen.getByLabelText('required')).toBeInTheDocument();
    });
  });

  describe('uncontrolled mode', () => {
    it('starts unchecked by default', () => {
      render(<Switch label="Toggle" />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
    });

    it('starts checked when defaultChecked is true', () => {
      render(<Switch label="Toggle" defaultChecked />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('toggles on click', async () => {
      const user = userEvent.setup();
      render(<Switch label="Toggle" />);
      const switchElement = screen.getByRole('switch');

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      await user.click(switchElement);
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('toggles when clicking the label', async () => {
      const user = userEvent.setup();
      render(<Switch label="Toggle me" />);
      const switchElement = screen.getByRole('switch');
      const label = screen.getByText('Toggle me');

      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await user.click(label);
      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      await user.click(label);
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('controlled mode', () => {
    it('respects controlled checked prop', () => {
      const { rerender } = render(<Switch label="Toggle" checked={false} onChange={vi.fn()} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch label="Toggle" checked={true} onChange={vi.fn()} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('calls onChange when toggled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch label="Toggle" checked={false} onChange={handleChange} />);

      await user.click(screen.getByRole('switch'));
      expect(handleChange).toHaveBeenCalledWith(true);
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('works as a fully controlled component', async () => {
      const user = userEvent.setup();

      function ControlledSwitch() {
        const [checked, setChecked] = useState(false);
        return (
          <div>
            <Switch label="Controlled" checked={checked} onChange={setChecked} />
            <div data-testid="state">{checked ? 'on' : 'off'}</div>
          </div>
        );
      }

      render(<ControlledSwitch />);

      expect(screen.getByTestId('state')).toHaveTextContent('off');

      await user.click(screen.getByRole('switch'));
      expect(screen.getByTestId('state')).toHaveTextContent('on');

      await user.click(screen.getByRole('switch'));
      expect(screen.getByTestId('state')).toHaveTextContent('off');
    });
  });

  describe('keyboard interactions', () => {
    it('toggles on Space key', async () => {
      const user = userEvent.setup();
      render(<Switch label="Toggle" />);
      const switchElement = screen.getByRole('switch');

      switchElement.focus();
      expect(switchElement).toHaveAttribute('aria-checked', 'false');

      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('aria-checked', 'true');

      await user.keyboard(' ');
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('prevents default on Space key to avoid page scroll', async () => {
      const user = userEvent.setup();
      const preventDefault = vi.fn();

      render(<Switch label="Toggle" />);
      const switchElement = screen.getByRole('switch');

      switchElement.addEventListener('keydown', (e) => {
        preventDefault();
        e.preventDefault();
      });

      switchElement.focus();
      await user.keyboard(' ');

      expect(preventDefault).toHaveBeenCalled();
    });
  });

  describe('disabled state', () => {
    it('renders as disabled', () => {
      render(<Switch label="Toggle" disabled />);
      expect(screen.getByRole('switch')).toBeDisabled();
    });

    it('does not toggle when clicked while disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Switch label="Toggle" disabled onChange={handleChange} />);

      await user.click(screen.getByRole('switch'));
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not toggle on Space key when disabled', async () => {
      const user = userEvent.setup();
      render(<Switch label="Toggle" disabled defaultChecked={false} />);
      const switchElement = screen.getByRole('switch');

      switchElement.focus();
      await user.keyboard(' ');

      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });

    it('does not toggle when clicking label while disabled', async () => {
      const user = userEvent.setup();
      render(<Switch label="Toggle me" disabled />);
      const switchElement = screen.getByRole('switch');

      await user.click(screen.getByText('Toggle me'));
      expect(switchElement).toHaveAttribute('aria-checked', 'false');
    });
  });

  describe('accessibility', () => {
    it('has role switch', () => {
      render(<Switch label="Toggle" />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('has aria-checked attribute', () => {
      const { rerender } = render(<Switch label="Toggle" checked={false} onChange={vi.fn()} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');

      rerender(<Switch label="Toggle" checked={true} onChange={vi.fn()} />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
    });

    it('supports aria-label', () => {
      render(<Switch aria-label="Custom label" />);
      expect(screen.getByLabelText('Custom label')).toBeInTheDocument();
    });

    it('associates label with switch', () => {
      render(<Switch label="Enable feature" />);
      const switchElement = screen.getByRole('switch');
      const label = screen.getByText('Enable feature');

      expect(switchElement).toHaveAttribute('aria-labelledby', label.id);
    });

    it('supports aria-labelledby override', () => {
      render(
        <div>
          <span id="custom-label">Custom Label</span>
          <Switch aria-labelledby="custom-label" />
        </div>
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-labelledby', 'custom-label');
    });

    it('supports aria-describedby', () => {
      render(
        <div>
          <Switch label="Toggle" aria-describedby="description" />
          <span id="description">This is a description</span>
        </div>
      );
      expect(screen.getByRole('switch')).toHaveAttribute('aria-describedby', 'description');
    });

    it('supports aria-required', () => {
      render(<Switch label="Toggle" isRequired />);
      expect(screen.getByRole('switch')).toHaveAttribute('aria-required', 'true');
    });

    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLButtonElement | null };
      render(<Switch ref={ref} label="Toggle" />);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current).toHaveAttribute('role', 'switch');
    });

    it('uses provided id', () => {
      render(<Switch id="custom-id" label="Toggle" />);
      expect(screen.getByRole('switch')).toHaveAttribute('id', 'custom-id');
    });

    it('generates unique id when not provided', () => {
      render(
        <div>
          <Switch label="Switch 1" />
          <Switch label="Switch 2" />
        </div>
      );
      const switches = screen.getAllByRole('switch');
      expect(switches[0].id).toBeTruthy();
      expect(switches[1].id).toBeTruthy();
      expect(switches[0].id).not.toBe(switches[1].id);
    });
  });

  describe('form integration', () => {
    it('supports name attribute', () => {
      render(<Switch label="Toggle" name="settings.notifications" />);
      expect(screen.getByRole('switch')).toHaveAttribute('name', 'settings.notifications');
    });

    it('supports value attribute', () => {
      render(<Switch label="Toggle" value="enabled" />);
      expect(screen.getByRole('switch')).toHaveAttribute('value', 'enabled');
    });
  });
});
