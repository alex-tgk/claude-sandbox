---
title: Tabs
category: organisms
description: * A fully accessible tabs implementation following WAI-ARIA authoring practices:
since: 0.1.0
---

# Tabs

* A fully accessible tabs implementation following WAI-ARIA authoring practices:

## Installation

```tsx
import { Tabs } from '@your-org/ui-library';
```

## Props


| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `variant` | `TabsVariant` | `horizontal` | No | /* Visual variant of the tabs |
| `orientation` | `TabsOrientation` | - | No | /* Orientation of the tab list |
| `value` | `string` | `First tab will be active` | No | /* Controlled active tab value |
| `defaultValue` | `string` | - | No | /* Default active tab value for uncontrolled usage |
| `onChange` | `(value: string) => void` | `false` | No | /* Callback when active tab changes |
| `disabled` | `boolean` | - | No | /* Whether all tabs are disabled |
| `children` | `ReactNode` | - | Yes | /* Child components (TabList and TabPanels) |



## Variants

Available variants: `line`, `enclosed`, `pills`




## Examples


### Default

/**

```tsx
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
```


### Variants

/**

```tsx
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
```


### With Icons

/**

```tsx
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
```


### Vertical Orientation

/**

```tsx
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
```


### With Disabled Tabs

/**

```tsx
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
```


## Accessibility

### Keyboard Navigation

'Organisms/Tabs',

### Screen Reader Support

'Organisms/Tabs',

### Wcag Compliance

WCAG 2.2 AA compliant

### Aria Attributes

- `aria-label`
- `aria-orientation`
- `aria-disabled`
- `aria-selected`
- `aria-controls`
- `aria-labelledby`

### Focus Management

Includes focus management


This component is WCAG 2.2 AA compliant.

## Related Components

See also: [Component Catalog](../catalog.md)

---

**File Location:** `src/components/organisms/tabs/Tabs.tsx`
**Stories:** `src/components/organisms/tabs/Tabs.stories.tsx`
