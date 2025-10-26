# Commercial Showcase Setup Guide

This guide will help you set up and run the Next.js 14 commercial showcase website.

## Prerequisites

- Node.js >= 18.17.0
- pnpm >= 8.0.0

## Quick Start

### Option 1: Run with Library (Recommended)

1. **Build the library first:**
   ```bash
   cd /Users/acarroll/dev/projects/claude-sandbox
   pnpm install
   pnpm --filter @modular-ui/system build
   ```

2. **Run the commercial app:**
   ```bash
   cd apps/commercial
   pnpm dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Option 2: Run Standalone (Without Library Build)

If the library has TypeScript errors and won't build, you can still run the commercial app:

1. **Install dependencies:**
   ```bash
   cd /Users/acarroll/dev/projects/claude-sandbox/apps/commercial
   pnpm install --ignore-workspace
   ```

2. **Comment out library imports temporarily:**
   The app is designed to gracefully handle missing library components during development.

3. **Run development server:**
   ```bash
   pnpm dev
   ```

## Workspace Integration

### Adding to Root Scripts

Update the root `package.json` to add convenience scripts:

```json
{
  "scripts": {
    "dev:commercial": "pnpm --filter @modular-ui/commercial dev",
    "build:commercial": "pnpm --filter @modular-ui/commercial build",
    "start:commercial": "pnpm --filter @modular-ui/commercial start"
  }
}
```

Then run from the root:
```bash
pnpm dev:commercial
```

### Building for Production

```bash
# Build the library first
pnpm --filter @modular-ui/system build

# Build the commercial app
pnpm --filter @modular-ui/commercial build

# Start production server
pnpm --filter @modular-ui/commercial start
```

## Troubleshooting

### Issue: TypeScript errors in library preventing build

**Solution:** Fix the TypeScript errors in the main library or use Option 2 above.

### Issue: Module not found '@modular-ui/system'

**Solution:** Build the library first:
```bash
cd /Users/acarroll/dev/projects/claude-sandbox
pnpm --filter @modular-ui/system build
```

### Issue: Port 3000 already in use

**Solution:** Kill the process or use a different port:
```bash
pnpm dev -- -p 3001
```

### Issue: Tailwind styles not working

**Solution:** Ensure PostCSS is configured and the library path is in `tailwind.config.ts`:
```typescript
content: [
  './src/**/*.{js,ts,jsx,tsx}',
  '../../src/**/*.{js,ts,jsx,tsx}', // Library components
]
```

## Development Workflow

1. **Make changes** to any `.tsx`, `.ts`, or `.css` files
2. **Hot reload** will automatically update the browser
3. **TypeScript errors** will appear in the terminal and browser
4. **Lint on save** if you have ESLint extension enabled

## Project Structure

```
apps/commercial/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout with nav/footer
│   │   ├── page.tsx         # Landing page
│   │   ├── components/      # Component explorer
│   │   ├── examples/        # Usage examples
│   │   ├── docs/            # Documentation
│   │   └── pricing/         # Pricing page
│   ├── components/          # Site-specific components
│   └── lib/
│       └── utils.ts         # Utility functions
├── public/                  # Static assets
└── [config files]
```

## Available Pages

- **/** - Landing page with hero, features, and CTAs
- **/components** - Component library browser
- **/examples** - Real-world usage examples
- **/docs** - Quick start and documentation
- **/pricing** - Pricing tiers and FAQ

## Configuration Files

### `next.config.js`
- Transpiles workspace packages
- Configures standalone output
- Optimizes images

### `tailwind.config.ts`
- Extends library design tokens
- IBM Carbon color palette
- Sharp corners aesthetic
- Custom animations

### `tsconfig.json`
- Strict TypeScript settings
- Path aliases for clean imports
- Next.js plugin integration

## Next Steps

1. Add actual library components to pages
2. Create interactive demos
3. Add more example pages
4. Integrate with Storybook
5. Add analytics and SEO
6. Configure deployment

## Deployment

### Vercel (Recommended)

```bash
npx vercel
```

### Docker

```bash
docker build -t modular-ui-commercial .
docker run -p 3000:3000 modular-ui-commercial
```

### Static Export

Add to `next.config.js`:
```javascript
output: 'export',
```

Then:
```bash
pnpm build
# Output in ./out
```

## Environment Variables

Create `.env.local` for local development:

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: API
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
- [pnpm Workspace](https://pnpm.io/workspaces)
