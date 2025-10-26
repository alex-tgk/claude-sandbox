import type { Meta, StoryObj } from '@storybook/react';
import { SettingsProfile } from './SettingsProfile';

/**
 * SettingsProfile - Settings & Profile Management Example
 *
 * A comprehensive settings interface demonstrating:
 * - Form-heavy interface with multiple input types
 * - Tabbed organization for different settings sections
 * - Profile editing with avatar and personal information
 * - Save/cancel workflow with change detection
 * - Real-time feedback with notifications and alerts
 * - Security and privacy controls
 *
 * ## Components Used
 *
 * ### Form Controls (10+ different inputs)
 * - **Input** - Text, email, tel, url, password fields
 * - **TextArea** - Multi-line bio with character counter
 * - **Checkbox** - Binary preference toggles
 * - **Switch** - Channel and interaction toggles
 * - **Radio/RadioGroup** - Profile visibility selection
 * - **Button** - Save, cancel, and action buttons
 *
 * ### Layout & Structure
 * - **Tabs** - 4 sections (Profile, Account, Notifications, Privacy)
 * - **Card** - Settings section containers
 * - **Divider** - Visual separation within cards
 *
 * ### Display & Feedback
 * - **Avatar** - Profile picture display
 * - **Badge** - Unsaved changes indicator, status badges
 * - **Alert** - Unsaved changes warning
 * - **NotificationToast** - Save/cancel confirmations
 *
 * ## Key Features
 *
 * 1. **Change Detection** - Tracks when any field is modified
 * 2. **Unsaved Changes Warning** - Alert banner when changes exist
 * 3. **Sticky Action Bar** - Save/Cancel buttons always accessible
 * 4. **Form Validation** - Required fields and helper text
 * 5. **Character Counting** - Real-time bio character count
 * 6. **Loading States** - Button spinner during save
 * 7. **Toast Notifications** - Feedback for all actions
 * 8. **Organized Sections** - Logical grouping via tabs
 * 9. **Security Features** - Password change, 2FA setup
 * 10. **Privacy Controls** - Granular visibility settings
 *
 * ## Real-World Use Cases
 *
 * - **User Profiles** - Social media, professional networks
 * - **Account Settings** - SaaS applications
 * - **Admin Panels** - User management interfaces
 * - **E-Commerce** - Customer account preferences
 * - **Team Collaboration** - Workspace settings
 */
const meta = {
  title: 'Examples/SettingsProfile',
  component: SettingsProfile,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A production-ready settings and profile management interface with comprehensive form controls, change tracking, and user feedback. Demonstrates complex form handling and state management.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SettingsProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full Settings Interface
 *
 * The complete settings experience with all tabs and features.
 *
 * ## Try It Out
 *
 * 1. **Edit Profile**: Change any field in the Profile tab
 * 2. **See Change Detection**: Notice "Unsaved Changes" badge appears
 * 3. **View Warning**: Alert banner warns about unsaved changes
 * 4. **Navigate Tabs**: Switch between Profile, Account, Notifications, Privacy
 * 5. **Toggle Switches**: Try notification and privacy switches
 * 6. **Change Radio Options**: Select different profile visibility levels
 * 7. **Check Checkboxes**: Enable/disable various preferences
 * 8. **Save Changes**: Click "Save Changes" to see success toast
 * 9. **Cancel Changes**: Click "Cancel" to reset and see info toast
 * 10. **Character Counter**: Type in bio field to see live character count
 *
 * ## Interactive Features
 *
 * - Real-time change detection across all tabs
 * - Disabled save button when no changes
 * - Loading state during save operation
 * - Toast notifications for user actions
 * - Sticky action bar at bottom
 * - Form validation and helper text
 * - Character limits on text areas
 */
export const Default: Story = {
  render: () => <SettingsProfile />,
};

/**
 * Mobile View
 *
 * The settings interface adapts to mobile screens with:
 * - Single-column layouts for all forms
 * - Full-width input fields
 * - Stacked buttons (Cancel on top, Save below)
 * - Responsive tab navigation
 */
export const Mobile: Story = {
  render: () => <SettingsProfile />,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Tablet View
 *
 * On tablets, forms use 2-column grids where appropriate
 * (first/last name, company/position) while maintaining
 * readability and touch targets.
 */
export const Tablet: Story = {
  render: () => <SettingsProfile />,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
};

/**
 * Dark Mode
 *
 * The settings interface adapts to dark mode with proper
 * contrast for form fields, labels, and helper text.
 */
export const DarkMode: Story = {
  render: () => (
    <div className="dark">
      <SettingsProfile />
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
 * SettingsProfile
 * ├─ Header Section
 * │  ├─ Title & Description
 * │  └─ Badge - Unsaved Changes (conditional)
 * │
 * ├─ Alert - Unsaved Changes Warning (conditional)
 * │
 * └─ Tabs
 *    ├─ Profile Tab
 *    │  ├─ Profile Picture Card
 *    │  │  ├─ Avatar (2xl size)
 *    │  │  ├─ Upload Instructions
 *    │  │  └─ Buttons (Upload, Remove)
 *    │  │
 *    │  ├─ Personal Information Card
 *    │  │  ├─ Input - First Name
 *    │  │  ├─ Input - Last Name
 *    │  │  ├─ Input - Email (with helper text)
 *    │  │  ├─ Input - Phone
 *    │  │  └─ TextArea - Bio (with character count)
 *    │  │
 *    │  └─ Professional Information Card
 *    │     ├─ Input - Company
 *    │     ├─ Input - Position
 *    │     ├─ Input - Location
 *    │     └─ Input - Website
 *    │
 *    ├─ Account Tab
 *    │  ├─ Password Card
 *    │  │  ├─ Input - Current Password
 *    │  │  ├─ Divider
 *    │  │  ├─ Input - New Password (with helper)
 *    │  │  ├─ Input - Confirm Password
 *    │  │  └─ CardFooter with Button
 *    │  │
 *    │  ├─ Two-Factor Authentication Card
 *    │  │  ├─ Status Badge (Disabled)
 *    │  │  ├─ Benefits List (with checkmarks)
 *    │  │  └─ Enable Button
 *    │  │
 *    │  └─ Danger Zone Card (red border)
 *    │     └─ Delete Account Section
 *    │
 *    ├─ Notifications Tab
 *    │  ├─ Notification Channels Card
 *    │  │  ├─ Switch - Email Notifications
 *    │  │  ├─ Switch - Push Notifications
 *    │  │  └─ Switch - SMS Notifications
 *    │  │
 *    │  ├─ Activity Notifications Card
 *    │  │  ├─ Checkbox - Mentions
 *    │  │  └─ Checkbox - Comments
 *    │  │
 *    │  └─ Marketing & Updates Card
 *    │     ├─ Checkbox - Marketing Emails
 *    │     ├─ Checkbox - Product Updates
 *    │     └─ Checkbox - Weekly Digest
 *    │
 *    └─ Privacy Tab
 *       ├─ Profile Visibility Card
 *       │  └─ RadioGroup
 *       │     ├─ Radio - Public
 *       │     ├─ Radio - Contacts Only
 *       │     └─ Radio - Private
 *       │
 *       ├─ Contact Information Card
 *       │  ├─ Checkbox - Show Email
 *       │  └─ Checkbox - Show Phone
 *       │
 *       ├─ Interaction Preferences Card
 *       │  ├─ Switch - Allow Messaging
 *       │  └─ Switch - Allow Tagging
 *       │
 *       └─ Data & Privacy Card
 *          ├─ Checkbox - Analytics Data
 *          └─ Checkbox - Third-Party Sharing
 *
 * Sticky Action Bar (bottom)
 * └─ Card
 *    ├─ Button - Cancel
 *    └─ Button - Save Changes (with loading)
 *
 * Notifications (fixed bottom-right)
 * └─ NotificationToast Stack
 * ```
 *
 * ## State Management
 *
 * 1. **Profile State** (`profile`):
 *    - firstName, lastName, email, phone
 *    - bio, company, position, location, website
 *
 * 2. **Notifications State** (`notifications`):
 *    - emailNotifications, pushNotifications, smsNotifications
 *    - marketingEmails, productUpdates, weeklyDigest
 *    - mentionNotifications, commentNotifications
 *
 * 3. **Privacy State** (`privacy`):
 *    - profileVisibility (public/contacts/private)
 *    - showEmail, showPhone
 *    - allowMessaging, allowTagging
 *    - dataCollection, thirdPartySharing
 *
 * 4. **UI State**:
 *    - `hasChanges` - Tracks if any field modified
 *    - `isSaving` - Loading state during save
 *    - `toasts` - Notification queue
 *
 * ## Change Detection Logic
 *
 * Every update function calls `setHasChanges(true)`:
 * - `updateProfile()` - For profile fields
 * - `updateNotifications()` - For notification toggles
 * - `updatePrivacy()` - For privacy settings
 *
 * Changes persist across tab navigation.
 *
 * ## Save/Cancel Flow
 *
 * **Save**:
 * 1. Set `isSaving` to true (shows spinner)
 * 2. Simulate API call (1 second delay)
 * 3. Set `hasChanges` to false
 * 4. Show success toast
 * 5. Set `isSaving` to false
 *
 * **Cancel**:
 * 1. Reset all state to initial values
 * 2. Set `hasChanges` to false
 * 3. Show info toast
 */
export const ComponentArchitecture: Story = {
  render: () => <SettingsProfile />,
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
 * This example demonstrates several important patterns:
 *
 * ## 1. Form State Management
 * Each settings category has its own state object:
 * - Profile: Personal and professional information
 * - Notifications: Preference toggles
 * - Privacy: Visibility and data settings
 *
 * Updates use dedicated functions that automatically trigger change detection.
 *
 * ## 2. Change Detection & Confirmation
 * The `hasChanges` flag:
 * - Enables/disables save button
 * - Shows warning badge in header
 * - Displays alert banner
 * - Could trigger browser "unsaved changes" warning
 *
 * ## 3. Sticky Action Bar
 * Save/Cancel buttons use sticky positioning:
 * - Always visible while scrolling
 * - Clear call-to-action
 * - Disabled states prevent invalid actions
 * - Loading state provides feedback
 *
 * ## 4. Progressive Disclosure
 * Settings organized into logical tabs:
 * - Profile: Identity and bio
 * - Account: Security and authentication
 * - Notifications: Communication preferences
 * - Privacy: Visibility and data controls
 *
 * Each tab focuses on a specific domain.
 *
 * ## 5. Inline Helper Text
 * Every form field includes contextual help:
 * - Input requirements (password rules)
 * - Character counts (bio field)
 * - Feature descriptions (checkbox labels)
 * - Privacy implications (data sharing)
 *
 * ## 6. Visual Hierarchy for Danger
 * Destructive actions clearly distinguished:
 * - Red border on Danger Zone card
 * - Red background tint in header
 * - Error-variant button
 * - Separated from other settings
 *
 * ## 7. Multi-notification Queue
 * Toast notifications stack vertically:
 * - Auto-dismiss after 3 seconds
 * - User can manually dismiss
 * - Multiple can appear simultaneously
 * - Slide-in animation for each
 *
 * ## 8. Consistent Field Grouping
 * Related fields grouped in cards:
 * - Name fields in 2-column grid
 * - Contact info together
 * - Professional info grouped
 * - Channel toggles separated by dividers
 *
 * ## 9. Accessibility Considerations
 * - All inputs have labels
 * - Helper text provides context
 * - Required fields marked
 * - Radio groups use semantic markup
 * - Switch labels describe purpose
 * - Error states would use ARIA
 */
export const DesignPatterns: Story = {
  render: () => <SettingsProfile />,
  parameters: {
    docs: {
      description: {
        story:
          'This settings interface demonstrates production-ready patterns for complex forms, including change detection, validation, user feedback, and organized information architecture.',
      },
    },
  },
};

/**
 * Form Validation Examples
 *
 * While this example uses basic required field validation,
 * a production implementation would include:
 *
 * ## Email Validation
 * ```tsx
 * const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 * const isValidEmail = emailRegex.test(profile.email);
 * ```
 *
 * ## Password Strength
 * ```tsx
 * const hasUpperCase = /[A-Z]/.test(password);
 * const hasLowerCase = /[a-z]/.test(password);
 * const hasNumber = /[0-9]/.test(password);
 * const isLongEnough = password.length >= 8;
 * ```
 *
 * ## Phone Number Format
 * ```tsx
 * const phoneRegex = /^\+?[1-9]\d{1,14}$/;
 * const isValidPhone = phoneRegex.test(profile.phone);
 * ```
 *
 * ## URL Validation
 * ```tsx
 * try {
 *   new URL(profile.website);
 *   return true;
 * } catch {
 *   return false;
 * }
 * ```
 *
 * ## Character Limits
 * The bio field demonstrates real-time character counting
 * with a 500 character maximum enforced via `maxLength`.
 */
export const ValidationPatterns: Story = {
  render: () => <SettingsProfile />,
  parameters: {
    docs: {
      description: {
        story:
          'Form validation patterns that would enhance this example in a production environment.',
      },
    },
  },
};
