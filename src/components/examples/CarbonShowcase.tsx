import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Badge,
} from '../index';

/**
 * CarbonShowcase - Demonstrates IBM Carbon Design System nuances
 *
 * @remarks
 * This showcase component highlights the specific Carbon Design System
 * features and nuances implemented in this UI library:
 *
 * **Key Carbon Features Demonstrated:**
 *
 * 1. **Height Parity** - Buttons and inputs share exact heights:
 *    - sm: 32px (h-8)
 *    - md: 40px (h-10) - DEFAULT
 *    - lg: 48px (h-12)
 *
 * 2. **Carbon Focus Pattern** - 2px focus border with 1px transparent inset:
 *    - Implemented with box-shadow for cross-browser support
 *    - Consistent across buttons, inputs, and tabs
 *    - Blue 60 (#0f62fe) in light theme, Blue 40 (#4589ff) in dark
 *
 * 3. **Typography Scale** - Precise Carbon type specifications:
 *    - 12px (label-01, helper-text-01)
 *    - 14px (body-01, label-02)
 *    - 16px (body-02)
 *    - Letter spacing: 0.32px/0.16px/0px
 *
 * 4. **Tab Indicators** - 4px thick active border (vs typical 2px)
 *    - Creates distinctive "technical" Carbon aesthetic
 *
 * 5. **Sharp Corners** - rounded-none throughout
 *    - No border radius on buttons, inputs, cards, tabs
 *    - Creates precise, technical appearance
 *
 * 6. **Carbon Spacing** - 8px base grid (16/24/32/48/64px)
 *
 * 7. **110ms Transitions** - Carbon standard timing
 *
 * 8. **Left-aligned Buttons** - Asymmetric padding (16px left, 64px right)
 *    - Exception: ghost buttons use symmetric padding
 *
 * @example
 * ```tsx
 * <CarbonShowcase />
 * ```
 *
 * @since 0.1.0
 */
export function CarbonShowcase() {
  const [focusedElement, setFocusedElement] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-layer-01 p-8">
      {/* Header */}
      <div className="mb-12 max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-none border border-brand-60 bg-brand-10 px-4 py-2">
          <svg className="h-5 w-5 text-brand-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm font-semibold text-brand-60">IBM Carbon Design System</span>
        </div>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-text-primary">
          Carbon Design Showcase
        </h1>
        <p className="text-lg text-text-secondary">
          Explore the authentic IBM Carbon Design System nuances implemented in this UI library.
          Every detail follows Carbon's precise specifications for a professional, technical aesthetic.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="mb-12 grid gap-6 lg:grid-cols-2">
        {/* Feature 1: Height Parity */}
        <Card variant="outlined" className="shadow-sm">
          <CardHeader className="border-b border-border-subtle bg-layer-02">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  1. Height Parity
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Buttons and inputs share exact heights for perfect alignment
                </p>
              </div>
              <Badge variant="info">Carbon Spec</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            {/* Small */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Small (32px / h-8)
                </span>
                <code className="rounded-none bg-layer-02 px-2 py-1 text-xs font-mono text-brand-60">
                  height: 2rem
                </code>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" variant="primary">Button</Button>
                <Input size="sm" placeholder="Input field" className="flex-1" />
              </div>
            </div>

            {/* Medium - DEFAULT */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    Medium (40px / h-10)
                  </span>
                  <Badge variant="success" size="sm">DEFAULT</Badge>
                </div>
                <code className="rounded-none bg-layer-02 px-2 py-1 text-xs font-mono text-brand-60">
                  height: 2.5rem
                </code>
              </div>
              <div className="flex items-center gap-3">
                <Button size="md" variant="primary">Button</Button>
                <Input size="md" placeholder="Input field" className="flex-1" />
              </div>
            </div>

            {/* Large */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                  Large (48px / h-12)
                </span>
                <code className="rounded-none bg-layer-02 px-2 py-1 text-xs font-mono text-brand-60">
                  height: 3rem
                </code>
              </div>
              <div className="flex items-center gap-3">
                <Button size="lg" variant="primary">Button</Button>
                <Input size="lg" placeholder="Input field" className="flex-1" />
              </div>
            </div>

            <div className="rounded-none border-l-4 border-l-brand-60 bg-brand-10 p-4">
              <p className="text-sm font-medium text-text-primary">
                💡 Perfect Alignment: Notice how buttons and inputs align perfectly at each size.
                This creates clean, professional forms.
              </p>
            </div>
          </CardBody>
        </Card>

        {/* Feature 2: Carbon Focus Pattern */}
        <Card variant="outlined" className="shadow-sm">
          <CardHeader className="border-b border-border-subtle bg-layer-02">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  2. Carbon Focus Pattern
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  2px focus border with 1px transparent inset space
                </p>
              </div>
              <Badge variant="info">Carbon Spec</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <p className="mb-4 text-sm text-text-secondary">
                Try tabbing through or clicking these elements to see the distinctive Carbon focus state:
              </p>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-medium text-text-secondary">
                    Button Focus States
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="primary"
                      onFocus={() => setFocusedElement('button-primary')}
                      onBlur={() => setFocusedElement(null)}
                    >
                      Primary
                    </Button>
                    <Button
                      variant="secondary"
                      onFocus={() => setFocusedElement('button-secondary')}
                      onBlur={() => setFocusedElement(null)}
                    >
                      Secondary
                    </Button>
                    <Button
                      variant="outline"
                      onFocus={() => setFocusedElement('button-outline')}
                      onBlur={() => setFocusedElement(null)}
                    >
                      Outline
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium text-text-secondary">
                    Input Focus State
                  </label>
                  <Input
                    placeholder="Click or tab to focus..."
                    onFocus={() => setFocusedElement('input')}
                    onBlur={() => setFocusedElement(null)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-none border border-border-subtle bg-layer-02 p-4">
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-60" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-text-primary">Implementation</p>
                  <code className="mt-1 block text-xs font-mono text-text-secondary">
                    box-shadow: inset 0 0 0 1px transparent, inset 0 0 0 3px var(--border-focus)
                  </code>
                </div>
              </div>
              {focusedElement && (
                <div className="mt-2 rounded-none bg-success-light px-3 py-2">
                  <p className="text-xs font-medium text-success">
                    ✓ Currently focused: <span className="font-mono">{focusedElement}</span>
                  </p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>

        {/* Feature 3: Tab Indicators */}
        <Card variant="outlined" className="shadow-sm lg:col-span-2">
          <CardHeader className="border-b border-border-subtle bg-layer-02">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  3. Carbon Tab Indicators
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  4px thick active border creates distinctive technical aesthetic
                </p>
              </div>
              <Badge variant="info">Carbon Spec</Badge>
            </div>
          </CardHeader>
          <CardBody>
            <div className="mb-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    Standard (2px)
                  </span>
                  <code className="rounded-none bg-layer-01 px-2 py-1 text-xs font-mono text-text-secondary">
                    border-width: 2px
                  </code>
                </div>
                <div className="h-12 rounded-none border-b-2 border-interactive bg-field-01" />
                <p className="mt-2 text-xs text-text-secondary">Typical UI library approach</p>
              </div>

              <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
                    Carbon (4px)
                  </span>
                  <code className="rounded-none bg-brand-10 px-2 py-1 text-xs font-mono text-brand-60">
                    border-width: 4px
                  </code>
                </div>
                <div className="h-12 rounded-none border-b-4 border-interactive bg-field-01" />
                <p className="mt-2 text-xs text-brand-60 font-medium">✓ Carbon specification - bolder, more prominent</p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-4">
              <TabList>
                <Tab value="overview">Overview</Tab>
                <Tab value="specifications">Specifications</Tab>
                <Tab value="implementation">Implementation</Tab>
              </TabList>

              <TabPanel value="overview" className="rounded-none border border-border-subtle bg-field-01 p-6">
                <div className="space-y-3">
                  <h3 className="text-base font-semibold text-text-primary">
                    Notice the 4px Border
                  </h3>
                  <p className="text-sm text-text-secondary">
                    The active tab indicator is 4px thick instead of the typical 2px. This creates a stronger
                    visual hierarchy and is a signature Carbon Design System pattern.
                  </p>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-success">
                      48px tab height (h-12)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-success">
                      4px active indicator (border-b-4)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-success" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-success">
                      Sharp corners (rounded-none)
                    </span>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="specifications" className="rounded-none border border-border-subtle bg-field-01 p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-text-primary">Carbon Tab Specifications</h4>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-brand-60">•</span>
                        <span>Height: 48px (h-12)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-brand-60">•</span>
                        <span>Active indicator: 4px thick border</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-brand-60">•</span>
                        <span>Horizontal padding: 16px (px-4)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-brand-60">•</span>
                        <span>Typography: 14px (text-sm), font-medium</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 text-brand-60">•</span>
                        <span>Border radius: 0 (rounded-none)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabPanel>

              <TabPanel value="implementation" className="rounded-none border border-border-subtle bg-field-01 p-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-text-primary">Key Implementation Details</h4>
                  <div className="rounded-none bg-layer-02 p-4 font-mono text-xs">
                    <div className="text-text-secondary">// Tailwind classes</div>
                    <div className="mt-2 text-text-primary">h-12 px-4 text-sm font-medium</div>
                    <div className="text-text-primary">rounded-none</div>
                    <div className="text-text-primary">border-b-4 border-interactive</div>
                    <div className="mt-2 text-text-secondary">// Carbon focus pattern</div>
                    <div className="text-text-primary">focus-visible:shadow-[inset_0_0_0_1px_transparent,</div>
                    <div className="text-text-primary pl-4">inset_0_0_0_3px_var(--border-focus)]</div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </CardBody>
        </Card>

        {/* Feature 4: Sharp Corners & Typography */}
        <Card variant="outlined" className="shadow-sm lg:col-span-2">
          <CardHeader className="border-b border-border-subtle bg-layer-02">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  4. Sharp Corners & Carbon Typography
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Zero border radius and precise type scale create technical aesthetic
                </p>
              </div>
              <Badge variant="info">Carbon Spec</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Sharp Corners */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-text-primary">Sharp Corners (rounded-none)</h3>
                <div className="space-y-3">
                  <div className="rounded-none border-2 border-brand-60 bg-brand-10 p-4">
                    <code className="text-xs font-mono text-brand-60">border-radius: 0</code>
                    <p className="mt-2 text-sm text-text-primary">
                      All components use sharp corners for a precise, technical appearance.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="primary" size="sm">Button</Button>
                    <Badge variant="info">Badge</Badge>
                    <Input size="sm" placeholder="Input" className="w-32" />
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-text-primary">Carbon Type Scale</h3>
                <div className="space-y-3 rounded-none border border-border-subtle bg-layer-02 p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">label-01 / helper-text-01</span>
                      <code className="text-xs font-mono text-brand-60">12px</code>
                    </div>
                    <p className="text-xs">The quick brown fox jumps</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">body-01 / label-02</span>
                      <code className="text-xs font-mono text-brand-60">14px</code>
                    </div>
                    <p className="text-sm">The quick brown fox jumps</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">body-02</span>
                      <code className="text-xs font-mono text-brand-60">16px</code>
                    </div>
                    <p className="text-base">The quick brown fox jumps</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Letter Spacing */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-text-primary">Letter Spacing</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                  <code className="text-xs font-mono text-brand-60">0.32px</code>
                  <p className="mt-2 text-xs" style={{ letterSpacing: '0.32px' }}>
                    label-01: Tight letter spacing for small text
                  </p>
                </div>
                <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                  <code className="text-xs font-mono text-brand-60">0.16px</code>
                  <p className="mt-2 text-sm" style={{ letterSpacing: '0.16px' }}>
                    body-01: Normal letter spacing
                  </p>
                </div>
                <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                  <code className="text-xs font-mono text-brand-60">0px</code>
                  <p className="mt-2 text-base" style={{ letterSpacing: '0px' }}>
                    body-02: Wide spacing
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Feature 5: Button Alignment */}
        <Card variant="outlined" className="shadow-sm lg:col-span-2">
          <CardHeader className="border-b border-border-subtle bg-layer-02">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-text-primary">
                  5. Left-Aligned Buttons & Asymmetric Padding
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Carbon uses left-aligned text with 16px left / 64px right padding
                </p>
              </div>
              <Badge variant="info">Carbon Spec</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-text-primary">Standard Buttons</h3>
                <div className="space-y-3">
                  <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                    <p className="mb-3 text-xs text-text-secondary">Asymmetric padding creates left alignment:</p>
                    <code className="block text-xs font-mono text-brand-60">pl-4 pr-16 (16px / 64px)</code>
                  </div>
                  <div className="space-y-2">
                    <Button variant="primary" isFullWidth>Primary Action</Button>
                    <Button variant="secondary" isFullWidth>Secondary Action</Button>
                    <Button variant="outline" isFullWidth>Tertiary Action</Button>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Notice how text aligns to the left edge, creating a clean vertical line
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-sm font-semibold text-text-primary">Ghost Buttons (Exception)</h3>
                <div className="space-y-3">
                  <div className="rounded-none border border-border-subtle bg-layer-02 p-4">
                    <p className="mb-3 text-xs text-text-secondary">Ghost buttons use symmetric padding:</p>
                    <code className="block text-xs font-mono text-brand-60">px-4 (16px both sides)</code>
                  </div>
                  <div className="space-y-2">
                    <Button variant="ghost" isFullWidth>Ghost Button</Button>
                    <Button variant="ghost" isFullWidth>Another Ghost</Button>
                    <Button variant="ghost" isFullWidth>Third Ghost</Button>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Ghost buttons remain centered due to their minimal style
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-none border-l-4 border-l-success bg-success-light p-4">
              <div className="flex items-start gap-3">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-text-primary">Carbon Design Principle</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    Left alignment creates a consistent vertical rhythm in layouts and makes
                    scanning button labels faster. The extra right padding provides visual breathing room.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Summary */}
      <Card variant="elevated" className="shadow-lg">
        <CardBody className="p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-none bg-brand-60 p-3">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-text-primary">
                Carbon Design System Compliance
              </h2>
              <p className="mt-2 text-text-secondary">
                This UI library implements authentic IBM Carbon Design System specifications with pixel-perfect accuracy.
                Every component follows Carbon's precise measurements, timing, spacing, and aesthetic principles.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-none border border-border-subtle bg-layer-01 p-4">
                  <div className="text-2xl font-bold text-brand-60">32/40/48px</div>
                  <div className="mt-1 text-xs text-text-secondary">Component Heights</div>
                </div>
                <div className="rounded-none border border-border-subtle bg-layer-01 p-4">
                  <div className="text-2xl font-bold text-brand-60">4px</div>
                  <div className="mt-1 text-xs text-text-secondary">Tab Indicators</div>
                </div>
                <div className="rounded-none border border-border-subtle bg-layer-01 p-4">
                  <div className="text-2xl font-bold text-brand-60">110ms</div>
                  <div className="mt-1 text-xs text-text-secondary">Transition Timing</div>
                </div>
                <div className="rounded-none border border-border-subtle bg-layer-01 p-4">
                  <div className="text-2xl font-bold text-brand-60">0px</div>
                  <div className="mt-1 text-xs text-text-secondary">Border Radius</div>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

CarbonShowcase.displayName = 'CarbonShowcase';
