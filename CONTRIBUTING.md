# Contributing to Presk

Thank you for contributing to Presk. This guide explains how to propose changes, work on issues, open pull requests, and keep the codebase consistent.

## Workflow Overview

1. **Open a GitHub Issue first**
2. **Create a branch from the issue**
3. **Make your changes following the architecture rules**
4. **Open a Pull Request and pass the checks**
5. **Squash and merge to `main`**

## 1. Open a GitHub Issue

All non-trivial work should start with a GitHub Issue. We provide issue templates for:

- **Bug report** — reproducible bugs or crashes
- **Feature request** — new functionality or improvements
- **Question** — support or clarification requests

Pick the right template and fill in the requested details. Maintainers will review and label the issue before work begins.

## 2. Create a Branch

Branch names are derived from the GitHub issue:

```text
<issue-number>-<issue-title>
```

Examples:

```text
42-add-push-notifications
133-fix-conversation-list-scroll
```

Create the branch from the latest `main`:

```bash
git checkout main
git pull origin main
git checkout -b 42-add-push-notifications
```

## 3. Make Your Changes

Follow the architecture and routing conventions documented in [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) and [`docs/ROUTING.md`](docs/ROUTING.md).

### Key Rules

- Keep `src/app/` for routing only. Do not put business logic, API calls, heavy hooks, or validation schemas in route files.
- Place feature code inside `src/features/<domain>/`.
- Place truly shared UI inside `src/components/ui/`.
- Use the feature-local store for feature state and `src/store/` only for global app-wide state.
- Prefer explicit imports; avoid importing another feature's internal files.

## 4. Verify Your Changes

Before opening a PR, run the required checks locally:

```bash
npm run lint
npx tsc --noEmit
```

The CI workflow in `.github/workflows/expo.yml` runs `npm run lint` automatically on every pull request.

## 5. Open a Pull Request

- Use a clear title that references the issue: `feat(#42): add push notifications`.
- Fill in the PR description with what changed and why.
- Link the related issue in the description using `Closes #42` or `Relates to #42`.
- Ensure CI passes before requesting review.

## 6. Merge

We use **squash and merge** to keep `main` clean. The commit message should describe the change clearly.

## Code Style

- Use TypeScript everywhere possible.
- Keep components small and focused.
- Co-locate types and validation schemas with the owning feature.
- Avoid circular imports.
- Do not use barrel exports that hide boundaries, except inside a feature's public `index.ts`.

## Questions?

If you are unsure about an architectural decision, open a Question issue or discuss in an existing issue before writing code.
