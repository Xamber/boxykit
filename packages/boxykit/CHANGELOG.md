# boxykit

## 0.1.0

The first release: plain CSS that is the kit, and an optional React layer (`boxykit/react`) that writes the
same classes and attributes.

### Foundations

- Tokens (`boxykit/css/tokens`): colors with a dark theme (by the system, or `data-boxy-theme="light|dark"`),
  the accent, the inverted band, four tones, a type scale, spacing steps, radii, durations and layout sizes.
- A reset (`boxykit/css/reset`).
- Every component in its own file (`boxykit/css/<name>`) inside `@layer boxy.components`, so the app's own
  styles win without `!important`; `boxykit/css` imports them all.

### Components

- **Text**: `Headline` (with a grey `ghost` part), `HeroNumber`, `Caption`, `Mono`.
- **Board**: the full-screen layout of cells split by lines: main and side, halves, quarters, a tall cell.
- **Nav**: an inverted strip of links numbered 01, 02…, the current page in the accent.
- **StatTiles**: square tiles with a place, a ring, a value and its label; accent, dark and wide looks;
  `SelectableTiles` for picking one; `TileIndex` and `shareRing`.
- **LabelSquares**: outlined squares, a label on top and its value below; wide and missing.
- **List**, **NumberedList** and **InteractiveList**: small squares or 01, 02… in the middle of each item;
  a list of links with the current one in the accent and → on hover. `useCurrentSection` follows the page
  for a table of contents.
- **Button**: accent, dark and outline looks, small, pending (a Spinner after the label); `buttonClass()` for links.
- **Input**, with muted and invalid states.
- **ToggleGroup**, **ProgressRing**, **Spinner**, **Section**.
- **Table**, with clickable rows and a row that opens under one.
- **Tag** and **TagList**: small rectangles, outlined or in the accent or dark.
- **Alert**: a tile with a dot and an optional title in its tone (info, success, warning, danger).
  **Empty**: a dashed box for an empty list.
- **Toast** and **Toasts**: notices in the corner, with a count and actions.
- **Modal**, on the native `<dialog>`.
