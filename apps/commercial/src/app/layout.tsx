import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'SaaSquatch - Referral Marketing & Customer Loyalty Platform',
  description: 'Turn customers into champions with powerful referral programs, loyalty rewards, and viral growth campaigns. Trusted by 12,500+ companies.',
  keywords: ['Referral Marketing', 'Customer Loyalty', 'Referral Program', 'Loyalty Rewards', 'Customer Acquisition', 'Growth Marketing'],
  authors: [{ name: 'SaaSquatch Team' }],
  openGraph: {
    title: 'SaaSquatch - Referral Marketing Platform',
    description: 'Turn Customers into Champions',
    type: 'website',
  },
};

/**
 * Navigation links for the site
 */
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/examples', label: 'Programs' },
  { href: '/components', label: 'Features' },
  { href: '/docs', label: 'Resources' },
  { href: '/pricing', label: 'Pricing' },
] as const;

/**
 * Root layout component for the SaaSquatch website.
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
                <div className="h-8 w-8 bg-primary-500 flex items-center justify-center text-white text-xs font-bold">SQ</div>
                <span>SaaSquatch</span>
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
                  href="/docs"
                  className="hidden sm:inline-flex items-center text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus-ring transition-colors"
                >
                  Start Free Trial
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
                  <div className="h-8 w-8 bg-primary-500 flex items-center justify-center text-white text-xs font-bold">SQ</div>
                  <span>SaaSquatch</span>
                </Link>
                <p className="mt-4 text-sm text-neutral-600 max-w-md">
                  Turn customers into champions with powerful referral programs and loyalty rewards.
                  Trusted by 12,500+ companies to drive growth through customer advocacy.
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-sm font-semibold text-neutral-900">Product</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="/examples" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Programs
                    </Link>
                  </li>
                  <li>
                    <Link href="/components" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Integrations
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
                    <Link href="/docs" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors">
                      Blog
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
                © {new Date().getFullYear()} SaaSquatch. All rights reserved.
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
