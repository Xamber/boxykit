# Next things to improve

A review of `packages/boxykit` (CSS, React layer, tests, build, release) on 2026-11-12, at commit `9295ba8`
("Support icons"), `VERSION` 0.2.1. Twenty things, most important first. Each says where it is, why it matters and
what to do. Style and visual design are in [style-suggestions.md](style-suggestions.md).

How this was checked: every file in `src/css` and `src/react` was read, the built `dist` was inspected, contrast
ratios were computed from the token values, and the docs page was looked at in headless Chrome in both themes.
Nothing here was tested with a real screen reader or on Safari or Firefox; the items that depend on that say so.

| # | What | Kind | Size |
|---|------|------|------|
| 1 | The focus ring can't be seen on the light theme | Accessibility | Small |
| 2 | Dropdown announces its label, never its value | Accessibility | Medium |
| 3 | Modal has no accessible name and locks nothing | Accessibility | Small |
| 4 | ToggleGroup says "radio" but doesn't act like one | Accessibility | Small |
| 5 | Clickable table rows are focusable rows with no role | Accessibility | Medium |
| 6 | 0.2.1 shipped under "Unreleased"; newer work sits at the same version | Release | Small |
| 7 | The kit uses CSS newer than the browsers it says it supports | Compatibility | Small |
| 8 | Only the Spinner respects reduced motion | Accessibility | Small |
| 9 | Outlines drawn with shadows vanish in forced colors | Accessibility | Medium |
| 10 | Several texts are below 4.5:1 | Accessibility | Small |
| 11 | Dropdown's box can't flip, gets clipped, and misses basics | Component | Medium |
| 12 | Field has no hint or error, and can't wrap a Dropdown | Component | Medium |
| 13 | Half the components don't pass native props on | API | Medium |
| 14 | English strings and arrows are baked in | API | Small |
| 15 | Controls are small for touch | Usability | Small |
| 16 | No test ever renders the CSS | Tests | Large |
| 17 | The dark palette is written twice | Maintenance | Small |
| 18 | Toasts have a look but no behavior | Component | Medium |
| 19 | No right-to-left support | Compatibility | Medium |
| 20 | Package and repo housekeeping | DX | Small each |

---

## 1. The focus ring can't be seen on the light theme

**Where:** `tokens.css`, `--boxy-ring: 0 0 0 3px var(--boxy-accent)`; used by every focusable component.

Yellow `#ffe500` on white is **1.28:1**. WCAG asks 3:1 for a focus indicator. On the dark theme the same ring is
15.5:1, so the problem is only light, which is the default. Inputs make it worse: on focus the grey border turns
yellow too (`border-color: var(--boxy-accent)`), so the field's edge gets *fainter* when focused. Keyboard users on
a white page have to hunt for where they are.

**Do:** make the ring two-tone, so it reads on any background:

```css
--boxy-ring: 0 0 0 1px var(--boxy-fg), 0 0 0 4px var(--boxy-accent);
```

and on focus set fields' `border-color` to `var(--boxy-fg)`, not the accent. The inset variant
(`inset var(--boxy-ring)`, used by Nav, list links and Choice rows) needs its own token, since `inset` can't prefix
a two-shadow value: add `--boxy-ring-inset`.

## 2. Dropdown announces its label, never its value

**Where:** `react/dropdown.tsx`, the trigger `<button>`; all three docs examples.

The trigger is a button whose text is the chosen option. Every example names it with `aria-label="Sort"`, and
`aria-label` replaces the button's text as its name. A screen reader says "Sort, button, collapsed" and never
"Newest first". The same happens if it is wrapped in a `Field` (see 12).

Related, same file:

- The trigger has `aria-haspopup="listbox"` but no `role="combobox"`, so it isn't announced as a picker.
- Option ids are built from values (`${listId}-${option.value}`). A value with a space ("new york") makes an
  invalid id, and `aria-activedescendant` then points at nothing. Use the option's index.
- The effect that scrolls the active option into view has no dependency list, so it runs on every render while open.

**Do:** give the trigger `role="combobox"`, `aria-controls`, and a name made of both parts: take a `label` prop,
render it in a visually hidden span, and set `aria-labelledby="<labelId> <valueId>"`. Build ids from the index.
Give the effect `[open, activeId]`. Then check it with VoiceOver; this one needs a real screen reader.

## 3. Modal has no accessible name and locks nothing

**Where:** `react/modal.tsx`, `css/components/modal.css`.

- The `<dialog>` has no `aria-labelledby`, so it opens as an unnamed "dialog". The title is right there in an
  `<h2>`: give it a `useId()` id and point the dialog at it.
- `showModal()` does not stop the page behind from scrolling. Add
  `:root:has(.boxy-modal[open]) { overflow: hidden; }` (with `scrollbar-gutter: stable` so the page doesn't jump).
- It takes no native props: no `id`, `aria-describedby`, `data-*` or `ref` (see 13).
- The size is fixed at `50vw` × `min-height: 50vh`. A two-line confirm gets a half-screen box. Let the content set
  the height, and make the width a token (`--boxy-modal-width`).
- ✕ has no `:focus-visible` style of its own, so it shows the browser's default outline while everything else
  shows the kit's ring.

## 4. ToggleGroup says "radio" but doesn't act like one

**Where:** `react/toggle-group.tsx`.

It renders `role="radiogroup"` with `role="radio"` buttons. That role promises the radio keyboard: one tab stop
for the group, arrows move and select. Here every option is its own tab stop and arrows do nothing, so what a
screen reader announces and what the keys do disagree.

**Do:** either add the pattern (roving `tabIndex`: 0 on the checked one, -1 on the rest; Left/Right/Up/Down move
and select, Home/End jump), or drop the radio roles and use plain buttons with `aria-pressed` in a
`role="group"`, which is what `SelectableTiles` already does. The second is ten lines and consistent with the
tiles; the first is the better experience.

## 5. Clickable table rows are focusable rows with no role

**Where:** `react/table.tsx`, `DataRow`.

A row with `onRowClick` becomes `<tr tabIndex={0}>` with click and key handlers. A screen reader lands on it and
reads the whole row's cells with no hint that it can be pressed, and an expandable row never says whether it is
open (the code notes that `aria-expanded` can't go on a plain row, and uses `data-state`).

**Do:** put a real `<button>` in the first cell (it can be visually the cell's text) that carries
`aria-expanded` and `aria-controls` for expandable rows; keep the whole-row click as a pointer shortcut. That also
removes the `tabIndex` on the row and the `CONTROLS` selector workaround gets simpler.

## 6. 0.2.1 shipped under "Unreleased"; newer work sits at the same version

**Where:** `packages/boxykit/CHANGELOG.md`, `VERSION`, `.github/workflows/release.yml`.

The state today:

- npm has `boxykit@0.2.1` (published from `6155bc0`, with the Dropdown).
- The CHANGELOG has no `## 0.2.1` heading; the Dropdown line is still under `## Unreleased`.
- `main` is one commit ahead locally (`9295ba8`: Icon, Field, the `icon` props) and `VERSION` is still 0.2.1, so
  pushing it publishes nothing. Those need 0.3.0 (new components), with the heading renamed.

**Do:** split the CHANGELOG now (`## 0.2.1` for the Dropdown, `## 0.3.0` for the rest), bump `VERSION`. Then make
it impossible to repeat: a test (or a step in CI) that fails when the CHANGELOG has no `## <VERSION>` heading. It
is four lines next to `test/package.test.ts`.

## 7. The kit uses CSS newer than the browsers it says it supports

**Where:** `scripts/build-css.js` (targets: Chrome 111, Firefox 121, Safari 16.4), `css/components/nav.css`.

`.boxy-nav-link` is `display: block` and centers its text with `align-content: center`. On a block box that needs
Chrome 123, Firefox 125 or Safari 17.4. On the older browsers in the target list the nav labels sit at the top of
the strip instead of the middle. Nothing breaks, but the stated floor isn't true.

Other newer features are used safely (`appearance: base-select` is behind `@supports`, `:open` is wrapped by
lightningcss in `:is()` so it can't void the rule, `text-wrap: balance` just doesn't balance).

**Do:** pick one: raise the targets to what is really needed (Chrome 123, Firefox 125, Safari 17.4), or center the
nav another way (grid with `align-content`, as before a block was chosen for the ellipsis). Then state the browser
support in the README; it is written nowhere a user would see it.

## 8. Only the Spinner respects reduced motion

**Where:** `progress.css` has the one `prefers-reduced-motion` query in the kit.

The Modal scales in, Toasts and table detail rows slide in, buttons and tiles shrink when pressed. None of that
stops for someone who asked for less motion.

**Do:** one block in `reset.css` or a new `motion.css`:

```css
@media (prefers-reduced-motion: reduce) {
  [class^="boxy-"], [class*=" boxy-"] { animation-duration: 0.01ms; transition-duration: 0.01ms; }
}
```

keeping the Spinner's slower turn as the exception (a stopped spinner looks broken).

## 9. Outlines drawn with shadows vanish in forced colors

**Where:** everything outlined through `--boxy-outline` / `box-shadow` (Tile, LabelTile, Tag, outline Button,
ToggleGroup, light Alert), and everything drawn with `background-image` (Checkbox, Radio, Switch, the slider's
line, the Select triangle).

Windows High Contrast (forced colors) removes `box-shadow` and background images. Tiles lose their edge, an
outline button becomes bare text, and checkboxes, radios and the switch become invisible: there is no way to see
whether they are on. Not verified on Windows; this follows from how forced colors works.

**Do:** a `@media (forced-colors: active)` block: give the outlined things a real `border: 1px solid` (or
`outline` with a negative offset, so sizes don't shift), and set checkbox, radio and switch back to
`appearance: auto` there. Long term, draw outlines with `outline` / `border` instead of inset shadows.

## 10. Several texts are below 4.5:1

Computed from the tokens (light theme):

| Text | On | Ratio | Where |
|------|----|-------|-------|
| `--boxy-ghost` `#c8c8c8` | white | 1.67 | the value of a `missing` LabelTile: real information, not decoration |
| `--boxy-muted` placeholder | muted Input `#f2f2f2` | 4.24 | `boxy-input-muted` |
| `--boxy-muted` numbers | hovered row (soft accent) | 4.29 | Dropdown option numbers, numbered lists under the pointer |
| Tile `/04`, `/845` (50% opacity) | accent | 3.77 | `boxy-tile-index-of`, `boxy-tile-out-of`, at 10–12px |

Also `--boxy-font-size-tiny` is 10px, used for information (Alert titles, indexes, slider bounds).

**Do:** `missing` value in `--boxy-muted`, not ghost (the dashed outline already says "missing"). Darken
`--boxy-muted` to `#6b6b6b` (5.3:1 on white, passes on both fills). Replace `opacity: 0.5` with a color mix at
65%. Consider 11px for tiny.

## 11. Dropdown's box can't flip, gets clipped, and misses basics

**Where:** `dropdown.css` (`.boxy-dropdown-popup`: `position: absolute; top: 100%`), `dropdown.tsx`.

- Near the bottom of the window the box opens off-screen; it never opens upward.
- Inside anything with `overflow` (a Modal's frame scrolls, so does a table wrapper) the box is cut off.
- No `disabled` option, no `invalid`, no `disabled` styling test, and with `search={false}` typing a letter does
  not jump to an option, which every native select does.

**Do:** render the box with the Popover API (`popover="manual"`, top layer: nothing clips it) and place it with
CSS anchor positioning plus `position-try-fallbacks: flip-block`, falling back to today's absolute box where
anchors aren't supported. Add `disabled` on options and typeahead for the no-search list.

## 12. Field has no hint or error, and can't wrap a Dropdown

**Where:** `react/field.tsx`, `css/components/field.css`.

`Field` is a `<label>` around the control. That works for Input, Select and Textarea, and nothing else:

- There is nowhere to say what is wrong. `invalid` turns the border red, and red alone is not a message.
- Around a Dropdown the label names the trigger button and hides its value (see 2). Around a ChoiceList it is
  wrong altogether (a fieldset has a legend).

**Do:** add `hint` and `error` props, rendered under the control with ids, and wire them with
`aria-describedby`; `error` also sets `aria-invalid`. To reach the control without cloning it, switch from a
wrapping label to `htmlFor` + a generated id passed through a small context that Input, Select, Textarea,
NumberInput and Dropdown read. Add `boxy-field-hint` and `boxy-field-error` to the CSS.

## 13. Half the components don't pass native props on

**Where:** CLAUDE.md's rule ("a component that wraps one element takes that element's props and passes the rest
on") against the code.

These take a fixed prop list, so an app can't give them `id`, `data-testid`, `aria-*`, `ref` or a handler:
`Tile`, `TileIndex`, `SelectableTiles`, `ProgressRing`, `Spinner`, `ToggleGroup`, `Table`, `Modal`,
`SubmitButton` (which also has no `size` or `className`). `test/passthrough.test.tsx` covers four components that
do it right.

**Do:** add `...props` to each (Omit what the component owns), and turn the passthrough test into a table over
every exported component, so a new one can't forget.

## 14. English strings and arrows are baked in

**Where:**

- `modal.tsx`: `aria-label="Close"`.
- `button.tsx`: the pending Spinner's `title="Pending"`. `progress.tsx`: `title = "Loading"`.
- `tile.tsx`: a clickable Tile appends `" →"` to its label as text, so its name is read as "Projects right arrow".
- `list.css`: `content: "→"` on list links; some screen readers read generated content.

The first user of this kit was a Swedish-learning app; the strings should be props.

**Do:** `closeLabel` on Modal, `pendingLabel` on Button. Wrap the Tile's arrow in `aria-hidden`. In CSS use the
alt-text form, `content: "→" / ""`, which marks it decorative.

## 15. Controls are small for touch

Measured from the tokens: a Button is 38px tall, a small one 22px; a Checkbox, Radio or Switch row is 26px with a
10px marker; a Dropdown option about 30px. `--boxy-touch-target` (44px) exists but only the ToggleGroup and the
Modal's ✕ use it. The kit is desktop-first, and that's a fair choice, but the apps it serves get opened on phones.

**Do:** one media query that leaves desktop alone:

```css
@media (pointer: coarse) {
  .boxy-button, .boxy-choice, .boxy-dropdown-option, .boxy-list-link { min-height: var(--boxy-touch-target); }
}
```

(a small Button can stay small visually and grow its hit area with a pseudo-element).

## 16. No test ever renders the CSS

**Where:** `packages/boxykit/test`, `apps/docs/test`. Everything runs in jsdom, which does no layout and applies
almost no CSS.

The CSS is the product, and it is the one part with no test. A rule that breaks every button's height, or a token
rename that leaves a `var()` undefined, passes CI. So far it has been caught by looking at screenshots by hand.
Three things in this list (1, 7, 10) are the kind a browser test finds.

**Do**, in order of value:

1. Playwright over the built docs (`apps/docs/out`): a screenshot of each example, light and dark, compared to a
   committed baseline. The registry already lists every example, so the test is a loop.
2. In the same run, real axe with `color-contrast` on (jsdom has it off), and a keyboard walk of Dropdown, Modal
   and ToggleGroup.
3. A cheap static check, no browser: every `var(--boxy-*)` used in `src/css` is defined in `tokens.css`.

Also missing in the unit tests: `Field`, `Input` with an icon, `Toast` and `Alert` roles.

## 17. The dark palette is written twice

**Where:** `tokens.css`: once under `[data-boxy-theme="dark"]`, once under
`@media (prefers-color-scheme: dark)`. Seventeen lines, identical, kept in sync by hand.

`light-dark()` would make it one list, but needs Safari 17.5 (see 7 before raising the floor again). Until then:
a test that parses both blocks and fails if they differ.

While there: the three `--boxy-shadow*` tokens are black at 6–16%, which can't be seen on the dark theme's
`#0a0a0a`. The Dropdown's box, Toasts and the Modal rely on their 1px line alone there. Either give the dark theme
its own shadows or accept the line and say so in a comment.

## 18. Toasts have a look but no behavior

**Where:** `react/toast.tsx`. `Toasts` is a fixed corner, `Toast` a styled box. Showing one, timing it out,
stacking several and dismissing them is left to the app; the docs site wrote its own for "Show toast".

Also: a Toast rendered with `role="status"` already in it is often not announced. Live regions are announced when
their *content* changes, so the region has to be on the page first. `Toasts` should be the live region
(`aria-live="polite"`), always rendered, and each Toast a plain child.

**Do:** a small `useToasts()` hook (a list in state, `show(toast, { timeout })`, `dismiss(id)`, pause on hover
and focus) and move the live region to `Toasts`. With actions, focus the first action and return focus on close.

## 19. No right-to-left support

**Where:** physical properties throughout: `margin-left: auto`, `left: 0`, `text-align: left`,
`padding: … var(--boxy-space-12) … var(--boxy-space-4)`, `background-position: right …`, `inset 2px 0 0` on the
table's open row.

Under `dir="rtl"` the arrows, dividers, the Select triangle, the Dropdown's padding and the Input's icon stay on
the left-to-right side. Only worth doing if an RTL project is likely; if so it is mostly mechanical:
`margin-inline-start`, `inset-inline-start`, `text-align: start`, `padding-inline`, and a stylelint rule
(`stylelint-use-logical`) to keep it that way.

## 20. Package and repo housekeeping

Small, independent, each a few minutes:

- **README** (`packages/boxykit/README.md`, the npm page): no list of components, no browser support, no word
  that React 19 is required or that the CSS lives in layers and needs no build step. Add a short table.
- **No `.` export:** `import "boxykit"` fails with `ERR_PACKAGE_PATH_NOT_EXPORTED`, which doesn't say what to
  import instead. Either accept it and document it, or export the React entry at `.` too.
- **No source or declaration maps:** "Go to definition" lands in a `.d.ts`. `declarationMap: true` and shipping
  `src/react` in the package fixes it.
- **`npm install -g npm@latest`** in `release.yml` runs whatever npm published most recently, in the job that
  holds the publish permission. Pin a major: `npm@11`.
- **Actions are pinned by tag** (`actions/checkout@v5`). For the workflow that publishes with provenance, pin by
  commit SHA, and add Dependabot for `github-actions` and `npm` to keep them moving.
- **Size budget:** `boxy.css` is 33.6 kB minified. A test that fails over, say, 40 kB stops it growing unnoticed.
- **Docs site:** no props reference (the JSDoc is good; `react-docgen-typescript` could print it per component),
  no Open Graph image, and the favicon is SVG only (no PNG or apple-touch-icon for Safari and iOS).

---

## Suggested order

1. **This week, small and visible:** 1 (focus ring), 6 (CHANGELOG and version), 3 (Modal name), 8 (reduced
   motion), 10 (contrast), 14 (strings).
2. **Next, the components people touch most:** 2 and 11 (Dropdown), 12 (Field), 4 (ToggleGroup), 5 (Table rows).
3. **Then the safety net:** 16 (browser tests), 13 (passthrough), 17 (palette test), 7 (browser floor).
4. **When a project needs it:** 9, 15, 18, 19, 20.
