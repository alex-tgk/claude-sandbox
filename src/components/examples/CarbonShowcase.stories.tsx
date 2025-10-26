import type { Meta, StoryObj } from '@storybook/react';
import { CarbonShowcase } from './CarbonShowcase';

/**
 * # Carbon Design Showcase
 *
 * An interactive demonstration of IBM Carbon Design System nuances implemented in this UI library.
 *
 * ## Carbon Design System Features
 *
 * This showcase highlights the following Carbon specifications:
 *
 * ### 1. Height Parity (32/40/48px)
 * - Buttons and inputs share exact heights at each size
 * - sm: 32px (h-8)
 * - md: 40px (h-10) - DEFAULT
 * - lg: 48px (h-12)
 * - Creates perfect alignment in forms
 *
 * ### 2. Carbon Focus Pattern
 * - 2px focus border with 1px transparent inset space
 * - Implemented with box-shadow for cross-browser support
 * - Pattern: `inset 0 0 0 1px transparent, inset 0 0 0 3px focus-color`
 * - Consistent across buttons, inputs, and tabs
 * - Blue 60 (#0f62fe) light theme, Blue 40 (#4589ff) dark theme
 *
 * ### 3. Tab Indicators (4px)
 * - Active tab border is 4px thick (vs typical 2px)
 * - Creates distinctive "technical" Carbon aesthetic
 * - Tab height: 48px (h-12)
 * - Sharp corners throughout
 *
 * ### 4. Typography Scale
 * - 12px: label-01, helper-text-01 (letter-spacing: 0.32px)
 * - 14px: body-01, label-02 (letter-spacing: 0.16px)
 * - 16px: body-02 (letter-spacing: 0px)
 * - 18/20/24px: heading levels
 *
 * ### 5. Sharp Corners
 * - All components use `rounded-none` (border-radius: 0)
 * - Creates precise, technical appearance
 * - Signature Carbon aesthetic
 *
 * ### 6. Button Alignment
 * - Left-aligned text with asymmetric padding
 * - Standard buttons: 16px left, 64px right (pl-4 pr-16)
 * - Ghost buttons: symmetric 16px both sides (px-4)
 * - Creates clean vertical rhythm
 *
 * ### 7. Carbon Spacing
 * - 8px base grid system
 * - 16/24/32/48/64px spacing increments
 *
 * ### 8. Transitions
 * - 110ms duration (Carbon standard)
 * - Applied to all interactive elements
 *
 * ## Implementation Details
 *
 * All Carbon specifications are implemented using:
 * - Tailwind CSS utility classes
 * - CSS custom properties (design tokens)
 * - Box-shadow for focus states (cross-browser support)
 * - Precise height values (h-8/h-10/h-12)
 *
 * ## Accessibility
 *
 * - WCAG 2.2 AA compliant
 * - Visible focus states
 * - Keyboard navigation support
 * - Proper semantic HTML
 *
 * @see https://carbondesignsystem.com - IBM Carbon Design System
 */
const meta: Meta<typeof CarbonShowcase> = {
  title: 'Examples/Carbon Showcase',
  component: CarbonShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# IBM Carbon Design System Showcase

This example demonstrates the authentic IBM Carbon Design System nuances implemented throughout this UI library.

## What Makes This Carbon-Compliant?

### Precise Measurements
Every component follows Carbon's exact specifications:
- Heights: 32/40/48px (not approximate values)
- Tab indicators: 4px thick (not 2px)
- Spacing: 8px base grid (16/24/32/48/64px)
- Typography: Carbon type scale (12/14/16/18/20/24px)

### Distinctive Patterns
Unique Carbon characteristics that set this apart:
- **2px focus border with 1px inset** - Implemented with box-shadow
- **4px tab indicators** - Bolder than typical 2px borders
- **Left-aligned buttons** - Asymmetric padding (16px/64px)
- **Sharp corners** - Zero border radius throughout
- **110ms transitions** - Carbon standard timing

### Technical Aesthetic
Carbon's design philosophy emphasizes:
- Clean, precise layouts
- Professional appearance
- Technical credibility
- Enterprise readiness

## Try It Out

Interact with the showcase to see Carbon features in action:
1. **Tab through elements** to see the distinctive focus states
2. **Click tabs** to see the 4px thick active indicators
3. **Resize buttons/inputs** to see perfect height alignment
4. **Inspect typography** to see precise font sizes and letter spacing

## Carbon Resources

- [Carbon Design System](https://carbondesignsystem.com)
- [Carbon Components](https://carbondesignsystem.com/components/overview)
- [Carbon Patterns](https://carbondesignsystem.com/patterns/overview)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CarbonShowcase>;

/**
 * ## Interactive Carbon Showcase
 *
 * Explore all the IBM Carbon Design System nuances implemented in this library.
 *
 * **Key Features:**
 * - ✓ Height parity (buttons & inputs at 32/40/48px)
 * - ✓ Carbon focus pattern (2px border + 1px inset)
 * - ✓ 4px thick tab indicators
 * - ✓ Sharp corners (rounded-none)
 * - ✓ Left-aligned buttons with asymmetric padding
 * - ✓ Carbon typography scale with letter spacing
 * - ✓ 110ms transitions
 * - ✓ 8px base grid spacing
 *
 * **Try This:**
 * 1. Tab through the buttons and inputs to see the focus pattern
 * 2. Click between tabs to see the 4px active indicator
 * 3. Observe how buttons and inputs align perfectly
 * 4. Notice the sharp corners on all components
 */
export const Default: Story = {};

/**
 * ## Light Theme (g10)
 *
 * Carbon Design System's white theme (g10).
 *
 * **Color Tokens:**
 * - Background: #f4f4f4 (layer-01)
 * - Elevated: #ffffff (layer-02)
 * - Text: #161616 (text-primary)
 * - Interactive: #0f62fe (Blue 60)
 * - Border: #e0e0e0 (border-subtle)
 */
export const LightTheme: Story = {
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: 'The default Carbon white theme (g10) with light backgrounds and dark text.',
      },
    },
  },
};

/**
 * ## Dark Theme (g100)
 *
 * Carbon Design System's dark theme (g100).
 *
 * **Color Tokens:**
 * - Background: #262626 (layer-01)
 * - Elevated: #393939 (layer-02)
 * - Text: #f4f4f4 (text-primary)
 * - Interactive: #4589ff (Blue 40)
 * - Border: #393939 (border-subtle)
 *
 * **Note:** Apply `.dark` class to the root element to enable dark theme.
 */
export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Carbon dark theme (g100) with dark backgrounds and light text. All components maintain proper contrast ratios (WCAG 2.2 AA).',
      },
    },
  },
};

/**
 * ## Focus Demonstration
 *
 * Highlights the Carbon focus pattern specifically.
 *
 * **Focus Pattern Details:**
 * - 2px focus border
 * - 1px transparent inset space
 * - Implemented with box-shadow
 * - Blue 60 (#0f62fe) in light theme
 * - Blue 40 (#4589ff) in dark theme
 *
 * **Implementation:**
 * ```css
 * box-shadow: inset 0 0 0 1px transparent,
 *             inset 0 0 0 3px var(--border-focus)
 * ```
 *
 * **Try:** Use Tab key to navigate through interactive elements and observe the consistent focus states.
 */
export const FocusDemo: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the Carbon focus pattern. Tab through elements to see the 2px focus border with 1px transparent inset space.',
      },
    },
  },
};

/**
 * ## Mobile Responsive
 *
 * The showcase adapts to smaller screens while maintaining Carbon specifications.
 *
 * **Responsive Behavior:**
 * - Stacked layouts on mobile
 * - Touch-friendly targets (48px minimum)
 * - Maintained focus states
 * - Preserved spacing ratios
 *
 * **Note:** All Carbon measurements (heights, spacing, typography) remain consistent across breakpoints.
 */
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view maintains all Carbon specifications while adapting the layout for smaller screens.',
      },
    },
  },
};
