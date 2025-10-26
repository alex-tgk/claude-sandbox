import type { Meta, StoryObj } from '@storybook/react';
import { ProjectDashboard } from './ProjectDashboard';

/**
 * ProjectDashboard - A Real-World Example
 *
 * This comprehensive example demonstrates how to compose multiple components from the
 * modular UI library to create a production-ready project management interface.
 *
 * ## Components Used
 *
 * This example showcases **20+ components** working together:
 *
 * ### Layout & Structure
 * - **Card** (with CardHeader, CardBody, CardFooter) - Main content containers
 * - **Tabs** (with TabList, Tab, TabPanel) - Content organization
 * - **Stepper** - Project timeline visualization
 *
 * ### Data Display
 * - **DataTable** - Interactive task list with sorting, filtering, and pagination
 * - **StatCard** - Key metrics with trend indicators
 * - **Avatar** - User representation with status indicators
 * - **Badge** - Status indicators
 * - **Tag** - Priority labels
 * - **ProgressBar** - Task completion visualization
 *
 * ### Interactive Controls
 * - **Button** - Primary actions
 * - **IconButton** - Compact actions
 * - **CommandPalette** - Quick action launcher (⌘K)
 * - **Select** - Filtering options
 * - **SearchInput** - Search functionality
 * - **SegmentedControl** - View switcher
 *
 * ### Feedback & Communication
 * - **Alert** - Important notifications
 * - **NotificationToast** - Transient feedback
 * - **EmptyState** - Placeholder for empty sections
 *
 * ## Key Features
 *
 * 1. **Responsive Grid Layouts** - Adapts to different screen sizes
 * 2. **Complex State Management** - Multiple interactive features
 * 3. **Data Filtering** - Dynamic content filtering
 * 4. **View Switching** - Multiple visualization modes
 * 5. **Keyboard Shortcuts** - Command palette for power users
 * 6. **Real-time Feedback** - Toast notifications for actions
 * 7. **Rich Data Visualization** - Progress bars, trends, and stats
 *
 * ## Real-World Use Cases
 *
 * This pattern can be adapted for:
 * - **Project Management** - Jira, Asana, Linear-style interfaces
 * - **CRM Dashboards** - Customer and sales tracking
 * - **Analytics Platforms** - Data visualization and reporting
 * - **Admin Panels** - Content and user management
 * - **Team Collaboration** - Team activity and progress tracking
 *
 * ## Design Patterns Demonstrated
 *
 * - **Composition** - Building complex UIs from simple components
 * - **Container/Presenter** - Separation of data and presentation
 * - **Controlled Components** - State management for interactive elements
 * - **Responsive Design** - Mobile-first grid layouts
 * - **Progressive Enhancement** - Graceful degradation of features
 * - **Accessibility** - Semantic HTML and ARIA attributes throughout
 */
const meta = {
  title: 'Examples/ProjectDashboard',
  component: ProjectDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A comprehensive project management dashboard demonstrating real-world usage of 20+ components from the library. Features interactive task management, team overview, and command palette.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProjectDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full Project Dashboard
 *
 * The complete dashboard experience with all features enabled.
 *
 * ## Try It Out
 *
 * 1. **Command Palette**: Click "⌘K Quick Actions" or press Cmd+K (when focused)
 * 2. **Filter Tasks**: Use the status dropdown to filter by task status
 * 3. **Search**: Type in the search box to find specific tasks
 * 4. **Sort**: Click column headers in the task table to sort
 * 5. **Select Tasks**: Use checkboxes to select multiple tasks
 * 6. **Switch Views**: Use the Kanban/List/Timeline segmented control
 * 7. **Navigate Tabs**: Switch between Tasks, Team, and Activity views
 * 8. **Page Through Data**: Use pagination controls at the bottom of the table
 *
 * ## Interactive Features
 *
 * - Command palette with keyboard shortcuts
 * - Real-time notifications for actions
 * - Dynamic filtering and searching
 * - Sortable and paginated data table
 * - Multi-select functionality
 * - Responsive grid layouts
 */
export const Default: Story = {
  render: () => <ProjectDashboard />,
};

/**
 * Mobile View
 *
 * The dashboard adapts to smaller screens with a responsive grid layout.
 * Components stack vertically and the stat cards adjust to a single column.
 */
export const Mobile: Story = {
  render: () => <ProjectDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet View
 *
 * On tablet devices, the layout uses a 2-column grid for stat cards
 * and team members, providing a balanced experience.
 */
export const Tablet: Story = {
  render: () => <ProjectDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Dark Mode
 *
 * The dashboard automatically adapts to dark mode using the IBM Carbon
 * design tokens. All components maintain proper contrast and readability.
 */
export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <ProjectDashboard />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

/**
 * Component Breakdown
 *
 * Here's a visual breakdown of the components used:
 *
 * ```
 * ProjectDashboard
 * ├─ Header Section
 * │  ├─ Button (outline) - Quick Actions
 * │  └─ Button (primary) - New Task
 * │
 * ├─ Progress Section
 * │  └─ Card
 * │     └─ Stepper - Project Timeline
 * │
 * ├─ Stats Section
 * │  ├─ StatCard - Total Tasks
 * │  ├─ StatCard - Completed
 * │  ├─ StatCard - In Progress
 * │  └─ StatCard - Team Velocity
 * │
 * ├─ Alert - Urgent Items Warning
 * │
 * └─ Tabs
 *    ├─ Tasks Tab
 *    │  └─ Card
 *    │     ├─ CardHeader
 *    │     │  ├─ SegmentedControl - View Switcher
 *    │     │  ├─ Select - Status Filter
 *    │     │  └─ SearchInput
 *    │     └─ CardBody
 *    │        └─ DataTable
 *    │           ├─ Badge - Status
 *    │           ├─ Tag - Priority
 *    │           ├─ Avatar - Assignee
 *    │           └─ ProgressBar - Task Progress
 *    │
 *    ├─ Team Tab
 *    │  └─ Grid of Cards
 *    │     └─ Card (for each member)
 *    │        ├─ Avatar (with status)
 *    │        ├─ Badge - Online Status
 *    │        └─ Button - View Profile
 *    │
 *    └─ Activity Tab
 *       └─ EmptyState - Coming Soon
 *
 * Overlays
 * ├─ CommandPalette - Quick Actions
 * └─ NotificationToast - Action Feedback
 * ```
 */
export const ComponentArchitecture: Story = {
  render: () => <ProjectDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'See the source code and component breakdown in the documentation above.',
      },
    },
  },
};
