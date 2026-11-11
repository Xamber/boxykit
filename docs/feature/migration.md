# Boxykit: extract the UI kit into its own package

## Why

`src/shared/ui/` and the theme in `src/_app/styles/globals.css` are about 1,000 lines of TSX and CSS that hold no business rules. Moving them into their own repo and npm package lets other projects use the same look, and gives the kit its own docs, tests and versions.

Decisions:
- The kit is called **Boxykit** (package, repo and docs site). Every class gets the `boxy-` prefix and every custom property gets `--boxy-`.
- One package with two entry points:
  - **CSS:** `import "boxykit/css"`, or a `<link>` to the built file. Works with any framework or none.
  - **React:** `import { Button } from "boxykit/react"`. Thin components that output the same classes as the CSS version.
- A separate GitHub repo, published to npm by GitHub Actions.
- A Next.js docs site with explanations and live examples, showing the React and HTML version of each example side by side.
- Keep it minimal: few components, few dependencies, strict lint everywhere.

## Package name

**`boxykit`**: the npm package, the GitHub repo and the docs site name. It was free on npm on 2026-11-11 (`boxy` is taken by an unrelated package). The CSS prefixes stay short: `boxy-` for classes and `--boxy-` for custom properties.

Reserve it early: publish a placeholder `0.0.0` from the empty repo in Phase 0, so nobody else takes it or a name too close to it (npm blocks names that differ only by punctuation).

## Naming

The class pattern is `boxy-<block>` for the root and `boxy-<block>-<part>` for parts and variants. Every class is prefixed, children included. Generic child names like `.row` or `.cell` would pick up the consuming app's styles, so a library can't use the swe-piha "short child names" rule.

| Kind | Example |
| --- | --- |
| Block | `boxy-button`, `boxy-input`, `boxy-table` |
| Variant | `boxy-button-accent`, `boxy-button-small`, `boxy-input-muted` |
| Part | `boxy-table-row`, `boxy-table-cell`, `boxy-modal-title` |
| State | native attributes where they exist: `:disabled`, `[aria-invalid="true"]`, `[aria-pressed="true"]`, `[aria-selected="true"]`, `[open]`. Use `[data-state="…"]` only when no native one fits. No `is-open` classes. |
| Token | `--boxy-bg`, `--boxy-space-4`, `--boxy-radius` |
| Layer | `@layer boxy.reset, boxy.tokens, boxy.components`, so any app style outside a layer wins without `!important` |

States go on attributes because they make the HTML accessible as well as styled, and the same markup works in both versions.

## Repo layout

npm workspaces, one package plus the docs app:

```
boxykit/
├── packages/boxykit/
│   ├── src/
│   │   ├── css/
│   │   │   ├── tokens.css        :root light tokens + [data-boxy-theme="dark"] + prefers-color-scheme
│   │   │   ├── reset.css         the @layer reset from globals.css, optional
│   │   │   ├── button.css        one file per component
│   │   │   ├── …
│   │   │   └── index.css         @layer order + @import of all the above
│   │   └── react/
│   │       ├── button.tsx        one file per component, no CSS imports
│   │       ├── …
│   │       ├── class-names.ts
│   │       └── index.ts
│   ├── test/
│   ├── package.json
│   └── tsconfig.json
├── apps/docs/                    Next.js site, depends on "boxykit": "*" (npm workspaces link it)
├── .github/workflows/
│   ├── ci.yml
│   └── release.yml
├── .changeset/
├── eslint.config.js
├── stylelint.config.js
├── tsconfig.base.json
└── CLAUDE.md
```

### Package exports

```jsonc
{
  "name": "boxykit",
  "type": "module",
  "sideEffects": ["**/*.css"],
  "exports": {
    "./css": "./dist/css/boxy.css",          // everything: tokens + reset + components
    "./css/tokens": "./dist/css/tokens.css", // tokens only, to theme your own CSS
    "./css/reset": "./dist/css/reset.css",
    "./css/*": "./dist/css/components/*.css",// one component: "boxykit/css/button"
    "./react": { "types": "./dist/react/index.d.ts", "default": "./dist/react/index.js" }
  },
  "files": ["dist"],
  "peerDependencies": { "react": ">=19" },
  "peerDependenciesMeta": { "react": { "optional": true } }
}
```

React is an optional peer, so CSS-only users don't install it.

### Build

Keep it minimal, with no bundler:
- **CSS:** `lightningcss` bundles `index.css` into `dist/css/boxy.css` (resolves `@import`, minifies, adds prefixes for a browserslist target). It also copies each component file to `dist/css/components/`.
- **React:** plain `tsc` emits one `.js` + `.d.ts` per file. This keeps `"use client"` at the top of the files that need it (bundlers tend to strip it) and allows tree shaking for free.

## The two versions stay in sync

- **CSS is the source of truth.** A React component only maps props to classes and attributes, plus behavior that CSS can't do (focus handling, `<dialog>` open/close, keyboard handling in a toggle group).
- Each component exports a class helper next to the component, e.g. `buttonClass({ look: "accent", size: "small" })` → `"boxy-button boxy-button-accent boxy-button-small"`. This is also how links are styled, with no router dependency: `<Link className={buttonClass({ look: "accent" })}>`. This replaces the `next/link` imports in `buttons.tsx` and `nav.tsx`.
- **Parity test:** render every docs example with `renderToStaticMarkup`, collect every `boxy-*` class, and fail if one isn't defined in the built CSS. A second check fails on any class defined in the CSS that no example uses (a dead or undocumented class).

## Strict lint and code rules

The library's own `CLAUDE.md` and lint config:

**TypeScript:** `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, NodeNext (relative imports end in `.js`), and `isolatedDeclarations` in the build (forces explicit export types, which makes the `.d.ts` files clean). `exactOptionalPropertyTypes` was left out: it makes passing optional props through components painful.

**ESLint 9** (the React and a11y plugins don't support 10 yet): `typescript-eslint` `strictTypeChecked` + `stylisticTypeChecked`, `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` (strict), plus the swe-piha style rules: blank line before `return` and after `const` groups, `no-nested-ternary`. Also:
- `no-restricted-imports`: no `next/*` and no runtime dependencies in `packages/boxykit`
- `react/forbid-component-props` for `style`, so styling comes only through classes and tokens
- named exports only, no default exports

**Stylelint:** `stylelint-config-standard` plus:
- `selector-class-pattern: ^boxy(-[a-z0-9]+)+$`
- `custom-property-pattern: ^boxy-`
- `stylelint-declaration-strict-value` for `color`, `background*`, `border-color`, `z-index`, `font-size`, `gap`, `padding`, `margin`, `border-radius`, so values must come from tokens
- `selector-max-id: 0`, `selector-max-specificity` (e.g. `0,3,0`), no `!important`
- every rule must sit inside `@layer boxy.*` (custom check or `stylelint-plugin` rule)

**Other:** `publint` and `@arethetypeswrong/cli` on the built package in CI, so the `exports` map and types are known to work.

## Components

### Moved from swe-piha (v0.1)

| swe-piha | Boxykit | Notes |
| --- | --- | --- |
| `Button`, `SubmitButton`, `ButtonLink` | `Button`, `SubmitButton`, `buttonClass()` | `ButtonLink` becomes `buttonClass()` on your router's link. The admin-only `"stop"` look stays in the app. |
| `TextInput` | `Input` | Gets `muted` and `invalid` (through `aria-invalid`). |
| `ToggleGroup` | `ToggleGroup` | |
| `Modal` | `Modal` | Stays `"use client"`. Bottom sheet below the `md` breakpoint as now. |
| `Popups`, `Popup`, `ActionPopup` | `Toasts`, `Toast` | |
| `Spinner`, `ProgressRing` | `Spinner`, `ProgressRing` | |
| `ErrorMessage`, `EmptyMessage` | `Alert` (tone), `Empty` | |
| `DataTable` | `Table` | Column `key` becomes the cell's `data-column` attribute instead of a class, so apps target `[data-column="word"]`. An open row is `data-state="open"`: `aria-expanded` isn't allowed on a plain table row. No `"use client"`, so static tables render on the server. |
| `TitledSection`, `SectionHeading` | `Section` | |
| `TagList` | `Tag`, `TagList` | |
| `Page`, `SplitColumns`, the play board | `Board`, `BoardCell` | The full-screen layout: cells split by lines, 2:1 columns (or `even`), quarters or halves, a `tall` cell. `--boxy-board-height` (100dvh) fits it under a header. |
| `StatTiles`, `StatTile`, `SelectableTiles`, `TileIndex`, `shareRing` | the same | States on attributes: a clickable tile is a `boxy-stat-tile-button` inside, faded through `:has(:disabled)`. |
| `LabelSquares`, `LabelSquare` | the same | Sized by `--boxy-square-size` instead of the page. |
| `NavStrip`, `NavCell` | `Nav`, `NavLink` | Numbered by a CSS counter, the current page through `aria-current="page"`; with a router, `<Link className="boxy-nav-link">`. |
| The showcase's text styles | `Headline`, `HeroNumber`, `Caption`, `Mono` | |
| `classNames` | `classNames` | Exported for apps. |

**Moved after all (2026-11-11):** the tiles, squares, nav strip and play board turned out to be the kit's look, not the app's, so they are in Boxykit (rows above). Stays in swe-piha: the app header around the `Nav`, and page-specific sizes.

### New (v0.2)

In priority order:
1. **`Field`**: label + control + hint + error, wired up with `id`/`aria-describedby`/`aria-invalid`. Every form control goes inside it.
2. **`Checkbox`, `Radio`, `Switch`, `Select`, `Textarea`**: styled native elements, with no custom dropdowns.
3. **`ProgressBar`**: styled `<progress>`.
4. **`Skeleton`**
5. **`Badge`**
6. **`Tabs`**: `role="tablist"` with arrow-key handling, the only new component that needs JS.

### Later, only when needed

`Tooltip` and `Menu` (Popover API + CSS anchor positioning), `Disclosure` (styled `<details>`), `Card`, `Divider`, `Kbd`, a visually-hidden utility, icons (pick Lucide or a small SVG set, no icon font).

## Tokens

Move the `:root` from `globals.css`, renamed to `--boxy-*`, and add:
- **Dark theme:** the same semantic names with dark values under `[data-boxy-theme="dark"]` and `@media (prefers-color-scheme: dark) { :root:not([data-boxy-theme="light"]) }`. The existing `--band-*` colors may become the base of the dark palette.
- **`--boxy-info`**, plus a `-soft` version of every tone (`success`, `info` are missing today)
- **z-index scale:** `--boxy-z-raised`, `--boxy-z-dropdown`, `--boxy-z-toast`, `--boxy-z-modal`. These replace the raw `1` and `20`.
- **Motion:** `--boxy-duration-fast`, `--boxy-duration`, `--boxy-duration-slow`, `--boxy-ease`
- **Shadows:** `--boxy-shadow-small`, `--boxy-shadow`, `--boxy-shadow-large`
- **`--boxy-opacity-disabled`**
- **Breakpoints:** `sm 40rem`, `md 48rem`, `lg 64rem`, documented. Use `@custom-media --boxy-md (min-width: 48rem)` in the source, and lightningcss replaces them at build time.
- **Fonts:** `--boxy-font-sans` falls back to `ui-sans-serif, system-ui`. Boxykit doesn't ship Geist; the app sets the variable (swe-piha sets it from `next/font`).

App-specific tokens stay in swe-piha: `--header-height`, `--content-height`, `--viewport-height`, `--content-width`. The safe-area insets (`--boxy-safe-*`) can move, since the modal and toasts use them.

## Docs site (`apps/docs`)

Next.js App Router, statically exported (`output: "export"`), deployed on Vercel or GitHub Pages. It uses Boxykit itself for its own UI.

Pages:
- **Getting started:** install, the CSS import vs. the React import, a `<link>` from jsDelivr for no-build use
- **Theming:** tokens, overriding variables, dark mode, `@layer` and how app styles win
- **Tokens:** generated from `tokens.css`. Color swatches in both themes, the type scale, spacing, radii, shadows.
- **One page per component:**
  - what it's for and when not to use it
  - live examples
  - each example's code in two tabs, **React** and **HTML**
  - props table
  - classes and attributes
  - accessibility notes

How the examples work:
- Each example is one file: `apps/docs/examples/button/accent.tsx`.
- The page renders it live and reads its source with `fs` in a server component for the React tab.
- The HTML tab is `renderToStaticMarkup(<Example />)`, formatted. This shows exactly what the CSS-only user writes, and it can never go out of date.
- The parity test (above) runs over the same example files.

Props tables are generated from the `.d.ts` files with `react-docgen-typescript`, or written by hand while the API is small. Start by hand.

Base it on the current `src/_pages/ui-showcase` page. **Done as one page (2026-11-11):** every component on `/`, the element on the left, its title and code (behind Show code) on the right, anchors and the Light/Dark and React/CSS switches on the right. CSS mode shows the HTML and the files to import.

## CI and release

**`ci.yml`**, on every PR and push to `main`:
1. `npm ci`
2. `npm run lint` (ESLint + Stylelint)
3. `npm run typecheck`
4. `npm run build` (package, then docs)
5. `npm test` (parity test + Vitest component tests)
6. `publint` + `attw --pack`

**`release.yml`** on `main`, using Changesets:
- Every PR that changes the package adds a changeset (`npx changeset`).
- `changesets/action` opens a "Version packages" PR. Merging it publishes to npm.
- Publish with **npm trusted publishing** (GitHub OIDC, no `NPM_TOKEN` secret) and `--provenance`.
- Docs deploy from `main` through the Vercel GitHub integration, or a Pages workflow.

Versions: stay on `0.x` until swe-piha has fully moved over. Breaking changes bump the minor version while on `0.x`.

## Tests (minimal)

- The parity test (classes in examples ⇔ classes in CSS)
- Vitest + Testing Library for the components with behavior: `Modal` (open/close/Escape), `ToggleGroup` and `Tabs` (keyboard), `Field` (aria wiring)
- `axe-core` run over every rendered docs example in Vitest (jsdom). Catches missing labels and roles.
- Later: Playwright screenshots of the docs pages in light/dark, once the look is stable.

## Phases

### Phase 0: decisions (in swe-piha)
- [ ] Create the `boxykit` GitHub repo and the npm account; publish a placeholder `boxykit@0.0.0`
- [ ] Mark each `shared/ui` component as Boxykit or app-only (table above)

### Phase 1: scaffold the repo (done 2026-11-11, along with Phases 2–3; nothing published yet)
- [x] Workspaces, `tsconfig.base.json`, strict ESLint + Stylelint configs, `CLAUDE.md` with the naming rules
- [x] Empty package with the `exports` map; `build` (lightningcss + tsc) works on one placeholder file
- [x] The `ci.yml` steps pass locally (not run on GitHub yet); `publint` + `attw` pass
- [x] Docs app boots, imports `boxykit/css` and `boxykit/react` through the workspace link

### Phase 2: tokens and reset
- [ ] `tokens.css` from `globals.css`, renamed to `--boxy-*`, with the new tokens above
- [ ] Dark theme
- [ ] `reset.css` in `@layer boxy.reset`
- [ ] Docs: Getting started, Theming and Tokens pages

### Phase 3: move the existing components
For each component in the table, in this order: `Button` → `Input` → `Alert`/`Empty` → `Spinner`/`ProgressRing` → `Section` → `Tag` → `ToggleGroup` → `Table` → `Toast` → `Modal`:
- [ ] CSS: rename to `boxy-*`, states on attributes, literal values replaced by tokens, inside `@layer boxy.components`
- [ ] React: no CSS import, no `next/*`, class helper exported, explicit types
- [ ] Docs page with examples; parity and axe tests pass

### Phase 4: publish 0.1.0
- [ ] Changesets + `release.yml` + npm trusted publishing set up
- [ ] Publish `0.1.0`, deploy the docs
- [ ] Try it in an empty Vite project with **CSS only** (no React) and with React, to check both entry points from a clean install

### Phase 5: move swe-piha onto Boxykit
- [ ] `npm i boxykit`; import `boxykit/css` in the root layout; set `--boxy-font-sans` from `next/font`
- [ ] Rename tokens in the app CSS: `--bg` → `--boxy-bg`, etc. (a scripted search-and-replace over `src/**/*.css`; check with the showcase page)
- [ ] `src/shared/ui/` keeps only the app-only components (rebuilt on `--boxy-*` tokens), and pages import Boxykit directly from `boxykit/react`. Allow it in the FSD lint as an external package like `react`.
- [ ] Update page CSS that targets kit classes (`.words-table .cell.word` → `.words-table [data-column="word"]`, etc.)
- [ ] Replace `ButtonLink` with `<Link className={buttonClass(…)}>`
- [ ] Remove the moved CSS/TSX from `src/shared/ui/` and the theme from `globals.css` (keep the app tokens)
- [ ] Replace `ui-showcase` with a link to the docs site, or keep it for the app-only components
- [ ] Update `CLAUDE.md` (shared/ui section and the CSS rules) and `docs/architecture.md`

### Phase 6: new components (0.2.0)
- [ ] `Field`, `Checkbox`, `Radio`, `Switch`, `Select`, `Textarea`, then replace the raw `<input>`/`<select>`/`<textarea>` in swe-piha pages
- [ ] `ProgressBar`, `Skeleton`, `Badge`, `Tabs`
- [ ] Docs + tests for each; publish `0.2.0`

### Later
- Tooltip, Menu, Disclosure, Card, icons, when a page needs them
- Playwright screenshot tests
- Move the swe-piha tiles into Boxykit if another project wants them

## Risks

- **Phase 5 rename is the biggest risk.** Many page styles target kit classes and tokens. Do it on a branch, one section at a time, and compare screenshots of each page before and after.
- **Development across two repos is slow** while the API is still changing. During Phase 5, work against a local checkout (`npm link` or `"boxykit": "file:../boxykit/packages/boxykit"`) and publish only when a step is done. If it gets painful, `pkg.pr.new` gives a preview build per PR.
- **`"use client"` gets lost** if a bundler is ever added. Plain `tsc` avoids this, and a test checks that `dist/react/modal.js` starts with the directive.
- **Strict value lint vs. one-off values:** some values really are one-offs (e.g. the ring stroke width). Allow them with a comment that says why, via a `stylelint-disable-next-line` that requires a description.
