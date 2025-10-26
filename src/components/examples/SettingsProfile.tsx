import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  TextArea,
  Checkbox,
  Switch,
  Radio,
  RadioGroup,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Avatar,
  NotificationToast,
  Alert,
  Badge,
  Divider,
} from '../index';

/**
 * SettingsProfile - Settings & Profile Management Example
 *
 * @remarks
 * This example demonstrates a comprehensive settings interface with:
 * - Form-heavy interface with multiple input types
 * - Multiple tabs for different settings sections
 * - Profile editing with avatar and personal information
 * - Save/cancel actions with feedback
 * - Form validation and error handling
 *
 * Components Used:
 * - Input, TextArea, Checkbox, Switch, Radio, Button, Tabs, Card,
 *   Avatar, NotificationToast, Alert
 *
 * @example
 * ```tsx
 * <SettingsProfile />
 * ```
 */

// Types
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
  company: string;
  position: string;
  location: string;
  website: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  productUpdates: boolean;
  weeklyDigest: boolean;
  mentionNotifications: boolean;
  commentNotifications: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'contacts';
  showEmail: boolean;
  showPhone: boolean;
  allowMessaging: boolean;
  allowTagging: boolean;
  dataCollection: boolean;
  thirdPartySharing: boolean;
}

interface Notification {
  id: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  description: string;
}

// Initial data
const initialProfile: ProfileData = {
  firstName: 'Alex',
  lastName: 'Johnson',
  email: 'alex.johnson@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'Senior Product Designer with 8+ years of experience creating user-centered digital experiences. Passionate about design systems and accessibility.',
  company: 'Design Studio Inc.',
  position: 'Senior Product Designer',
  location: 'San Francisco, CA',
  website: 'https://alexjohnson.design',
};

const initialNotifications: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  marketingEmails: false,
  productUpdates: true,
  weeklyDigest: true,
  mentionNotifications: true,
  commentNotifications: true,
};

const initialPrivacy: PrivacySettings = {
  profileVisibility: 'public',
  showEmail: false,
  showPhone: false,
  allowMessaging: true,
  allowTagging: true,
  dataCollection: true,
  thirdPartySharing: false,
};

export function SettingsProfile() {
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [notifications, setNotifications] = useState<NotificationSettings>(initialNotifications);
  const [privacy, setPrivacy] = useState<PrivacySettings>(initialPrivacy);
  const [hasChanges, setHasChanges] = useState(false);
  const [toasts, setToasts] = useState<Notification[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfile = (field: keyof ProfileData, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const updateNotifications = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const updatePrivacy = (field: keyof PrivacySettings, value: boolean | string) => {
    setPrivacy((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const showToast = (notification: Omit<Notification, 'id'>) => {
    const toast = { ...notification, id: `toast-${Date.now()}` };
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaving(false);
    setHasChanges(false);
    showToast({
      variant: 'success',
      title: 'Settings Saved',
      description: 'Your changes have been saved successfully.',
    });
  };

  const handleCancel = () => {
    setProfile(initialProfile);
    setNotifications(initialNotifications);
    setPrivacy(initialPrivacy);
    setHasChanges(false);
    showToast({
      variant: 'info',
      title: 'Changes Discarded',
      description: 'All changes have been reset to saved values.',
    });
  };

  return (
    <div className="min-h-screen bg-layer-01 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-text-primary lg:text-4xl">
              Settings & Profile
            </h1>
            <p className="text-sm text-text-secondary sm:text-base">
              Manage your account settings and preferences
            </p>
          </div>
          {hasChanges && (
            <Badge variant="warning" className="self-start">
              Unsaved Changes
            </Badge>
          )}
        </div>
      </div>

      {/* Unsaved Changes Alert */}
      {hasChanges && (
        <Alert variant="warning" className="mb-6 border-l-4 border-l-warning">
          <div className="flex items-start gap-3">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1">
              <p className="font-semibold">You have unsaved changes</p>
              <p className="mt-1 text-sm">
                Remember to save your changes before leaving this page.
              </p>
            </div>
          </div>
        </Alert>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabList className="border-b border-border-subtle">
          <Tab value="profile">Profile</Tab>
          <Tab value="account">Account</Tab>
          <Tab value="notifications">Notifications</Tab>
          <Tab value="privacy">Privacy</Tab>
        </TabList>

        {/* Profile Tab */}
        <TabPanel value="profile" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="space-y-6">
            {/* Profile Picture Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Profile Picture</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Update your avatar to personalize your profile
                </p>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <Avatar size="lg" className="bg-brand-60 text-white">
                    {profile.firstName[0]}
                    {profile.lastName[0]}
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <p className="text-sm text-text-secondary">
                      Upload a profile picture to help others recognize you
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="primary" size="sm">
                        Upload Photo
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-text-disabled">
                      JPG, PNG or GIF. Max size 5MB.
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>

            {/* Personal Information Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Personal Information</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Update your personal details and contact information
                </p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="First Name"
                    value={profile.firstName}
                    onChange={(e) => updateProfile('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                  <Input
                    label="Last Name"
                    value={profile.lastName}
                    onChange={(e) => updateProfile('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <Input
                  label="Email Address"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  helperText="This email will be used for account notifications"
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
                <TextArea
                  label="Bio"
                  value={profile.bio}
                  onChange={(e) => updateProfile('bio', e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  helperText={`${profile.bio.length}/500 characters`}
                  maxLength={500}
                />
              </CardBody>
            </Card>

            {/* Professional Information Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Professional Information</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Share your work details and expertise
                </p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="Company"
                    value={profile.company}
                    onChange={(e) => updateProfile('company', e.target.value)}
                    placeholder="Your company name"
                  />
                  <Input
                    label="Position"
                    value={profile.position}
                    onChange={(e) => updateProfile('position', e.target.value)}
                    placeholder="Your job title"
                  />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Input
                    label="Location"
                    value={profile.location}
                    onChange={(e) => updateProfile('location', e.target.value)}
                    placeholder="City, State/Country"
                  />
                  <Input
                    label="Website"
                    type="url"
                    value={profile.website}
                    onChange={(e) => updateProfile('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </TabPanel>

        {/* Account Tab */}
        <TabPanel value="account" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="space-y-6">
            {/* Password Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Password</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Update your password to keep your account secure
                </p>
              </CardHeader>
              <CardBody className="space-y-6">
                <Input
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  required
                />
                <Divider />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="Enter new password"
                  helperText="Must be at least 8 characters with uppercase, lowercase, and numbers"
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  placeholder="Re-enter new password"
                  required
                />
              </CardBody>
              <CardFooter className="border-t border-border-subtle bg-layer-02/30">
                <Button variant="primary" size="md">
                  Update Password
                </Button>
              </CardFooter>
            </Card>

            {/* Two-Factor Authentication Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">Two-Factor Authentication</h2>
                    <p className="mt-1 text-sm text-text-secondary">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Badge variant="error">Disabled</Badge>
                </div>
              </CardHeader>
              <CardBody className="space-y-4">
                <p className="text-sm text-text-primary">
                  Protect your account with two-factor authentication using an authenticator app
                  or SMS codes.
                </p>
                <div className="flex flex-col gap-3 rounded-none border border-border-subtle bg-layer-02/50 p-4">
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-text-primary">
                      Enhanced account security
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-text-primary">
                      Protection from unauthorized access
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-text-primary">
                      Notification of suspicious login attempts
                    </span>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="border-t border-border-subtle bg-layer-02/30">
                <Button variant="primary" size="md">
                  Enable Two-Factor Authentication
                </Button>
              </CardFooter>
            </Card>

            {/* Danger Zone Card */}
            <Card variant="outlined" className="border-error shadow-sm">
              <CardHeader className="border-b border-border-subtle bg-error/5">
                <h2 className="text-lg font-semibold text-error">Danger Zone</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Irreversible actions that affect your account
                </p>
              </CardHeader>
              <CardBody className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">Delete Account</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Button variant="secondary" size="md" className="border-error text-error hover:bg-error/10 sm:min-w-[160px]">
                    Delete Account
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value="notifications" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="space-y-6">
            {/* Notification Channels Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Notification Channels</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Choose how you want to receive notifications
                </p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">Email Notifications</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onChange={(checked) => updateNotifications('emailNotifications', checked)}
                    size="md"
                  />
                </div>
                <Divider />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">Push Notifications</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onChange={(checked) => updateNotifications('pushNotifications', checked)}
                    size="md"
                  />
                </div>
                <Divider />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">SMS Notifications</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      Receive important alerts via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onChange={(checked) => updateNotifications('smsNotifications', checked)}
                    size="md"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Activity Notifications Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Activity Notifications</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Control what activity you get notified about
                </p>
              </CardHeader>
              <CardBody className="space-y-4">
                <Checkbox
                  checked={notifications.mentionNotifications}
                  onChange={(e) => updateNotifications('mentionNotifications', e.target.checked)}
                  label="Mentions"
                  helperText="Get notified when someone mentions you in a comment or post"
                />
                <Checkbox
                  checked={notifications.commentNotifications}
                  onChange={(e) => updateNotifications('commentNotifications', e.target.checked)}
                  label="Comments"
                  helperText="Get notified when someone comments on your posts"
                />
              </CardBody>
            </Card>

            {/* Marketing Notifications Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Marketing & Updates</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Stay informed about new features and promotions
                </p>
              </CardHeader>
              <CardBody className="space-y-4">
                <Checkbox
                  checked={notifications.marketingEmails}
                  onChange={(e) => updateNotifications('marketingEmails', e.target.checked)}
                  label="Marketing Emails"
                  helperText="Receive promotional content and special offers"
                />
                <Checkbox
                  checked={notifications.productUpdates}
                  onChange={(e) => updateNotifications('productUpdates', e.target.checked)}
                  label="Product Updates"
                  helperText="Get notified about new features and improvements"
                />
                <Checkbox
                  checked={notifications.weeklyDigest}
                  onChange={(e) => updateNotifications('weeklyDigest', e.target.checked)}
                  label="Weekly Digest"
                  helperText="Receive a weekly summary of your activity and highlights"
                />
              </CardBody>
            </Card>
          </div>
        </TabPanel>

        {/* Privacy Tab */}
        <TabPanel value="privacy" className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="space-y-6">
            {/* Profile Visibility Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Profile Visibility</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Control who can see your profile and information
                </p>
              </CardHeader>
              <CardBody className="space-y-4">
                <RadioGroup
                  value={privacy.profileVisibility}
                  onChange={(value) => updatePrivacy('profileVisibility', value)}
                  orientation="vertical"
                >
                  <Radio value="public" label="Public" description="Anyone can view your profile" />
                  <Radio value="contacts" label="Contacts Only" description="Only your contacts can view your profile" />
                  <Radio value="private" label="Private" description="Only you can view your profile" />
                </RadioGroup>
              </CardBody>
            </Card>

            {/* Contact Information Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Contact Information</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Choose what contact details are visible on your profile
                </p>
              </CardHeader>
              <CardBody className="space-y-4">
                <Checkbox
                  checked={privacy.showEmail}
                  onChange={(e) => updatePrivacy('showEmail', e.target.checked)}
                  label="Show Email Address"
                  helperText="Display your email address on your public profile"
                />
                <Checkbox
                  checked={privacy.showPhone}
                  onChange={(e) => updatePrivacy('showPhone', e.target.checked)}
                  label="Show Phone Number"
                  helperText="Display your phone number on your public profile"
                />
              </CardBody>
            </Card>

            {/* Interaction Preferences Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Interaction Preferences</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Manage how others can interact with you
                </p>
              </CardHeader>
              <CardBody className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">Allow Direct Messages</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      Let other users send you direct messages
                    </p>
                  </div>
                  <Switch
                    checked={privacy.allowMessaging}
                    onChange={(checked) => updatePrivacy('allowMessaging', checked)}
                    size="md"
                  />
                </div>
                <Divider />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">Allow Tagging</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      Let others tag you in posts and comments
                    </p>
                  </div>
                  <Switch
                    checked={privacy.allowTagging}
                    onChange={(checked) => updatePrivacy('allowTagging', checked)}
                    size="md"
                  />
                </div>
              </CardBody>
            </Card>

            {/* Data & Privacy Card */}
            <Card variant="outlined" className="shadow-sm">
              <CardHeader className="border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-primary">Data & Privacy</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Manage how your data is collected and used
                </p>
              </CardHeader>
              <CardBody className="space-y-4">
                <Checkbox
                  checked={privacy.dataCollection}
                  onChange={(e) => updatePrivacy('dataCollection', e.target.checked)}
                  label="Analytics & Performance Data"
                  helperText="Help us improve by sharing anonymous usage data"
                />
                <Checkbox
                  checked={privacy.thirdPartySharing}
                  onChange={(e) => updatePrivacy('thirdPartySharing', e.target.checked)}
                  label="Third-Party Data Sharing"
                  helperText="Allow sharing your data with trusted partners for enhanced features"
                />
              </CardBody>
            </Card>
          </div>
        </TabPanel>
      </Tabs>

      {/* Action Buttons */}
      <Card variant="outlined" className="sticky bottom-4 mt-8 shadow-lg sm:bottom-6">
        <CardBody>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="ghost"
              size="md"
              onClick={handleCancel}
              disabled={!hasChanges || isSaving}
              className="sm:min-w-[120px]"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              disabled={!hasChanges}
              isLoading={isSaving}
              className="sm:min-w-[120px]"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Notification Toasts */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:bottom-6 sm:right-6">
        {toasts.map((toast) => (
          <div key={toast.id} className="animate-in slide-in-from-bottom-2 fade-in duration-200">
            <NotificationToast
              variant={toast.variant}
              title={toast.title}
              description={toast.description}
              onDismiss={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              dismissible
            />
          </div>
        ))}
      </div>
    </div>
  );
}

SettingsProfile.displayName = 'SettingsProfile';
