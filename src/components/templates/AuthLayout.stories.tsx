import type { Meta, StoryObj } from '@storybook/react';
import { AuthLayout } from './AuthLayout';
import { Button } from '../atoms/button/Button';
import { Input } from '../atoms/input/Input';
import { Checkbox } from '../atoms/checkbox/Checkbox';

const meta = {
  title: 'Templates/AuthLayout',
  component: AuthLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A centered authentication layout perfect for login, signup, and password reset flows.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AuthLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample Logo Component
const SampleLogo = () => (
  <div className="flex h-16 w-16 items-center justify-center rounded-none bg-interactive">
    <span className="text-2xl font-bold text-text-on-color">UI</span>
  </div>
);

// Sample Login Form
const LoginForm = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-medium text-text-primary">Welcome back</h2>
      <p className="text-sm text-text-secondary">Enter your credentials to continue</p>
    </div>

    <div className="space-y-4">
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        isFullWidth
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        isFullWidth
      />

      <div className="flex items-center justify-between">
        <Checkbox label="Remember me" />
        <a href="#" className="text-sm text-interactive hover:underline">
          Forgot password?
        </a>
      </div>

      <Button variant="primary" isFullWidth>
        Sign in
      </Button>

      <Button variant="outline" isFullWidth>
        Sign in with Google
      </Button>
    </div>

    <p className="text-center text-sm text-text-secondary">
      Don&apos;t have an account?{' '}
      <a href="#" className="text-interactive hover:underline">
        Sign up
      </a>
    </p>
  </div>
);

// Sample Signup Form
const SignupForm = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <h2 className="text-2xl font-medium text-text-primary">Create account</h2>
      <p className="text-sm text-text-secondary">Get started with your free account</p>
    </div>

    <div className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        isFullWidth
      />
      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        isFullWidth
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        helperText="Must be at least 8 characters"
        isFullWidth
      />

      <Checkbox label="I agree to the Terms of Service and Privacy Policy" />

      <Button variant="primary" isFullWidth>
        Create account
      </Button>
    </div>

    <p className="text-center text-sm text-text-secondary">
      Already have an account?{' '}
      <a href="#" className="text-interactive hover:underline">
        Sign in
      </a>
    </p>
  </div>
);

// Sample Footer
const SampleFooter = () => (
  <div className="flex justify-center gap-4">
    <a href="#" className="text-text-secondary hover:text-text-primary">
      Terms
    </a>
    <span className="text-text-secondary">•</span>
    <a href="#" className="text-text-secondary hover:text-text-primary">
      Privacy
    </a>
    <span className="text-text-secondary">•</span>
    <a href="#" className="text-text-secondary hover:text-text-primary">
      Help
    </a>
  </div>
);

export const LoginCenter: Story = {
  args: {
    logo: <SampleLogo />,
    children: <LoginForm />,
    footer: <SampleFooter />,
    position: 'center',
  },
};

export const LoginLeft: Story = {
  args: {
    logo: <SampleLogo />,
    children: <LoginForm />,
    footer: <SampleFooter />,
    position: 'left',
  },
};

export const LoginRight: Story = {
  args: {
    logo: <SampleLogo />,
    children: <LoginForm />,
    footer: <SampleFooter />,
    position: 'right',
  },
};

export const Signup: Story = {
  args: {
    logo: <SampleLogo />,
    children: <SignupForm />,
    footer: <SampleFooter />,
  },
};

export const WithBackground: Story = {
  args: {
    logo: <SampleLogo />,
    children: <LoginForm />,
    footer: <SampleFooter />,
    backgroundImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1920',
  },
};

export const NoLogo: Story = {
  args: {
    children: <LoginForm />,
    footer: <SampleFooter />,
  },
};
