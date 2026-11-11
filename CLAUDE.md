# boxykit

A UI kit: plain CSS is the source of truth, `boxykit/react` only maps props to the same classes and attributes. Minimal on purpose: few components, no runtime dependencies, strict lint. Releasing: `docs/publishing.md`; the docs site: `docs/deployments.md`.

## Layout

- `packages/boxykit/src/css/` — `tokens.css` (the theme), `reset.css`, `components/<name>.css`, `index.css` (imports all).
- `packages/boxykit/src/react/` — one `<name>.tsx` per component, `index.ts` exports them.
- `packages/boxykit/test/` — Vitest tests of the components with behavior, and of the built package.
- `apps/docs/` — Next.js docs, one page with every component, laid out in Feature-Sliced Design: `app/` is Next.js routing only (the layout, and `page.tsx` re-exporting the page); the page is the slice `src/_pages/showcase/` (`ui/`, `model/` the React/CSS mode and the theme, `config/`, `lib/`, `examples/`), imported only through its `index.ts`. No `shared/` or other layers until two pages need the same code. Each example is a row: titled "Component · Variant", the element on the left, and on the right its about and Show code (the code opens there; in CSS mode with the files to import); no group headers; anchors, the Light/Dark and React/CSS switches down the right side. React shows the example's source, CSS the HTML it renders (from `scripts/render-examples.tsx`, into the slice's git-ignored `generated/`) and the files to import. `scripts/copy-css.ts` copies the package's `boxy.css` to `public/boxykit.css` (git-ignored) for the Download CSS button. `src/_pages/showcase/examples/<component>/<name>.tsx` is one example; register it in `examples/registry.ts` with a title and an about line.
- `apps/docs/test/examples.test.tsx` — CSS ⇔ React parity and axe over every example.

## Adding a component

1. `src/css/components/<name>.css` inside `@layer boxy.components { … }`; add it to `index.css`.
2. `src/react/<name>.tsx`; export from `index.ts`.
3. Examples in `apps/docs/src/_pages/showcase/examples/<name>/` that between them use every class, and a registry entry (with its `css` files).
4. A test if it has behavior; `npm run changeset`.

`VERSION` mirrors the package's version (the docs show it); `npm run version-packages` bumps both.

## CSS

- Classes: `boxy-<block>`, then `boxy-<block>-<part>` and `boxy-<block>-<variant>` (`boxy-table-cell`, `boxy-button-small`). Every class is prefixed, parts too.
- State is a native attribute: `:disabled`, `[aria-invalid="true"]`, `[aria-checked="true"]`, `[aria-busy="true"]`, `[open]`. `[data-state="…"]` only when no ARIA attribute fits the element (an open table row). No `is-*` classes.
- Values come from `--boxy-*` tokens; add a token or a step when none fits. Stylelint enforces names and token values.
- Breakpoints (literal in media queries): sm 40rem, md 48rem, lg 64rem.

## React

- No dependencies but React; no framework imports (style links with `buttonClass()`); no `style` props of our own; named exports.
- A component that wraps one element takes that element's props and passes the rest on (`...props`, last), so `id`, `aria-*`, `data-*` and `ref` reach it (React 19: `ref` is a prop, no `forwardRef`). `Omit` a native prop the component uses for something else (`title` as content).
- `"use client"` only on components that use hooks (`modal.tsx`). Components with event handlers but no hooks stay server-renderable.
- Relative imports end in `.js` (NodeNext).
- Explicit return types on exports (`isolatedDeclarations`).

## Code style

- Blank line before every `return` and after a group of `const` / `let` (lint enforces it); guard lines (`if (…) return …;`) get a blank line around them.
- Prefer `if` to `? :`; return early for the special case. A one-level ternary only to pick between two short values. Nested ternaries fail lint.
- Short comments say why, not what.

## Checks

`npm run build && npm run lint && npm run typecheck && npm test && npm run check:package`, which is what CI runs.
