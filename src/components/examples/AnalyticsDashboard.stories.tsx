import type { Meta, StoryObj } from '@storybook/react';
import { AnalyticsDashboard } from './AnalyticsDashboard';

/**
 * AnalyticsDashboard - Analytics & Data Visualization Example
 *
 * A comprehensive analytics dashboard focused on metrics and data visualization:
 * - Different layout approach from ProjectDashboard
 * - Real-time data updates with live indicator
 * - Multiple metric categories and filtering
 * - Performance tracking with progress indicators
 * - Channel analysis with conversion metrics
 * - Activity timeline with user actions
 *
 * ## Components Used
 *
 * ### Data Display
 * - **StatCard** - Key performance indicators with trends (6 metrics)
 * - **DataTable** - Sortable, searchable performance and channel data
 * - **ProgressBar** - Visual performance score indicators
 * - **Badge** - Status and trend indicators
 *
 * ### Layout & Navigation
 * - **Card** - Metric containers and content sections
 * - **Tabs** - Performance, Channels, Activity views
 *
 * ### Controls
 * - **SegmentedControl** - Time range selector (24h, 7d, 30d)
 * - **SegmentedControl** - Category filter (All, Performance, UX, Security)
 *
 * ### User Display
 * - **Avatar** - User representation in activity feed
 *
 * ## Key Features
 *
 * 1. **Real-time Updates** - Metrics update every 5 seconds with live indicator
 * 2. **Time Range Filtering** - View data for 24h, 7d, or 30d periods
 * 3. **Performance Tracking** - Monitor 8+ performance metrics with scores
 * 4. **Channel Analysis** - Track 6 traffic sources with conversion data
 * 5. **Activity Feed** - Real-time user action timeline
 * 6. **Smart Categorization** - Filter metrics by category
 * 7. **Visual Scoring** - Color-coded progress bars and badges
 * 8. **Responsive Layout** - Adapts from 1-6 column grid
 *
 * ## Real-World Use Cases
 *
 * - **Web Analytics** - Google Analytics-style dashboards
 * - **Business Intelligence** - KPI tracking and reporting
 * - **Marketing Dashboards** - Campaign and channel performance
 * - **SaaS Metrics** - User engagement and conversion tracking
 * - **Performance Monitoring** - System health and uptime tracking
 */
const meta = {
  title: 'Examples/AnalyticsDashboard',
  component: AnalyticsDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A data-focused analytics dashboard with real-time updates, performance tracking, and channel analysis. Demonstrates metric visualization, data tables, and activity feeds.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnalyticsDashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full Analytics Dashboard
 *
 * The complete analytics experience with real-time updates enabled.
 *
 * ## Try It Out
 *
 * 1. **Watch Live Updates**: Notice the pulsing green indicator and metrics updating every 5s
 * 2. **Change Time Range**: Switch between 24h, 7d, and 30d to see metric changes
 * 3. **Filter Performance**: Use category filter to view specific metric groups
 * 4. **Sort Data**: Click column headers in tables to sort
 * 5. **View Channels**: Switch to Channels tab for traffic source analysis
 * 6. **Track Activity**: View real-time team actions in Activity tab
 * 7. **Check Trends**: Observe up/down arrows and trend indicators
 * 8. **Analyze Conversion**: Compare conversion rates across channels
 *
 * ## Interactive Features
 *
 * - Automatic data refresh every 5 seconds
 * - Time range affects all displayed metrics
 * - Category filtering in performance view
 * - Sortable and searchable data tables
 * - Color-coded status indicators
 * - Responsive grid layouts
 */
export const Default: Story = {
  render: () => <AnalyticsDashboard />,
};

/**
 * Mobile View
 *
 * The dashboard adapts to mobile screens with single-column stat cards
 * and vertically stacked content for optimal readability.
 */
export const Mobile: Story = {
  render: () => <AnalyticsDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet View
 *
 * On tablets, stat cards use a 2-column grid, and tables remain
 * fully functional with horizontal scrolling if needed.
 */
export const Tablet: Story = {
  render: () => <AnalyticsDashboard />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Dark Mode
 *
 * The analytics dashboard adapts to dark mode with high-contrast
 * data visualization and properly colored trend indicators.
 */
export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <AnalyticsDashboard />
    </div>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

/**
 * Component Architecture
 *
 * ```
 * AnalyticsDashboard
 * ├─ Header Section
 * │  ├─ Title & Description
 * │  ├─ Live Update Indicator (pulsing dot)
 * │  └─ SegmentedControl - Time Range (24h/7d/30d)
 * │
 * ├─ Key Metrics Grid (6 StatCards)
 * │  ├─ Total Revenue (with trend)
 * │  ├─ Active Users (with trend)
 * │  ├─ Conversion Rate (with trend)
 * │  ├─ Avg Session Duration (with trend)
 * │  ├─ Page Views (with trend)
 * │  └─ Bounce Rate (with trend)
 * │
 * └─ Tabs
 *    ├─ Performance Tab
 *    │  └─ Card
 *    │     ├─ CardHeader
 *    │     │  ├─ Title & Description
 *    │     │  └─ SegmentedControl - Category Filter
 *    │     └─ CardBody
 *    │        └─ DataTable
 *    │           ├─ Metric Name & Category
 *    │           ├─ Current Score with Badge
 *    │           ├─ ProgressBar (color-coded)
 *    │           └─ Target Score
 *    │
 *    ├─ Channels Tab
 *    │  ├─ Card (DataTable)
 *    │  │  └─ Channel metrics with:
 *    │  │     ├─ Channel name with trend arrow
 *    │  │     ├─ Visitors count
 *    │  │     ├─ Conversions count
 *    │  │     ├─ Conversion Rate badge
 *    │  │     └─ Revenue (highlighted)
 *    │  │
 *    │  └─ Summary Cards Grid (3 cards)
 *    │     ├─ Total Visitors Card
 *    │     ├─ Total Conversions Card
 *    │     └─ Total Revenue Card
 *    │
 *    └─ Activity Tab
 *       └─ Card
 *          └─ Activity Feed List
 *             └─ For each activity:
 *                ├─ Avatar (with online status)
 *                ├─ User Name & Role
 *                ├─ Impact Badge (high/medium/low)
 *                ├─ Action Description
 *                ├─ Details
 *                └─ Timestamp
 * ```
 *
 * ## Data Flow
 *
 * 1. **Real-time Updates**:
 *    - `useEffect` hook sets up 5-second interval
 *    - Calls `generateMetrics()` with current time range
 *    - Updates all StatCard values automatically
 *    - Cleans up interval on unmount
 *
 * 2. **Time Range Selection**:
 *    - User selects time range (24h, 7d, 30d)
 *    - Immediately regenerates metrics with multiplier
 *    - All stat cards update with new values
 *    - Real-time updates continue with new range
 *
 * 3. **Performance Filtering**:
 *    - User selects category (All, Performance, UX, Security, etc.)
 *    - Table data filtered client-side
 *    - Maintains sorting and pagination state
 *
 * 4. **Status Color Coding**:
 *    - excellent (≥90): Success (green)
 *    - good (≥80): Info (blue)
 *    - fair (≥70): Warning (yellow)
 *    - poor (<70): Error (red)
 */
export const ComponentArchitecture: Story = {
  render: () => <AnalyticsDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'See the source code and component breakdown in the documentation above.',
      },
    },
  },
};

/**
 * Design Patterns
 *
 * This example demonstrates several advanced patterns:
 *
 * ## 1. Real-time Data Simulation
 * Uses `useEffect` with `setInterval` to simulate live data updates.
 * The live indicator (pulsing dot) provides visual feedback that data is fresh.
 * Clean-up function prevents memory leaks on unmount.
 *
 * ## 2. Responsive Grid Breakpoints
 * StatCard grid adapts across 5 breakpoints:
 * - Mobile (< 640px): 1 column (stacked)
 * - Tablet (≥ 640px): 2 columns
 * - Desktop (≥ 1024px): 3 columns
 * - Large (≥ 1280px): 6 columns (all visible)
 *
 * ## 3. Color-coded Data Visualization
 * Performance scores use consistent color mapping:
 * - ProgressBar color matches badge variant
 * - Provides instant visual status recognition
 * - Maintains accessibility with sufficient contrast
 *
 * ## 4. Multi-level Filtering
 * Channels tab combines multiple data views:
 * - Detailed table for granular analysis
 * - Summary cards for quick overview
 * - Both views share same data source
 *
 * ## 5. Temporal Data Comparison
 * All metrics include delta values showing change:
 * - Percentage change vs previous period
 * - Visual trend indicators (up/down/neutral)
 * - Contextual interpretation in StatCards
 *
 * ## 6. Activity Timeline Pattern
 * Activity feed demonstrates common timeline design:
 * - Avatar for user identification
 * - Timestamp for temporal context
 * - Impact level for prioritization
 * - Hover states for interactivity
 *
 * ## 7. Data Table Best Practices
 * Tables demonstrate production-ready patterns:
 * - Custom render functions for complex cells
 * - Right-aligned numeric columns
 * - Sortable columns for user control
 * - Search functionality for finding specific data
 * - Pagination for large datasets
 */
export const DesignPatterns: Story = {
  render: () => <AnalyticsDashboard />,
  parameters: {
    docs: {
      description: {
        story:
          'This dashboard showcases advanced analytics patterns including real-time updates, responsive grids, color-coded visualizations, and multi-view data presentation.',
      },
    },
  },
};

/**
 * Metric Calculation Details
 *
 * The dashboard uses a time range multiplier to simulate different data volumes:
 *
 * - **24h**: Base values × 0.5 (lower activity)
 * - **7d**: Base values × 1.0 (baseline)
 * - **30d**: Base values × 1.5 (accumulated activity)
 *
 * This simulates realistic behavior where longer time periods show higher totals
 * while maintaining consistent conversion rates and percentages.
 *
 * ## Performance Scoring
 *
 * Metrics are scored on a 0-100 scale with status thresholds:
 * - **Excellent**: 90-100 (Green)
 * - **Good**: 80-89 (Blue)
 * - **Fair**: 70-79 (Yellow)
 * - **Poor**: 0-69 (Red)
 *
 * ## Channel Metrics
 *
 * Conversion rate calculated as: `(conversions / visitors) × 100`
 *
 * Channels sorted by default by total visitors, but users can sort by any column.
 */
export const MetricDetails: Story = {
  render: () => <AnalyticsDashboard />,
  parameters: {
    docs: {
      description: {
        story:
          'Understanding the metric calculations and data simulation behind the dashboard.',
      },
    },
  },
};
