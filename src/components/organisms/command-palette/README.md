# CommandPalette

A powerful, keyboard-driven command interface inspired by VS Code's Command Palette and Linear's command menu. Perfect for adding advanced keyboard navigation and quick actions to your application.

## Features

- 🔍 **Fuzzy Search**: Intelligent search with keyword matching
- ⌨️ **Keyboard Navigation**: Full arrow key support with Enter to select, Escape to close
- 📂 **Category Grouping**: Organize commands by category
- ⚡ **Shortcuts Display**: Show keyboard shortcuts for quick reference
- 🎨 **Custom Icons**: Add visual context with icons
- 🏷️ **Badges**: Highlight special commands (New, Beta, Pro, etc.)
- ♿ **Accessibility**: Full ARIA support for screen readers
- 🎯 **IBM Carbon Design**: Sharp corners and professional aesthetic

## Usage

### Basic Example

```tsx
import { useState } from 'react';
import { CommandPalette, CommandItem } from '@/components';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const commands: CommandItem[] = [
    {
      id: 'new-file',
      label: 'New File',
      description: 'Create a new file',
      category: 'File',
      shortcut: ['⌘', 'N'],
      onSelect: () => createNewFile(),
    },
    {
      id: 'search',
      label: 'Search Files',
      description: 'Search for files by name',
      category: 'Search',
      shortcut: ['⌘', 'P'],
      onSelect: () => openFileSearch(),
    },
  ];

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Command Palette
      </button>

      <CommandPalette
        items={commands}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
```

### With Icons

```tsx
const commands: CommandItem[] = [
  {
    id: 'new-file',
    label: 'New File',
    description: 'Create a new file',
    icon: <FileIcon />,
    category: 'File',
    onSelect: () => createNewFile(),
  },
];
```

### With Badges

```tsx
const commands: CommandItem[] = [
  {
    id: 'ai-assist',
    label: 'AI Code Assistant',
    description: 'Get AI-powered suggestions',
    badge: 'New',
    category: 'Features',
    onSelect: () => openAIAssistant(),
  },
  {
    id: 'collab',
    label: 'Live Collaboration',
    description: 'Collaborate in real-time',
    badge: 'Beta',
    category: 'Features',
    onSelect: () => enableCollaboration(),
  },
];
```

### With Custom Footer

```tsx
const footer = (
  <div className="flex items-center justify-between text-xs text-text-secondary">
    <span>💡 Tip: Try fuzzy search</span>
    <span>Press ? for help</span>
  </div>
);

<CommandPalette
  items={commands}
  isOpen={isOpen}
  onClose={onClose}
  footer={footer}
/>
```

### Global Keyboard Shortcut

```tsx
import { useEffect, useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <CommandPalette
      items={commands}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
```

### Custom Search Function

```tsx
const customSearchFn = (item: CommandItem, query: string) => {
  // Custom logic: only match on label, case-sensitive
  return item.label.includes(query);
};

<CommandPalette
  items={commands}
  isOpen={isOpen}
  onClose={onClose}
  searchFn={customSearchFn}
/>
```

## Props

### CommandPaletteProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `CommandItem[]` | *required* | Array of command items |
| `isOpen` | `boolean` | *required* | Whether the palette is open |
| `onClose` | `() => void` | *required* | Close handler |
| `onSelect` | `(item: CommandItem) => void` | - | Global item selection handler |
| `placeholder` | `string` | `'Type a command or search...'` | Search placeholder text |
| `showCategories` | `boolean` | `true` | Whether to show categories |
| `searchFn` | `(item: CommandItem, query: string) => boolean` | Built-in fuzzy search | Custom search function |
| `emptyMessage` | `string` | `'No commands found'` | Empty state message |
| `footer` | `ReactNode` | - | Custom footer content |
| `className` | `string` | - | Custom className |

### CommandItem

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier |
| `label` | `string` | Display label |
| `description` | `string` | Optional description |
| `icon` | `ReactNode` | Optional icon (React node) |
| `shortcut` | `string[]` | Optional keyboard shortcut display |
| `category` | `string` | Optional category for grouping |
| `badge` | `string` | Optional badge text |
| `keywords` | `string[]` | Optional keywords for search matching |
| `onSelect` | `() => void` | Action to execute when selected |
| `data` | `any` | Custom data payload |

## Keyboard Navigation

- **Arrow Down**: Navigate to next item
- **Arrow Up**: Navigate to previous item
- **Enter**: Select highlighted item
- **Escape**: Close the palette
- **Type**: Filter commands with fuzzy search

## Search Behavior

The default search function:
1. Searches across `label`, `description`, `keywords`, and `category`
2. Case-insensitive matching
3. Fuzzy matching: characters can appear in order but not necessarily consecutive
4. Example: "nf" matches "**N**ew **F**ile"

## Accessibility

- Full keyboard navigation support
- ARIA attributes (`role="dialog"`, `aria-modal`, `aria-label`)
- Screen reader friendly with proper semantic HTML
- Focus management (auto-focus on open)
- Escape key to close

## Styling

The component uses IBM Carbon Design System aesthetic with:
- Sharp corners (no border radius)
- Professional color scheme
- 110ms transitions (Carbon standard)
- Proper focus indicators
- High contrast for accessibility

## Best Practices

1. **Keep labels concise**: Users scan quickly
2. **Use descriptive descriptions**: Provide context
3. **Add keywords**: Help users find commands
4. **Group by category**: Make navigation easier
5. **Show shortcuts**: Educate users on keyboard shortcuts
6. **Use badges sparingly**: Only for important highlights
7. **Test keyboard nav**: Ensure all commands are accessible via keyboard

## Examples in Storybook

See the comprehensive Storybook stories for examples:
- Default palette with common actions
- With badges for highlighting
- Without categories
- With custom footer
- Large dataset (100+ items)
- Recent and suggested items
- Minimal variant

## Performance

The component is optimized for large datasets:
- Memoized search filtering
- Efficient keyboard navigation
- Virtual scrolling ready (max-height with scroll)
- Minimal re-renders with proper React hooks

## Related Components

- **Dialog**: For modal overlays
- **Input**: For search functionality
- **Badge**: For highlighting special items
- **DataTable**: For tabular command-like data
