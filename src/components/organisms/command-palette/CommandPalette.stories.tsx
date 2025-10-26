import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CommandPalette, type CommandItem } from './CommandPalette';
import { Button } from '../../atoms/button/Button';

/**
 * CommandPalette is a powerful keyboard-driven command interface inspired by VS Code
 * and Linear. It provides quick access to actions and navigation through fuzzy search
 * and keyboard shortcuts.
 *
 * ## Features
 * - **Fuzzy Search**: Intelligent search with keyword matching
 * - **Keyboard Navigation**: Full arrow key support with Enter to select
 * - **Category Grouping**: Organize commands by category
 * - **Shortcuts Display**: Show keyboard shortcuts for quick reference
 * - **Custom Icons**: Add visual context with icons
 * - **Badges**: Highlight special commands
 * - **Accessibility**: Full ARIA support for screen readers
 */
const meta = {
  title: 'Organisms/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sophisticated command palette for quick actions and navigation. Press arrow keys to navigate, Enter to select, Escape to close.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
function CommandPaletteDemo({ items }: { items: CommandItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lastAction, setLastAction] = useState<string>('');

  const itemsWithActions = items.map((item) => ({
    ...item,
    onSelect: () => {
      setLastAction(`Executed: ${item.label}`);
      item.onSelect?.();
    },
  }));

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
      <Button onClick={() => setIsOpen(true)}>Open Command Palette</Button>
      {lastAction && (
        <p className="text-sm text-text-secondary">
          Last action: <span className="font-medium text-text-primary">{lastAction}</span>
        </p>
      )}
      <p className="text-xs text-text-secondary">
        Tip: Try typing &quot;new&quot;, &quot;search&quot;, or &quot;help&quot;
      </p>
      <CommandPalette
        items={itemsWithActions}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}

// File Icons (simple SVG examples)
const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M4 2h8l4 4v10a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2z" />
  </svg>
);

const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 4a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const GitIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
    <path d="M19.61 9.25l-8.86-8.86a1.33 1.33 0 00-1.88 0L7.11 2.15l2.38 2.38a1.58 1.58 0 012 2.02l2.3 2.3a1.58 1.58 0 111.42 1.42 1.58 1.58 0 01-2.24 0l-2.15-2.15V14a1.58 1.58 0 11-1.26 0V8.08a1.58 1.58 0 01-.86-2.07L6.32 3.63.39 9.56a1.33 1.33 0 000 1.88l8.86 8.86a1.33 1.33 0 001.88 0l8.48-8.48a1.33 1.33 0 000-1.88z" />
  </svg>
);

/**
 * Default command palette with common development actions.
 */
export const Default: Story = {
  render: () => {
    const commands: CommandItem[] = [
      // File operations
      {
        id: 'new-file',
        label: 'New File',
        description: 'Create a new file in the current directory',
        icon: <FileIcon />,
        shortcut: ['⌘', 'N'],
        category: 'File',
        keywords: ['create', 'add'],
      },
      {
        id: 'new-folder',
        label: 'New Folder',
        description: 'Create a new folder',
        icon: <FolderIcon />,
        shortcut: ['⌘', 'Shift', 'N'],
        category: 'File',
        keywords: ['directory', 'create'],
      },
      {
        id: 'open-file',
        label: 'Open File',
        description: 'Open a file from the workspace',
        icon: <FileIcon />,
        shortcut: ['⌘', 'O'],
        category: 'File',
        keywords: ['browse'],
      },

      // Search operations
      {
        id: 'search-files',
        label: 'Search Files',
        description: 'Search for files by name',
        icon: <SearchIcon />,
        shortcut: ['⌘', 'P'],
        category: 'Search',
        keywords: ['find', 'locate'],
      },
      {
        id: 'search-text',
        label: 'Search in Files',
        description: 'Search for text across all files',
        icon: <SearchIcon />,
        shortcut: ['⌘', 'Shift', 'F'],
        category: 'Search',
        keywords: ['find', 'grep', 'text'],
      },

      // Git operations
      {
        id: 'git-commit',
        label: 'Git: Commit',
        description: 'Commit staged changes',
        icon: <GitIcon />,
        category: 'Source Control',
        keywords: ['save', 'version'],
      },
      {
        id: 'git-push',
        label: 'Git: Push',
        description: 'Push commits to remote',
        icon: <GitIcon />,
        category: 'Source Control',
        keywords: ['upload', 'sync'],
      },
      {
        id: 'git-pull',
        label: 'Git: Pull',
        description: 'Pull changes from remote',
        icon: <GitIcon />,
        category: 'Source Control',
        keywords: ['download', 'sync', 'fetch'],
      },

      // Settings
      {
        id: 'settings',
        label: 'Open Settings',
        description: 'Open user and workspace settings',
        icon: <SettingsIcon />,
        shortcut: ['⌘', ','],
        category: 'Settings',
        keywords: ['preferences', 'config'],
      },
      {
        id: 'theme',
        label: 'Change Theme',
        description: 'Switch between light and dark themes',
        icon: <SettingsIcon />,
        category: 'Settings',
        keywords: ['appearance', 'color'],
      },

      // User
      {
        id: 'profile',
        label: 'View Profile',
        description: 'View and edit your profile',
        icon: <UserIcon />,
        category: 'User',
        badge: 'New',
      },
      {
        id: 'logout',
        label: 'Sign Out',
        description: 'Sign out of your account',
        icon: <UserIcon />,
        category: 'User',
      },
    ];

    return <CommandPaletteDemo items={commands} />;
  },
};

/**
 * Command palette with badges highlighting special items.
 */
export const WithBadges: Story = {
  render: () => {
    const commands: CommandItem[] = [
      {
        id: 'feature-1',
        label: 'AI Code Assistant',
        description: 'Get AI-powered code suggestions',
        icon: <SearchIcon />,
        badge: 'New',
        category: 'Features',
      },
      {
        id: 'feature-2',
        label: 'Live Collaboration',
        description: 'Collaborate with your team in real-time',
        icon: <UserIcon />,
        badge: 'Beta',
        category: 'Features',
      },
      {
        id: 'feature-3',
        label: 'Cloud Sync',
        description: 'Sync your settings across devices',
        icon: <SettingsIcon />,
        badge: 'Pro',
        category: 'Features',
      },
      {
        id: 'feature-4',
        label: 'Advanced Search',
        description: 'Use regex and advanced filters',
        icon: <SearchIcon />,
        badge: 'Premium',
        category: 'Features',
      },
    ];

    return <CommandPaletteDemo items={commands} />;
  },
};

/**
 * Simple command palette without categories.
 */
export const NoCategories: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const commands: CommandItem[] = [
      {
        id: '1',
        label: 'Create New Document',
        description: 'Start with a blank document',
        icon: <FileIcon />,
      },
      {
        id: '2',
        label: 'Search Everything',
        description: 'Search across all your files',
        icon: <SearchIcon />,
      },
      {
        id: '3',
        label: 'Open Settings',
        description: 'Configure your preferences',
        icon: <SettingsIcon />,
      },
      {
        id: '4',
        label: 'View Profile',
        description: 'Manage your account',
        icon: <UserIcon />,
      },
    ];

    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
        <Button onClick={() => setIsOpen(true)}>Open Palette (No Categories)</Button>
        <CommandPalette
          items={commands}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCategories={false}
        />
      </div>
    );
  },
};

/**
 * Command palette with custom footer showing helpful tips.
 */
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const commands: CommandItem[] = [
      {
        id: 'cmd-1',
        label: 'Quick Open',
        description: 'Go to file',
        shortcut: ['⌘', 'P'],
        category: 'Navigation',
      },
      {
        id: 'cmd-2',
        label: 'Command Palette',
        description: 'Show all commands',
        shortcut: ['⌘', 'Shift', 'P'],
        category: 'Navigation',
      },
      {
        id: 'cmd-3',
        label: 'Terminal',
        description: 'Open integrated terminal',
        shortcut: ['⌃', '`'],
        category: 'View',
      },
    ];

    const footer = (
      <div className="flex items-center justify-between text-xs text-text-secondary">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <kbd className="rounded-none border border-border-subtle bg-layer-01 px-1.5 py-0.5">
              ↑↓
            </kbd>
            <span>Navigate</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded-none border border-border-subtle bg-layer-01 px-1.5 py-0.5">
              ↵
            </kbd>
            <span>Select</span>
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded-none border border-border-subtle bg-layer-01 px-1.5 py-0.5">
              Esc
            </kbd>
            <span>Close</span>
          </span>
        </div>
        <span>💡 Tip: Use fuzzy search</span>
      </div>
    );

    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
        <Button onClick={() => setIsOpen(true)}>Open Palette with Footer</Button>
        <CommandPalette
          items={commands}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={footer}
        />
      </div>
    );
  },
};

/**
 * Large dataset demonstrating performance with many items.
 */
export const LargeDataset: Story = {
  render: () => {
    // Generate 100 commands
    const commands: CommandItem[] = Array.from({ length: 100 }, (_, i) => ({
      id: `item-${i}`,
      label: `Command ${i + 1}`,
      description: `Description for command ${i + 1}`,
      icon: i % 4 === 0 ? <FileIcon /> : i % 4 === 1 ? <FolderIcon /> : i % 4 === 2 ? <SearchIcon /> : <SettingsIcon />,
      category: ['File', 'Edit', 'View', 'Search', 'Settings'][i % 5],
      shortcut: i % 10 === 0 ? ['⌘', String(i % 10)] : undefined,
      keywords: [`cmd${i}`, `command${i}`, `action${i}`],
    }));

    return <CommandPaletteDemo items={commands} />;
  },
};

/**
 * Command palette with recent items and suggestions.
 */
export const RecentAndSuggested: Story = {
  render: () => {
    const commands: CommandItem[] = [
      // Recent
      {
        id: 'recent-1',
        label: 'HomePage.tsx',
        description: 'Opened 2 minutes ago',
        icon: <FileIcon />,
        category: 'Recently Opened',
        badge: 'Recent',
      },
      {
        id: 'recent-2',
        label: 'UserProfile.tsx',
        description: 'Opened 15 minutes ago',
        icon: <FileIcon />,
        category: 'Recently Opened',
        badge: 'Recent',
      },

      // Suggested
      {
        id: 'suggest-1',
        label: 'Run Tests',
        description: 'Execute test suite',
        icon: <SearchIcon />,
        category: 'Suggested',
        badge: '⭐',
      },
      {
        id: 'suggest-2',
        label: 'Build Project',
        description: 'Create production build',
        icon: <SettingsIcon />,
        category: 'Suggested',
        badge: '⭐',
      },

      // All commands
      {
        id: 'all-1',
        label: 'Format Document',
        description: 'Auto-format current file',
        shortcut: ['⌘', 'Shift', 'F'],
        category: 'All Commands',
      },
      {
        id: 'all-2',
        label: 'Organize Imports',
        description: 'Sort and remove unused imports',
        category: 'All Commands',
      },
    ];

    return <CommandPaletteDemo items={commands} />;
  },
};

/**
 * Minimal command palette without icons or descriptions.
 */
export const Minimal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const commands: CommandItem[] = [
      { id: '1', label: 'New File', shortcut: ['⌘', 'N'] },
      { id: '2', label: 'Open File', shortcut: ['⌘', 'O'] },
      { id: '3', label: 'Save', shortcut: ['⌘', 'S'] },
      { id: '4', label: 'Save As', shortcut: ['⌘', 'Shift', 'S'] },
      { id: '5', label: 'Close', shortcut: ['⌘', 'W'] },
    ];

    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4">
        <Button onClick={() => setIsOpen(true)}>Open Minimal Palette</Button>
        <CommandPalette
          items={commands}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          showCategories={false}
          placeholder="Type to search..."
        />
      </div>
    );
  },
};
