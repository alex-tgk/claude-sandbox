/**
 * Example Application
 *
 * @remarks
 * Demonstrates the usage of the modular UI system components.
 * This example shows:
 * - Component composition
 * - Form handling
 * - Modal dialogs
 * - Theme toggling
 * - Accessibility features
 *
 * @since 0.1.0
 */

import { useState } from 'react';
import { Button } from '../src/components/button/Button';
import { Input } from '../src/components/input/Input';
import { Dialog } from '../src/components/dialog/Dialog';
import '../src/styles/tailwind.css';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsDialogOpen(true);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', email: '', message: '' });
    setErrors({});
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface text-text transition-colors">
      {/* Header */}
      <header className="border-b border-border bg-surface-muted">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-brand-600">
            Modular UI System
          </h1>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            startIcon={
              theme === 'light' ? (
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 1v2m0 10v2M3.93 3.93l1.414 1.414m5.312 5.312l1.414 1.414M1 8h2m10 0h2M3.93 12.07l1.414-1.414m5.312-5.312l1.414-1.414"
                  />
                </svg>
              ) : (
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path
                    fill="currentColor"
                    d="M6 0a6 6 0 1 0 10 5.6A6 6 0 1 1 10.4 0H6Z"
                  />
                </svg>
              )
            }
          >
            {theme === 'light' ? 'Dark' : 'Light'} Mode
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-2xl">
          {/* Hero Section */}
          <section className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">
              Welcome to the Example App
            </h2>
            <p className="text-lg text-text-muted">
              This demonstrates the modular UI system with accessible,
              composable components.
            </p>
          </section>

          {/* Button Examples */}
          <section className="mb-12">
            <h3 className="mb-4 text-2xl font-semibold">Button Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </section>

          {/* Form Example */}
          <section className="rounded-lg border border-border bg-surface p-6 shadow-md">
            <h3 className="mb-6 text-2xl font-semibold">Contact Form</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                placeholder="Enter your name"
                isRequired
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                isFullWidth
              />

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                isRequired
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                isFullWidth
                startAdornment={
                  <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z"
                    />
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m3 5 7 5 7-5"
                    />
                  </svg>
                }
              />

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-text"
                >
                  Message <span className="text-error">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="block w-full rounded-md border border-border bg-surface px-4 py-2 text-text placeholder:text-text-muted focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.message && (
                  <p className="mt-1.5 text-sm text-error">{errors.message}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  isFullWidth
                >
                  Reset
                </Button>
                <Button type="submit" variant="primary" isFullWidth>
                  Submit
                </Button>
              </div>
            </form>
          </section>

          {/* Features */}
          <section className="mt-12">
            <h3 className="mb-6 text-2xl font-semibold">Key Features</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border bg-surface-muted p-4">
                <h4 className="mb-2 font-semibold">♿ Accessible</h4>
                <p className="text-sm text-text-muted">
                  WCAG 2.2 AA compliant with full keyboard navigation and ARIA
                  support.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface-muted p-4">
                <h4 className="mb-2 font-semibold">🎨 Themeable</h4>
                <p className="text-sm text-text-muted">
                  Built-in light/dark mode with CSS variables for easy
                  customization.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface-muted p-4">
                <h4 className="mb-2 font-semibold">📘 Type-Safe</h4>
                <p className="text-sm text-text-muted">
                  Full TypeScript support with strict mode and comprehensive
                  types.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface-muted p-4">
                <h4 className="mb-2 font-semibold">🧪 Tested</h4>
                <p className="text-sm text-text-muted">
                  Comprehensive test coverage with Vitest and Testing Library.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Message Sent!"
        description="Thank you for your submission."
      >
        <div className="space-y-3">
          <p className="text-text-muted">
            We've received your message and will get back to you soon.
          </p>

          <div className="rounded-lg bg-success-light p-3">
            <p className="text-sm">
              <strong>Name:</strong> {formData.name}
            </p>
            <p className="text-sm">
              <strong>Email:</strong> {formData.email}
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button onClick={resetForm} variant="primary">
              Close
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
