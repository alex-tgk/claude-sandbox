# Modular UI System - Commercial Showcase

A Next.js 14 commercial showcase website for the Modular UI System component library.

## Features

- **Next.js 14** with App Router and React Server Components
- **TypeScript** for type safety
- **Tailwind CSS** with IBM Carbon Design System aesthetic
- **Responsive Design** mobile-first approach
- **SEO Optimized** with proper metadata and semantic HTML
- **Monorepo Integration** links to `@modular-ui/system` workspace package

## Project Structure

```
apps/commercial/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with navigation
│   │   ├── page.tsx            # Landing page
│   │   ├── components/         # Component explorer
│   │   ├── examples/           # Usage examples
│   │   ├── docs/               # Documentation
│   │   ├── pricing/            # Pricing page
│   │   └── globals.css         # Global styles
│   ├── components/             # Site-specific components
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
└── package.json                # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js >= 18.17.0
- pnpm >= 8.0.0

### Installation

From the monorepo root:

```bash
# Install dependencies
pnpm install

# Navigate to the commercial app
cd apps/commercial

# Run development server
pnpm dev
```

The site will be available at [http://localhost:3000](http://localhost:3000).

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript compiler check

## Configuration

### Tailwind CSS

The Tailwind configuration extends the design tokens from the `@modular-ui/system` library:

- IBM Carbon inspired color palette
- Sharp corners (0px border radius)
- Consistent spacing and typography scales
- Custom animations and utilities

### Next.js

The Next.js configuration is optimized for monorepo usage:

- Transpiles the `@modular-ui/system` workspace package
- Enables React strict mode
- Configured for standalone output
- Optimized image handling

### TypeScript

Strict TypeScript configuration with path aliases:

- `@/*` - Maps to `./src/*`
- `@/components/*` - Maps to `./src/components/*`
- `@/lib/*` - Maps to `./src/lib/*`

## Pages

### Landing Page (`/`)

Hero section, features, component preview, and CTAs showcasing the library's capabilities.

### Components (`/components`)

Complete component library browser organized by atomic design categories (Atoms, Molecules, Organisms).

### Examples (`/examples`)

Real-world examples and patterns demonstrating component combinations and usage.

### Documentation (`/docs`)

Quick start guide, installation instructions, and links to detailed documentation sections.

### Pricing (`/pricing`)

Pricing tiers (Open Source, Pro, Enterprise) with feature comparisons and FAQ.

## Development

### Adding New Pages

Create a new folder in `src/app/` with a `page.tsx` file:

```tsx
// src/app/my-page/page.tsx
export default function MyPage() {
  return <div>My Page Content</div>;
}
```

### Styling

Use Tailwind CSS utility classes. Custom utilities are defined in `globals.css`:

```tsx
<div className="container-custom section-padding">
  <h1 className="text-balance">Heading</h1>
  <button className="focus-ring">Button</button>
</div>
```

### Using Library Components

Import components from the workspace package:

```tsx
import { Button, Card, Input } from '@modular-ui/system';

export default function Example() {
  return (
    <Card>
      <Input label="Email" type="email" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Deployment

### Build

```bash
pnpm build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npx vercel
```

### Environment Variables

No environment variables are required for the basic setup. Add them in `.env.local` if needed:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Contributing

This is part of the Modular UI System monorepo. Please refer to the main repository's contributing guidelines.

## License

MIT License - see the LICENSE file in the repository root.
