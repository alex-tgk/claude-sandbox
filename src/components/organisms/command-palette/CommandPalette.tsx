import {
  useState,
  useEffect,
  useRef,
  useMemo,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../../utils/cn';
import { Input } from '../../atoms/input/Input';
import { Badge } from '../../atoms/badge/Badge';

/**
 * Command item for CommandPalette
 *
 * @since 0.3.0
 */
export interface CommandItem {
  /**
   * Unique identifier
   */
  id: string;

  /**
   * Display label
   */
  label: string;

  /**
   * Optional description
   */
  description?: string;

  /**
   * Optional icon (React node)
   */
  icon?: ReactNode;

  /**
   * Optional keyboard shortcut display
   */
  shortcut?: string[];

  /**
   * Optional category for grouping
   */
  category?: string;

  /**
   * Optional badge text
   */
  badge?: string;

  /**
   * Optional keywords for search matching
   */
  keywords?: string[];

  /**
   * Action to execute when selected
   */
  onSelect?: () => void;

  /**
   * Custom data payload
   */
  data?: any;
}

/**
 * CommandPalette Props
 *
 * @since 0.3.0
 */
export interface CommandPaletteProps {
  /**
   * Array of command items
   */
  items: CommandItem[];

  /**
   * Whether the palette is open
   */
  isOpen: boolean;

  /**
   * Close handler
   */
  onClose: () => void;

  /**
   * Item selection handler
   */
  onSelect?: (item: CommandItem) => void;

  /**
   * Search placeholder text
   * @defaultValue 'Type a command or search...'
   */
  placeholder?: string;

  /**
   * Whether to show categories
   * @defaultValue true
   */
  showCategories?: boolean;

  /**
   * Custom search function
   */
  searchFn?: (item: CommandItem, query: string) => boolean;

  /**
   * Empty state message
   * @defaultValue 'No commands found'
   */
  emptyMessage?: string;

  /**
   * Custom footer content
   */
  footer?: ReactNode;

  /**
   * Custom className
   */
  className?: string;
}

/**
 * Default search function with fuzzy matching
 */
const defaultSearchFn = (item: CommandItem, query: string): boolean => {
  const searchText = query.toLowerCase();
  const label = item.label.toLowerCase();
  const description = item.description?.toLowerCase() || '';
  const keywords = item.keywords?.join(' ').toLowerCase() || '';
  const category = item.category?.toLowerCase() || '';

  // Check for exact match first
  if (label.includes(searchText)) return true;
  if (description.includes(searchText)) return true;
  if (keywords.includes(searchText)) return true;
  if (category.includes(searchText)) return true;

  // Fuzzy match: check if all characters appear in order
  let queryIndex = 0;
  for (let i = 0; i < label.length && queryIndex < searchText.length; i++) {
    if (label[i] === searchText[queryIndex]) {
      queryIndex++;
    }
  }
  return queryIndex === searchText.length;
};

/**
 * CommandPalette Organism
 *
 * @remarks
 * A powerful, keyboard-driven command palette component inspired by VS Code and Linear.
 * Perfect for adding advanced keyboard navigation and quick actions to your application.
 *
 * Features:
 * - Fuzzy search with keyword matching
 * - Full keyboard navigation (Arrow keys, Enter, Escape)
 * - Category grouping
 * - Keyboard shortcut display
 * - Custom icons and badges
 * - Portal-based overlay (uses fixed positioning)
 * - Click-outside and escape to close
 * - Accessible with ARIA labels
 * - IBM Carbon design aesthetic
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * const commands = [
 *   {
 *     id: 'new-file',
 *     label: 'New File',
 *     description: 'Create a new file',
 *     icon: <FileIcon />,
 *     shortcut: ['⌘', 'N'],
 *     category: 'File',
 *     onSelect: () => createNewFile(),
 *   },
 * ];
 *
 * <CommandPalette
 *   items={commands}
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 *
 * @since 0.3.0
 */
export function CommandPalette({
  items,
  isOpen,
  onClose,
  onSelect,
  placeholder = 'Type a command or search...',
  showCategories = true,
  searchFn = defaultSearchFn,
  emptyMessage = 'No commands found',
  footer,
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter and group items
  const filteredItems = useMemo(() => {
    if (!query.trim()) return items;
    return items.filter((item) => searchFn(item, query));
  }, [items, query, searchFn]);

  // Group by category
  const groupedItems = useMemo(() => {
    if (!showCategories) {
      return { '': filteredItems };
    }

    return filteredItems.reduce(
      (acc, item) => {
        const category = item.category || 'Other';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item);
        return acc;
      },
      {} as Record<string, CommandItem[]>
    );
  }, [filteredItems, showCategories]);

  // Get flat list for keyboard navigation
  const flatItems = useMemo(() => filteredItems, [filteredItems]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    const selected = listRef.current?.querySelector('[data-selected="true"]');
    if (selected && typeof selected.scrollIntoView === 'function') {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % flatItems.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (flatItems[selectedIndex]) {
          handleSelect(flatItems[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };

  // Handle item selection
  const handleSelect = (item: CommandItem) => {
    item.onSelect?.();
    onSelect?.(item);
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-4 pt-[10vh]"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className={cn(
          'w-full max-w-2xl overflow-hidden rounded-none border border-border-subtle bg-layer-01 shadow-xl',
          'animate-in fade-in slide-in-from-top-2 duration-200',
          className
        )}
      >
        {/* Search Input */}
        <div className="border-b border-border-subtle p-4">
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            isFullWidth
            className="border-none bg-transparent text-lg focus:ring-0"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          className="max-h-[60vh] overflow-y-auto overflow-x-hidden"
          role="listbox"
        >
          {flatItems.length === 0 ? (
            <div className="px-4 py-12 text-center text-text-secondary">
              {emptyMessage}
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, categoryItems]) => (
              <div key={category}>
                {/* Category Header */}
                {showCategories && category && (
                  <div className="sticky top-0 bg-layer-02 px-4 py-2">
                    <h3 className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                      {category.toUpperCase()}
                    </h3>
                  </div>
                )}

                {/* Category Items */}
                <div>
                  {categoryItems.map((item) => {
                    const itemIndex = flatItems.indexOf(item);
                    const isSelected = itemIndex === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        data-selected={isSelected}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setSelectedIndex(itemIndex)}
                        className={cn(
                          'flex w-full items-center gap-3 px-4 py-3 text-left transition-colors duration-110',
                          'focus:outline-none',
                          isSelected
                            ? 'bg-brand-60 text-text-on-color'
                            : 'text-text-primary hover:bg-surface-hover'
                        )}
                        role="option"
                        aria-selected={isSelected}
                      >
                        {/* Icon */}
                        {item.icon && (
                          <div
                            className={cn(
                              'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-none',
                              isSelected ? 'text-text-on-color' : 'text-text-secondary'
                            )}
                          >
                            {item.icon}
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium">{item.label}</span>
                            {item.badge && (
                              <Badge
                                variant={isSelected ? 'secondary' : 'info'}
                                className={cn(
                                  'text-xs',
                                  isSelected && 'bg-white/20 text-text-on-color'
                                )}
                              >
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p
                              className={cn(
                                'mt-0.5 truncate text-sm',
                                isSelected ? 'text-text-on-color/80' : 'text-text-secondary'
                              )}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Keyboard Shortcut */}
                        {item.shortcut && (
                          <div className="flex items-center gap-1">
                            {item.shortcut.map((key, i) => (
                              <kbd
                                key={i}
                                className={cn(
                                  'min-w-[1.5rem] rounded-none border px-1.5 py-0.5 text-xs font-medium',
                                  isSelected
                                    ? 'border-white/30 bg-white/10 text-text-on-color'
                                    : 'border-border-subtle bg-layer-02 text-text-secondary'
                                )}
                              >
                                {key}
                              </kbd>
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-border-subtle bg-layer-02 px-4 py-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

CommandPalette.displayName = 'CommandPalette';
