# Next.js + Clerk + Drizzle + Chrome Extension Turborepo

A full-stack monorepo template with Next.js, Clerk authentication, Drizzle ORM, tRPC, and a Chrome extension. Use this as a starting point for your next project.

## Use This Template

Click **"Use this template"** on GitHub to create a new repository from this template:

1. Click the green **"Use this template"** button at the top of this repository
2. Select **"Create a new repository"**
3. Name your repository and create it
4. Clone your new repo and follow the setup steps below

## Installation

> [!NOTE]
>
> Make sure to follow the system requirements specified in [`package.json#engines`](./package.json#L4) before proceeding.

### 1. Setup dependencies

```bash
# Install dependencies
pnpm i

# Configure environment variables
cp .env.example .env

# Push the Drizzle schema to the database
pnpm db:push
```

### 2. Configure environment variables

Edit `.env` with your values. See `.env.example` for reference. You'll need:

- **Database:** `POSTGRES_URL` — The database is preconfigured for Supabase/Vercel Postgres (edge-bound). See [db package](./packages/db) if using a different database.
- **Clerk:** `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, and optional `CLERK_WEBHOOK_SIGNING_SECRET` for user lifecycle sync.

### 3. Configure Clerk

1. Add your Clerk keys to `.env`
2. In Clerk Dashboard, configure OAuth providers and webhook endpoint: `POST /api/webhooks/clerk`

## Project Structure

```text
.github
  └─ workflows
        └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode
apps
  ├─ chrome-extension
  │   ├─ Plasmo-based Chrome extension
  │   ├─ Clerk for Chrome extension auth
  │   └─ React 19
  ├─ expo
  │   ├─ Expo SDK 54
  │   ├─ React Native 0.81 using React 19
  │   ├─ Navigation using Expo Router
  │   ├─ Tailwind CSS v4 using NativeWind v5
  │   └─ Typesafe API calls using tRPC
  ├─ nextjs
  │   ├─ Next.js 15
  │   ├─ React 19
  │   ├─ Tailwind CSS v4
  │   ├─ Clerk authentication
  │   └─ E2E Typesafe API Server & Client
  └─ tanstack-start
      ├─ Tanstack Start v1 (rc)
      ├─ React 19
      ├─ Tailwind CSS v4
      └─ E2E Typesafe API Server & Client
packages
  ├─ api
  │   └─ tRPC v11 router definition
  ├─ auth
  │   └─ Shared auth environment utilities
  ├─ db
  │   └─ Typesafe db calls using Drizzle & Supabase
  ├─ ui
  │   └─ Shared UI package using shadcn-ui
  └─ validators
      └─ Shared validation schemas
tooling
  ├─ eslint
  │   └─ Shared, fine-grained eslint presets
  ├─ prettier
  │   └─ Shared prettier configuration
  ├─ tailwind
  │   └─ Shared tailwind theme and configuration
  └─ typescript
      └─ Shared tsconfig you can extend from
```

> In this template, we use `@acme` as a placeholder for package names. Replace it with your own organization or project name (e.g. `@my-company` or `@project-name`) using find-and-replace.

## Quick Start

```bash
# Run all apps in development
pnpm dev

# Run only Next.js
pnpm dev:next
```

## Adding UI Components

Run the `ui-add` script to add a new UI component using the interactive `shadcn/ui` CLI:

```bash
pnpm ui-add
```

## Adding a New Package

To add a new package, run:

```bash
pnpm turbo gen init
```

This prompts you for a package name and optional dependencies. The generator sets up `package.json`, `tsconfig.json`, builds configuration, and tooling (formatting, linting, typechecking).

## Deploying

### Next.js (Vercel)

1. Create a new project on [Vercel](https://vercel.com), select `apps/nextjs` as the root directory.
2. Add your `POSTGRES_URL` and Clerk environment variables.
3. Deploy. The Clerk webhook endpoint is at `POST /api/webhooks/clerk`.

### Chrome Extension

1. Build the extension: `pnpm --filter @acme/chrome-extension build`
2. Load the unpacked extension from `apps/chrome-extension/build/chrome-mv3-dev` in Chrome (developer mode).
3. For production, use `plasmo package` to create a distributable zip.

### Expo

See the [Expo deployment guide](https://docs.expo.dev/distribution/introduction). Ensure `getBaseUrl` in `apps/expo/src/utils/api.tsx` points to your production backend URL.

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `pnpm dev`     | Run all apps in dev mode       |
| `pnpm dev:next`| Run Next.js only               |
| `pnpm build`   | Build all packages and apps    |
| `pnpm lint`    | Lint all packages              |
| `pnpm typecheck` | Typecheck all packages       |
| `pnpm format`  | Format code with Prettier      |
| `pnpm db:push` | Push Drizzle schema to DB      |
| `pnpm db:studio` | Open Drizzle Studio          |

## License

MIT
