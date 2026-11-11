# Deploying the docs site

The docs (`apps/docs`) are a Next.js static export, deployed by Vercel from GitHub.

- Every push to `main` deploys to production.
- Every pull request and other branch gets a preview link (Vercel comments it on the pull request).
- The site shows the version from `VERSION`, so a release deploys with its new version (see [publishing.md](publishing.md)).

## How it's set up

The Vercel project imports `Xamber/boxykit` with **Root Directory `apps/docs`**. The rest is in
`apps/docs/vercel.json`, so the project settings can stay at their defaults:

| Setting          | Value                         | Why                                                         |
| ---------------- | ----------------------------- | ----------------------------------------------------------- |
| Framework        | none                          | a static export: Vercel serves files, no Next.js server     |
| Install command  | `cd ../.. && npm ci`          | the whole workspace, from the repo's lock file              |
| Build command    | `cd ../.. && npm run build`   | the package first (the docs import it), then the docs       |
| Output directory | `out`                         | `apps/docs/out`, what `next build` exports                  |

Node is 24 or later, from `engines` in `apps/docs/package.json`.

To set it up again: vercel.com → Add New → Project → import `Xamber/boxykit` → Root Directory `apps/docs` → Deploy.

## Before you push

Build and look at exactly what Vercel will serve:

```sh
npm run build
cd apps/docs/out && python3 -m http.server 4173   # http://localhost:4173
```

`npm run dev` is quicker while working, but only the static build shows what gets deployed.

## When it fails

- **`tsx: command not found`** (or `next` not found): the build ran without the workspace's dev dependencies, so
  Vercel didn't use `apps/docs/vercel.json`. Check that the project's Root Directory is `apps/docs` and that
  the install and build commands aren't overridden in the project settings.
- **`npm ci` fails with "Missing: … from lock file"**: see the lock file note in [publishing.md](publishing.md).
- **The site shows an old version**: `VERSION` wasn't bumped; it's read at build time.

## Not gated by CI

Vercel deploys every push to `main`, whether CI passes or not. A broken commit on `main` goes live until the
next one; roll back in Vercel (Deployments → an earlier one → Promote to Production) while you fix it.
