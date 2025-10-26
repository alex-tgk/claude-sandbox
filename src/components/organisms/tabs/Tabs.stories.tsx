import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

/**
 * Tabs component for organizing content into separate panels.
 *
 * ## Usage
 *
 * Use tabs to organize related content and allow users to switch between
 * different views or sections without leaving the page. Tabs are ideal for
 * settings panels, dashboards, and content categorization.
 *
 * ## Accessibility
 *
 * - Full keyboard navigation with arrow keys, Home, and End
 * - Screen reader support with proper ARIA roles and attributes
 * - Focus management follows WAI-ARIA authoring practices
 * - WCAG 2.2 AA compliant with proper color contrast
 * - Supports both horizontal and vertical orientations
 */
const meta = {
  title: 'Organisms/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'enclosed', 'pills'],
      description: 'Visual style variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab list orientation',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all tabs',
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tabs with line variant (underline style)
 */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList aria-label="Example tabs">
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel value="tab1">
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">Content for Tab 1</h3>
          <p>This is the content displayed when Tab 1 is active.</p>
        </div>
      </TabPanel>
      <TabPanel value="tab2">
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">Content for Tab 2</h3>
          <p>This is the content displayed when Tab 2 is active.</p>
        </div>
      </TabPanel>
      <TabPanel value="tab3">
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold">Content for Tab 3</h3>
          <p>This is the content displayed when Tab 3 is active.</p>
        </div>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * All three visual variants displayed together
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-text-muted">Line Variant</h3>
        <Tabs defaultValue="home" variant="line">
          <TabList aria-label="Line variant">
            <Tab value="home">Home</Tab>
            <Tab value="profile">Profile</Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="home">
            <div className="p-4">Home content with underline indicator</div>
          </TabPanel>
          <TabPanel value="profile">
            <div className="p-4">Profile content</div>
          </TabPanel>
          <TabPanel value="settings">
            <div className="p-4">Settings content</div>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-text-muted">Enclosed Variant</h3>
        <Tabs defaultValue="home" variant="enclosed">
          <TabList aria-label="Enclosed variant">
            <Tab value="home">Home</Tab>
            <Tab value="profile">Profile</Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="home">
            <div className="rounded-b-md border border-t-0 border-border p-4">
              Home content with enclosed style
            </div>
          </TabPanel>
          <TabPanel value="profile">
            <div className="rounded-b-md border border-t-0 border-border p-4">
              Profile content
            </div>
          </TabPanel>
          <TabPanel value="settings">
            <div className="rounded-b-md border border-t-0 border-border p-4">
              Settings content
            </div>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-text-muted">Pills Variant</h3>
        <Tabs defaultValue="home" variant="pills">
          <TabList aria-label="Pills variant">
            <Tab value="home">Home</Tab>
            <Tab value="profile">Profile</Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="home">
            <div className="p-4">Home content with pill-shaped tabs</div>
          </TabPanel>
          <TabPanel value="profile">
            <div className="p-4">Profile content</div>
          </TabPanel>
          <TabPanel value="settings">
            <div className="p-4">Settings content</div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  ),
};

/**
 * Tabs with icons for better visual identification
 */
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabList aria-label="Navigation with icons">
        <Tab
          value="home"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 6L8 2L14 6V13C14 13.5304 13.7893 14.0391 13.4142 14.4142C13.0391 14.7893 12.5304 15 12 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Home
        </Tab>
        <Tab
          value="user"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 14V12.6667C13 11.9594 12.719 11.2811 12.219 10.781C11.7189 10.281 11.0406 10 10.3333 10H5.66667C4.95942 10 4.28115 10.281 3.78105 10.781C3.28095 11.2811 3 11.9594 3 12.6667V14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 7.33333C9.47276 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.47276 2 8 2C6.52724 2 5.33333 3.19391 5.33333 4.66667C5.33333 6.13943 6.52724 7.33333 8 7.33333Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Profile
        </Tab>
        <Tab
          value="settings"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.9333 10C12.8444 10.2056 12.8185 10.4334 12.8589 10.6547C12.8992 10.876 13.004 11.0806 13.16 11.2467L13.1933 11.28C13.3172 11.4037 13.4156 11.5511 13.4826 11.7135C13.5497 11.8759 13.5842 12.0501 13.5842 12.2261C13.5842 12.4022 13.5497 12.5764 13.4826 12.7388C13.4156 12.9012 13.3172 13.0486 13.1933 13.1723C13.0696 13.2962 12.9222 13.3946 12.7598 13.4617C12.5974 13.5287 12.4232 13.5632 12.2471 13.5632C12.0711 13.5632 11.8969 13.5287 11.7345 13.4617C11.5721 13.3946 11.4247 13.2962 11.301 13.1723L11.2677 13.139C11.1016 12.983 10.897 12.8782 10.6757 12.8379C10.4544 12.7975 10.2266 12.8234 10.021 12.9123C9.81988 13.0011 9.64909 13.1488 9.52867 13.3369C9.40825 13.525 9.34338 13.7453 9.34233 13.9707V14.0667C9.34233 14.4203 9.20186 14.7594 8.95181 15.0095C8.70176 15.2595 8.36266 15.4 8.009 15.4C7.65534 15.4 7.31625 15.2595 7.0662 15.0095C6.81615 14.7594 6.67567 14.4203 6.67567 14.0667V14.0133C6.66704 13.7786 6.5913 13.5516 6.45728 13.3588C6.32326 13.166 6.13662 13.0158 5.92033 12.9257C5.71473 12.8367 5.48696 12.8109 5.26565 12.8512C5.04435 12.8916 4.83976 12.9964 4.67367 13.1523L4.64033 13.1857C4.51663 13.3096 4.36923 13.408 4.20682 13.475C4.04442 13.5421 3.87022 13.5766 3.69417 13.5766C3.51812 13.5766 3.34392 13.5421 3.18151 13.475C3.01911 13.408 2.87171 13.3096 2.748 13.1857C2.62411 13.062 2.52574 12.9146 2.45868 12.7522C2.39162 12.5898 2.35714 12.4156 2.35714 12.2396C2.35714 12.0635 2.39162 11.8893 2.45868 11.7269C2.52574 11.5645 2.62411 11.4171 2.748 11.2934L2.78133 11.26C2.93729 11.0939 3.04212 10.8894 3.08246 10.6681C3.12281 10.4468 3.09692 10.219 3.00800 10.0134C2.91919 9.81229 2.77151 9.64151 2.58339 9.52109C2.39527 9.40067 2.17501 9.3358 1.94967 9.33475H1.85367C1.50001 9.33475 1.16091 9.19427 0.910861 8.94422C0.660811 8.69417 0.520332 8.35508 0.520332 8.00142C0.520332 7.64776 0.660811 7.30866 0.910861 7.05861C1.16091 6.80856 1.50001 6.66808 1.85367 6.66808H1.907C2.14166 6.65946 2.36868 6.58372 2.5615 6.4497C2.75432 6.31567 2.90449 6.12904 2.99467 5.91275C3.08358 5.70715 3.10947 5.47938 3.06913 5.25808C3.02878 5.03677 2.92395 4.83218 2.768 4.66608L2.73467 4.63275C2.61078 4.50904 2.5124 4.36164 2.44535 4.19924C2.37829 4.03683 2.3438 3.86263 2.3438 3.68658C2.3438 3.51053 2.37829 3.33633 2.44535 3.17393C2.5124 3.01152 2.61078 2.86412 2.73467 2.74042C2.85837 2.61652 3.00577 2.51815 3.16818 2.4511C3.33058 2.38404 3.50479 2.34955 3.68083 2.34955C3.85688 2.34955 4.03108 2.38404 4.19349 2.4511C4.35589 2.51815 4.50329 2.61652 4.627 2.74042L4.66033 2.77375C4.82643 2.9297 5.03102 3.03454 5.25232 3.07488C5.47363 3.11522 5.7014 3.08933 5.907 3.00042H5.94033C6.1414 2.9116 6.31218 2.76392 6.43261 2.5758C6.55303 2.38768 6.61789 2.16742 6.61895 1.94208V1.84608C6.61895 1.49242 6.75943 1.15332 7.00948 0.903274C7.25953 0.653224 7.59862 0.512747 7.95228 0.512747C8.30594 0.512747 8.64504 0.653224 8.89509 0.903274C9.14514 1.15332 9.28562 1.49242 9.28562 1.84608V1.89942C9.28667 2.12475 9.35154 2.34502 9.47196 2.53313C9.59238 2.72125 9.76316 2.86893 9.96423 2.95775C10.1698 3.04667 10.3976 3.07256 10.6189 3.03221C10.8402 2.99187 11.0448 2.88704 11.2109 2.73108L11.2442 2.69775C11.3679 2.57386 11.5153 2.47548 11.6777 2.40843C11.8401 2.34137 12.0143 2.30688 12.1904 2.30688C12.3664 2.30688 12.5406 2.34137 12.703 2.40843C12.8654 2.47548 13.0128 2.57386 13.1365 2.69775C13.2604 2.82145 13.3588 2.96885 13.4258 3.13126C13.4929 3.29366 13.5274 3.46787 13.5274 3.64392C13.5274 3.81996 13.4929 3.99417 13.4258 4.15657C13.3588 4.31898 13.2604 4.46638 13.1365 4.59008L13.1032 4.62342C12.9472 4.78951 12.8424 4.9941 12.802 5.21541C12.7617 5.43671 12.7876 5.66448 12.8765 5.87008V5.90342C12.9653 6.10449 13.113 6.27527 13.3011 6.3957C13.4892 6.51612 13.7095 6.58098 13.9348 6.58208H14.0308C14.3845 6.58208 14.7236 6.72256 14.9736 6.97261C15.2237 7.22266 15.3641 7.56176 15.3641 7.91542C15.3641 8.26907 15.2237 8.60817 14.9736 8.85822C14.7236 9.10827 14.3845 9.24875 14.0308 9.24875H13.9775C13.7522 9.2498 13.5319 9.31467 13.3438 9.43509C13.1557 9.55551 13.008 9.72629 12.9192 9.92737V10C12.8303 10.2056 12.8044 10.4334 12.8448 10.6547C12.8851 10.876 12.9899 11.0806 13.146 11.2467L13.1793 11.28"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
        >
          Settings
        </Tab>
      </TabList>
      <TabPanel value="home">
        <div className="p-4">Home dashboard content</div>
      </TabPanel>
      <TabPanel value="user">
        <div className="p-4">User profile settings</div>
      </TabPanel>
      <TabPanel value="settings">
        <div className="p-4">Application settings</div>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * Vertical orientation for sidebar navigation
 */
export const VerticalOrientation: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical" variant="line">
      <TabList aria-label="Vertical navigation">
        <Tab value="overview">Overview</Tab>
        <Tab value="analytics">Analytics</Tab>
        <Tab value="reports">Reports</Tab>
        <Tab value="team">Team</Tab>
      </TabList>
      <TabPanel value="overview">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Overview</h2>
          <p>Dashboard overview content with key metrics and summaries.</p>
        </div>
      </TabPanel>
      <TabPanel value="analytics">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Analytics</h2>
          <p>Detailed analytics and performance metrics.</p>
        </div>
      </TabPanel>
      <TabPanel value="reports">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Reports</h2>
          <p>Generated reports and export options.</p>
        </div>
      </TabPanel>
      <TabPanel value="team">
        <div className="p-6">
          <h2 className="mb-4 text-xl font-semibold">Team</h2>
          <p>Team members and collaboration settings.</p>
        </div>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * Tabs with disabled state (some tabs disabled)
 */
export const WithDisabledTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList aria-label="Tabs with disabled items">
        <Tab value="tab1">Available</Tab>
        <Tab value="tab2" disabled>
          Disabled
        </Tab>
        <Tab value="tab3">Available</Tab>
        <Tab value="tab4" disabled>
          Disabled
        </Tab>
      </TabList>
      <TabPanel value="tab1">
        <div className="p-4">This tab is available and can be selected.</div>
      </TabPanel>
      <TabPanel value="tab2">
        <div className="p-4">This content is not accessible.</div>
      </TabPanel>
      <TabPanel value="tab3">
        <div className="p-4">Another available tab.</div>
      </TabPanel>
      <TabPanel value="tab4">
        <div className="p-4">This content is also not accessible.</div>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * Fully disabled tabs
 */
export const AllDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1" disabled>
      <TabList aria-label="All tabs disabled">
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <TabPanel value="tab1">
        <div className="p-4">All tabs are disabled.</div>
      </TabPanel>
      <TabPanel value="tab2">
        <div className="p-4">Cannot switch tabs.</div>
      </TabPanel>
      <TabPanel value="tab3">
        <div className="p-4">All interaction disabled.</div>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * Controlled tabs with external state management
 */
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('settings');

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className="rounded bg-brand-600 px-3 py-1 text-sm text-white hover:bg-brand-700"
          >
            Go to Home
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="rounded bg-brand-600 px-3 py-1 text-sm text-white hover:bg-brand-700"
          >
            Go to Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className="rounded bg-brand-600 px-3 py-1 text-sm text-white hover:bg-brand-700"
          >
            Go to Settings
          </button>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab}>
          <TabList aria-label="Controlled tabs example">
            <Tab value="home">Home</Tab>
            <Tab value="profile">Profile</Tab>
            <Tab value="settings">Settings</Tab>
          </TabList>
          <TabPanel value="home">
            <div className="p-4">
              <p>Home content. Current tab: {activeTab}</p>
            </div>
          </TabPanel>
          <TabPanel value="profile">
            <div className="p-4">
              <p>Profile content. Current tab: {activeTab}</p>
            </div>
          </TabPanel>
          <TabPanel value="settings">
            <div className="p-4">
              <p>Settings content. Current tab: {activeTab}</p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    );
  },
};

/**
 * Complex content in tab panels
 */
export const ComplexContent: Story = {
  render: () => (
    <Tabs defaultValue="form" variant="pills">
      <TabList aria-label="Complex content example">
        <Tab value="form">Form</Tab>
        <Tab value="table">Table</Tab>
        <Tab value="chart">Chart</Tab>
      </TabList>
      <TabPanel value="form">
        <div className="space-y-4 p-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full rounded border border-border px-3 py-2"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded border border-border px-3 py-2"
              placeholder="Enter your email"
            />
          </div>
          <button className="rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
            Submit
          </button>
        </div>
      </TabPanel>
      <TabPanel value="table">
        <div className="p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 text-left">Name</th>
                <th className="pb-2 text-left">Status</th>
                <th className="pb-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="py-2">John Doe</td>
                <td className="py-2">Active</td>
                <td className="py-2">Admin</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">Jane Smith</td>
                <td className="py-2">Active</td>
                <td className="py-2">User</td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPanel>
      <TabPanel value="chart">
        <div className="p-4">
          <div className="flex h-48 items-end justify-around gap-2">
            <div className="h-3/4 w-16 rounded-t bg-brand-600"></div>
            <div className="h-1/2 w-16 rounded-t bg-brand-600"></div>
            <div className="h-full w-16 rounded-t bg-brand-600"></div>
            <div className="h-2/3 w-16 rounded-t bg-brand-600"></div>
          </div>
          <p className="mt-4 text-center text-sm text-text-muted">Sample Chart Visualization</p>
        </div>
      </TabPanel>
    </Tabs>
  ),
};

/**
 * All variants with vertical orientation
 */
export const VerticalVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8">
      <div>
        <h3 className="mb-4 text-sm font-medium text-text-muted">Line</h3>
        <Tabs defaultValue="tab1" orientation="vertical" variant="line">
          <TabList aria-label="Vertical line">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">
            <div className="p-4">Content 1</div>
          </TabPanel>
          <TabPanel value="tab2">
            <div className="p-4">Content 2</div>
          </TabPanel>
          <TabPanel value="tab3">
            <div className="p-4">Content 3</div>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-text-muted">Enclosed</h3>
        <Tabs defaultValue="tab1" orientation="vertical" variant="enclosed">
          <TabList aria-label="Vertical enclosed">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">
            <div className="p-4">Content 1</div>
          </TabPanel>
          <TabPanel value="tab2">
            <div className="p-4">Content 2</div>
          </TabPanel>
          <TabPanel value="tab3">
            <div className="p-4">Content 3</div>
          </TabPanel>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-text-muted">Pills</h3>
        <Tabs defaultValue="tab1" orientation="vertical" variant="pills">
          <TabList aria-label="Vertical pills">
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <TabPanel value="tab1">
            <div className="p-4">Content 1</div>
          </TabPanel>
          <TabPanel value="tab2">
            <div className="p-4">Content 2</div>
          </TabPanel>
          <TabPanel value="tab3">
            <div className="p-4">Content 3</div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  ),
};
