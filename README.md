# boxykit

The boxykit UI kit (`packages/boxykit`) and its docs site (`apps/docs`). See the package [README](packages/boxykit/README.md) for usage
and [docs/feature/migration.md](docs/feature/migration.md) for the plan.

```sh
npm install
npm run dev        # builds the package, starts the docs at localhost:3000
npm run build      # package, then docs (static export to apps/docs/out)
npm run lint       # ESLint + Stylelint (after a build: the docs read generated files)
npm run typecheck
npm test           # Vitest: components, CSS/React parity, axe on every example
npm run check:package   # publint + are-the-types-wrong on the packed package
npm run changeset  # describe a change for the next release
```

## Versions

`VERSION` holds the current version; the docs site shows it. Changesets bumps `packages/boxykit/package.json`
and writes `CHANGELOG.md`; `npm run version-packages` does that and copies the version to `VERSION`
(a test checks they match).

## Releasing to npm

Changesets + GitHub Actions. Every PR that changes the package adds a changeset. On `main`, the Release workflow
opens a "Version packages" PR; merging it publishes to npm through trusted publishing (no token).

The Release workflow is off until the repo variable `NPM_PUBLISH` is `true`. To turn it on:

1. Publish the first version by hand — trusted publishing can only be set up for a package that exists:
   `npm login`, `npm run build`, then `cd packages/boxykit && npm publish --provenance=false`
   (provenance needs CI; the later releases get it).
2. On npmjs.com: boxykit → Settings → Trusted publisher → GitHub Actions, owner `Xamber`, repo `boxykit`,
   workflow `release.yml`.
3. Set the repo variable `NPM_PUBLISH=true` (Settings → Secrets and variables → Actions → Variables).

## Docs on Vercel

The Vercel project's Root Directory is `apps/docs`. Its `vercel.json` installs and builds from the repo root
(`npm ci`, `npm run build`: the package first, then the docs) and serves the static export in `apps/docs/out`.
Every push to `main` deploys; pull requests get previews.
