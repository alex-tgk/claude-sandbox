import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CommandPalette, type CommandItem } from './CommandPalette';

describe('CommandPalette', () => {
  const mockOnClose = jest.fn();
  const mockOnSelect = jest.fn();

  const sampleItems: CommandItem[] = [
    {
      id: '1',
      label: 'New File',
      description: 'Create a new file',
      category: 'File',
      shortcut: ['⌘', 'N'],
      keywords: ['create', 'add'],
    },
    {
      id: '2',
      label: 'Open File',
      description: 'Open an existing file',
      category: 'File',
      keywords: ['browse'],
    },
    {
      id: '3',
      label: 'Search Files',
      description: 'Search for files',
      category: 'Search',
      keywords: ['find', 'locate'],
    },
    {
      id: '4',
      label: 'Settings',
      description: 'Open settings',
      category: 'Settings',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={false} onClose={mockOnClose} />
      );

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Type a command or search...')).toBeInTheDocument();
    });

    it('should render all items initially', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.getByText('New File')).toBeInTheDocument();
      expect(screen.getByText('Open File')).toBeInTheDocument();
      expect(screen.getByText('Search Files')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should render categories when showCategories is true', () => {
      render(
        <CommandPalette
          items={sampleItems}
          isOpen={true}
          onClose={mockOnClose}
          showCategories={true}
        />
      );

      expect(screen.getByText('FILE')).toBeInTheDocument();
      expect(screen.getByText('SEARCH')).toBeInTheDocument();
      expect(screen.getByText('SETTINGS')).toBeInTheDocument();
    });

    it('should not render categories when showCategories is false', () => {
      render(
        <CommandPalette
          items={sampleItems}
          isOpen={true}
          onClose={mockOnClose}
          showCategories={false}
        />
      );

      expect(screen.queryByText('FILE')).not.toBeInTheDocument();
      expect(screen.queryByText('SEARCH')).not.toBeInTheDocument();
    });

    it('should render keyboard shortcuts', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.getByText('⌘')).toBeInTheDocument();
      expect(screen.getByText('N')).toBeInTheDocument();
    });

    it('should render badges', () => {
      const itemsWithBadge: CommandItem[] = [
        { ...sampleItems[0], badge: 'New' },
      ];

      render(
        <CommandPalette items={itemsWithBadge} isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('should render footer when provided', () => {
      render(
        <CommandPalette
          items={sampleItems}
          isOpen={true}
          onClose={mockOnClose}
          footer={<div>Custom Footer</div>}
        />
      );

      expect(screen.getByText('Custom Footer')).toBeInTheDocument();
    });

    it('should render empty state when no items match', async () => {
      const user = userEvent.setup();
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, 'nonexistent');

      expect(screen.getByText('No commands found')).toBeInTheDocument();
    });

    it('should render custom empty message', async () => {
      const user = userEvent.setup();
      render(
        <CommandPalette
          items={sampleItems}
          isOpen={true}
          onClose={mockOnClose}
          emptyMessage="Custom empty message"
        />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, 'xyz');

      expect(screen.getByText('Custom empty message')).toBeInTheDocument();
    });
  });

  describe('Search', () => {
    it('should filter items based on label', async () => {
      const user = userEvent.setup();
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, 'search');

      expect(screen.getByText('Search Files')).toBeInTheDocument();
      expect(screen.queryByText('New File')).not.toBeInTheDocument();
    });

    it('should filter items based on description', async () => {
      const user = userEvent.setup();
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, 'existing');

      expect(screen.getByText('Open File')).toBeInTheDocument();
      expect(screen.queryByText('New File')).not.toBeInTheDocument();
    });

    it('should filter items based on keywords', async () => {
      const user = userEvent.setup();
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, 'locate');

      expect(screen.getByText('Search Files')).toBeInTheDocument();
      expect(screen.queryByText('New File')).not.toBeInTheDocument();
    });

    it('should support fuzzy matching', async () => {
      const user = userEvent.setup();
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, 'nf');

      expect(screen.getByText('New File')).toBeInTheDocument();
    });

    it('should be case insensitive', async () => {
      const user = userEvent.setup();
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, 'NEW FILE');

      expect(screen.getByText('New File')).toBeInTheDocument();
    });

    it('should use custom search function when provided', async () => {
      const user = userEvent.setup();
      const customSearchFn = jest.fn((item: CommandItem, query: string) =>
        item.id === query
      );

      render(
        <CommandPalette
          items={sampleItems}
          isOpen={true}
          onClose={mockOnClose}
          searchFn={customSearchFn}
        />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, '1');

      expect(customSearchFn).toHaveBeenCalled();
      expect(screen.getByText('New File')).toBeInTheDocument();
      expect(screen.queryByText('Open File')).not.toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate down with ArrowDown', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');

      // First item should be selected initially
      const firstItem = screen.getByText('New File').closest('button');
      expect(firstItem).toHaveAttribute('data-selected', 'true');

      // Press ArrowDown
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      // Second item should now be selected
      const secondItem = screen.getByText('Open File').closest('button');
      expect(secondItem).toHaveAttribute('data-selected', 'true');
    });

    it('should navigate up with ArrowUp', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');

      // Go down then up
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowUp' });

      const firstItem = screen.getByText('New File').closest('button');
      expect(firstItem).toHaveAttribute('data-selected', 'true');
    });

    it('should wrap around when navigating down past last item', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');

      // Navigate to last item and beyond
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' }); // Wrap to first

      const firstItem = screen.getByText('New File').closest('button');
      expect(firstItem).toHaveAttribute('data-selected', 'true');
    });

    it('should close on Escape key', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      fireEvent.keyDown(input, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should select item on Enter key', () => {
      const onSelectMock = jest.fn();
      const itemWithSelect = [{ ...sampleItems[0], onSelect: onSelectMock }];

      render(
        <CommandPalette
          items={itemWithSelect}
          isOpen={true}
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(itemWithSelect[0]);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Selection', () => {
    it('should call onSelect when item is clicked', () => {
      const onSelectMock = jest.fn();
      const itemWithSelect = [{ ...sampleItems[0], onSelect: onSelectMock }];

      render(
        <CommandPalette
          items={itemWithSelect}
          isOpen={true}
          onClose={mockOnClose}
          onSelect={mockOnSelect}
        />
      );

      const item = screen.getByText('New File');
      fireEvent.click(item);

      expect(onSelectMock).toHaveBeenCalledTimes(1);
      expect(mockOnSelect).toHaveBeenCalledWith(itemWithSelect[0]);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should highlight item on mouse enter', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const secondItem = screen.getByText('Open File').closest('button');
      if (secondItem) {
        fireEvent.mouseEnter(secondItem);
        expect(secondItem).toHaveAttribute('data-selected', 'true');
      }
    });
  });

  describe('Backdrop', () => {
    it('should close when clicking backdrop', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const backdrop = screen.getByRole('dialog');
      fireEvent.click(backdrop);

      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('should not close when clicking inside palette', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      fireEvent.click(input);

      expect(mockOnClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have correct ARIA attributes', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-label', 'Command palette');

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();

      const options = screen.getAllByRole('option');
      expect(options).toHaveLength(4);
    });

    it('should mark selected item with aria-selected', () => {
      render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const selectedItem = screen.getByText('New File').closest('button');
      expect(selectedItem).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty items array', () => {
      render(<CommandPalette items={[]} isOpen={true} onClose={mockOnClose} />);

      expect(screen.getByText('No commands found')).toBeInTheDocument();
    });

    it('should handle items without categories', () => {
      const itemsNoCat: CommandItem[] = [
        { id: '1', label: 'Item 1' },
        { id: '2', label: 'Item 2' },
      ];

      render(
        <CommandPalette items={itemsNoCat} isOpen={true} onClose={mockOnClose} />
      );

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should reset search when closed and reopened', async () => {
      const user = userEvent.setup();
      const { rerender } = render(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      const input = screen.getByPlaceholderText('Type a command or search...');
      await user.type(input, 'search');

      expect(screen.getByText('Search Files')).toBeInTheDocument();
      expect(screen.queryByText('New File')).not.toBeInTheDocument();

      // Close and reopen
      rerender(
        <CommandPalette items={sampleItems} isOpen={false} onClose={mockOnClose} />
      );
      rerender(
        <CommandPalette items={sampleItems} isOpen={true} onClose={mockOnClose} />
      );

      // All items should be visible again
      await waitFor(() => {
        expect(screen.getByText('New File')).toBeInTheDocument();
        expect(screen.getByText('Search Files')).toBeInTheDocument();
      });
    });
  });
});
