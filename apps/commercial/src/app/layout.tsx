import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Modular UI System - Enterprise-Grade React Components',
  description: 'A production-ready, accessible React component library built with TypeScript and Tailwind CSS. IBM Carbon Design System inspired aesthetic.',
  keywords: ['React', 'Components', 'UI Library', 'TypeScript', 'Tailwind CSS', 'Accessible', 'IBM Carbon'],
  authors: [{ name: 'Modular UI Team' }],
  openGraph: {
    title: 'Modular UI System',
    description: 'Enterprise-Grade React Components',
    type: 'website',
  },
};

/**
 * Navigation links for the site
 */
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/components', label: 'Components' },
  { href: '/examples', label: 'Examples' },
  { href: '/docs', label: 'Documentation' },
  { href: '/pricing', label: 'Pricing' },
] as const;

/**
 * Root layout component for the commercial showcase website.
 * Includes global navigation, footer, and metadata.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header Navigation */}
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <nav className="container-custom">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center space-x-2 font-bold text-xl text-neutral-900 hover:text-primary-500 transition-colors"
              >
                <div className="h-8 w-8 bg-primary-500" />
                <span>Modular UI</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors focus-ring rounded px-3 py-2"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <Link
                  href="https://github.com/yourusername/modular-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  GitHub
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus-ring transition-colors"
                >
                  Get Started
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 text-neutral-600 hover:text-neutral-900 focus-ring"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-200 bg-neutral-50">
          <div className="container-custom py-12 md:py-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Brand */}
              <div className="col-span-1 md:col-span-2">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-neutral-900">
                  <div className="h-8 w-8 bg-primary-500" />
                  <span>Modular UI</span>
                </Link>
                <p className="mt-4 text-sm text-neutral-600 max-w-md">
                  Enterprise-grade React component library built with TypeScript and Tailwind CSS.
                  Accessible, customizable, and production-ready.
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Product</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/components" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Components
                    </Link>
                  </li>
                  <li>
                    <Link href="/examples" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Examples
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Pricing
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a href="https://github.com" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Changelog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      License
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 border-t border-neutral-200 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-neutral-600">
                © {new Date().getFullYear()} Modular UI System. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Terms
                </a>
                <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
