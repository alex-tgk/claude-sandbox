# Repository Guidelines

## Agent Setup & Documents
- Claude-specific permissions and document hooks live in `.claude/settings.local.json`; update this file when adding new commands so the sandboxed agent can opt in automatically.
- Load `docs/AI-AGENT-GUIDE.md` as the primary knowledge source for AI assistants—its workflows and patterns are required context before modifying components or scripts.

## Project Structure & Module Organization
- `src/` contains the library: `components/atoms|molecules|organisms|templates`, `hooks/`, `utils/`, and `styles/`. Place new pieces in the matching layer and re-export via `src/index.ts`.
- `docs/` stores usage notes, `example/` is a Vite playground for manual QA, `scripts/` holds helpers like `generate-component.ts`, and `dist/` plus `storybook-static/` are build outputs—never edit them manually.
- Tailwind tokens live in `tailwind.config.ts`; shared config such as Vitest setup sits in `src/test/setup.ts`.

## Build, Test, and Development Commands
- Install dependencies with `pnpm install`. Use `pnpm dev` for the component sandbox and `pnpm dev:example` to test the reference app.
- `pnpm build` (or `pnpm build:lib` before publishing) runs `tsc` and Vite to emit `dist/`. `pnpm storybook` and `pnpm build-storybook` preview or export the docs site.
- Quality gates: `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, and `pnpm precommit` (lint + format check + typecheck + coverage) before every push.

## Coding Style & Naming Conventions
- TypeScript + React functional components only. Components use PascalCase file/export names (`Button.tsx`), hooks start with `use`, utility helpers stay in `src/utils`.
- Prettier enforces 2-space indentation, 100-character lines, semicolons, and double quotes in JSX via `.prettierrc.json`. Run `pnpm format` instead of ad-hoc formatting.
- ESLint (`pnpm lint`) must pass with zero warnings. Compose styles with Tailwind classes plus the `cn()` helper; prefer tokens defined in `styles/tokens.css` and the Tailwind theme.

## Testing Guidelines
- Vitest with Testing Library drives coverage; co-locate specs as `*.test.ts(x)` beside their implementation. Import shared mocks from `src/test/setup.ts`.
- New UI must cover keyboard focus, aria attributes, and variant props. Use `pnpm test` for fast feedback and `pnpm test:coverage` to meet the coverage threshold enforced by CI.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (`feat:`, `fix:`, `chore:`) as seen in `git log`. Include a scope when helpful (`feat(button): add ghost variant`).
- PRs need a clear summary, linked issue, screenshots or Storybook URLs for visual changes, and notes about tests/coverage. Call out breaking changes and rollout steps explicitly.
