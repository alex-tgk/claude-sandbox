import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TextArea } from './TextArea';

describe('TextArea', () => {
  describe('rendering', () => {
    it('renders with children', () => {
      render(<TextArea>Test content</TextArea>);
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      const { container } = render(<TextArea className="custom-class">Content</TextArea>);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('interactions', () => {
    it('can be disabled', () => {
      render(<TextArea disabled>Content</TextArea>);
      expect(screen.getByText('Content')).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('accessibility', () => {
    it('supports ref forwarding', () => {
      const ref = { current: null as HTMLDivElement | null };
      render(<TextArea ref={ref}>Content</TextArea>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });
});
