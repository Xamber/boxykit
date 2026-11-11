# Publishing to npm

The package is `boxykit` on npm, published from `packages/boxykit` by the Release workflow
(`.github/workflows/release.yml`). There is no npm token: npm trusts the workflow itself (trusted publishing), and
every release gets provenance.

## Releasing a change

1. Bump `VERSION` (the repo root) and add the release's lines to `packages/boxykit/CHANGELOG.md`.
   While on `0.x`: the last number for fixes, the middle one for new components and for breaking changes.
2. Merge (or push) to `main`.

CI runs on the push. When it passes, the Release workflow checks npm for the version in `VERSION`: if npm doesn't
have it, it builds the package and publishes it; if npm has it, it stops there. So a push that doesn't bump `VERSION`
publishes nothing, and a failed publish is retried by the next green push to `main` (or by re-running Release).
The docs site deploys with the push and shows the new version (see [deployments.md](deployments.md)).

## Versions

- `VERSION` is the only place to set it. The package's build (`npm run build`) copies it into
  `packages/boxykit/package.json` (`scripts/sync-version.js`), so commit that file too after a build.
- The docs site reads `VERSION` for its header and the Download CSS file name.

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

If the workflow can't publish (npm down, trusted publisher broken), from a clean `main` with `VERSION` bumped:

```sh
npm ci
npm run build && npm run lint && npm run typecheck && npm test
cd packages/boxykit && npm publish --provenance=false
```

The next Release run then finds the version on npm and skips it.

## When it fails

- **Release didn't run**: it only runs after a green CI run of a push to `main`, and only with `NPM_PUBLISH` set.
  A CI run cancelled by a newer push doesn't count; the newer one's run does.
- **`npm error code ENEEDAUTH` / 404 on publish**: the trusted publisher on npmjs.com doesn't match the repo or the
  workflow file name, or npm is older than 11.5.1 (the workflow updates npm first).
- **`npm ci` fails with "Missing: @emnapi/… from lock file"**: an incremental `npm install` on macOS dropped Linux-only
  packages from `package-lock.json`. Regenerate it from scratch: `rm -rf node_modules package-lock.json && npm install`.
