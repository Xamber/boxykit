# Publishing to npm

The package is `boxykit` on npm, published from `packages/boxykit` by the Release workflow
(`.github/workflows/release.yml`) with [Changesets](https://github.com/changesets/changesets).
There is no npm token: npm trusts the workflow itself (trusted publishing), and every release gets provenance.

## Releasing a change

1. In the branch with the change, describe it:

   ```sh
   npm run changeset
   ```

   Pick the bump and write one line for the changelog. It adds a small file to `.changeset/`; commit it with the change.
   While on `0.x`: `patch` for fixes, `minor` for new components and for breaking changes.

2. Merge to `main`. The Release workflow opens (or updates) a pull request **"Version packages"**: it bumps
   `packages/boxykit/package.json`, copies the version to `VERSION` and moves the lines into
   `packages/boxykit/CHANGELOG.md`. More changes merged before it are added to the same pull request.

3. Merge "Version packages" when you want to release. The workflow builds the package and publishes the new version.
   The docs site deploys with it and shows the new version (see [deployments.md](deployments.md)).

A push to `main` without a changeset publishes nothing: the workflow only publishes a version that isn't on npm yet.

## Versions

- `packages/boxykit/package.json` is the version npm sees; `VERSION` mirrors it for the docs site.
- `npm run version-packages` (what the workflow runs) bumps the first and copies it to the second.
- A test fails if they differ, so don't edit one by hand without the other.

## How it's set up

Done once, already in place:

1. The first version (0.1.0) was published by hand, because trusted publishing can only be set up for a package
   that exists on npm:

   ```sh
   npm login
   npm run build
   cd packages/boxykit && npm publish --provenance=false
   ```

   (`--provenance=false` because provenance only works from CI.)

2. On npmjs.com: boxykit → Settings → Trusted publisher → GitHub Actions: owner `Xamber`, repo `boxykit`,
   workflow `release.yml`.

3. On GitHub: Settings → Secrets and variables → Actions → Variables: `NPM_PUBLISH` = `true`.
   Without it the Release workflow is skipped; set it to anything else to pause releases.

## Publishing by hand

If the workflow can't publish (npm down, trusted publisher broken), from a clean `main`:

```sh
npm run version-packages   # only if there are changesets left
npm ci
npm run build && npm run lint && npm run typecheck && npm test && npm run check:package
cd packages/boxykit && npm publish --provenance=false
```

Commit the version bump and push it, so `main` matches npm.

## When it fails

- **`npm error code ENEEDAUTH` / 404 on publish in the workflow**: the trusted publisher on npmjs.com doesn't match
  the repo or workflow file name, or npm is older than 11.5.1 (the workflow updates npm first).
- **`npm ci` fails with "Missing: @emnapi/… from lock file"**: an incremental `npm install` on macOS dropped Linux-only
  packages from `package-lock.json`. Regenerate it from scratch: `rm -rf node_modules package-lock.json && npm install`.
- **"is not being published because version … is already published"**: not an error; nothing new to publish.
- **The version test fails**: `VERSION` and `packages/boxykit/package.json` differ; run
  `node packages/boxykit/scripts/sync-version.js`.

## Not gated by CI

The Release workflow doesn't wait for CI. Merge "Version packages" only when CI is green on `main`.
