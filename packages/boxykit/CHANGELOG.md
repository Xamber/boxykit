# boxykit

## 0.4.0

- Control heights: `--boxy-control` (the touch target, 44px), `--boxy-control-small` (36px) and `--boxy-control-tiny` (28px), `--boxy-space-2` apart. Everything to click or type in takes one of them, so a row of them lines up and no height ends in a fraction: normal fields, Dropdown, ToggleGroup and table rows are 44px (fields were 53px); Button, small fields, Dropdown options and a table's head 36px; tiny fields, tiny Buttons, Tag, Choice and list links 28px. Override `--boxy-control` to rescale them all.
- Button: `size` is `"normal"` (44px), `"small"` (36px, the default) or `"tiny"` (28px), the same words and heights as the fields. Breaking: `boxy-button-small` is gone (the plain `boxy-button` is the small one); what was `size="small"` is `size="tiny"` (`boxy-button-tiny`), now 28px.
- Line heights are lengths now, a whole number of spaces for each text size, so every block of text keeps to the 4px grid: `--boxy-line-height` (28px, was 1.5) and `--boxy-line-height-tight` (24px, was 1.2) for body text, `--boxy-line-height-small` (20px) and `-small-tight` (16px), `-tiny` (16px), `-heading` (32px), `-display` (36px), `-headline` (56px) and `-hero` (84px, was 0.9). Breaking: they are no longer ratios, so text at a size of your own needs a line-height of its own, and an override written as a number must become a length.
- Icons: `--boxy-icon-size` (4/3 of the text size: 16px in small text, 24px in body text; was 1.25em), in a button too.
- LabelRows: a row is as tall as a control (44px, was 52px), its line drawn inside it. Table: the lines no longer add half a pixel to a row. Empty: the dashed line no longer adds to its height.
- Tokens derived from `--boxy-space` instead of set in rem: `--boxy-touch-target`, `--boxy-nav-height` (a control and three spaces), `--boxy-tile-size`, `--boxy-radius`, `--boxy-label-tile-size` (144px, was 136px), and `--boxy-font-size-tiny` follows `--boxy-font-size`. A Toast is 288px wide (was 272px); a List's square is 8px (was 6px).
- Checkbox, Radio, Switch and the NumberInput's slider square are `--boxy-space-3` (12px, was 10px).

## 0.3.1

- Stack: children one under another with a gap from the spacing scale (`gap`: 2, 3, 4, 6, 8). Box: an outlined, rounded panel.
- LabelRows: a `<dl>` of label–value rows, the row form of a LabelTile; `accent` fills the row that sums up.
- Fields: a group of Fields. `layout="columns"` puts two across from sm (`full` on a Field takes both), `"row"` puts them on one line with the controls on one bottom line, `"aside"` puts the labels in a column beside the controls.
- Nav: NavEnd (`boxy-nav-end`) goes after the links, as wide as it needs. The Nav is a flex row now, the links still as wide as each other.
- Board: `fit` makes rows as tall as their content; `side` on a cell puts it in the right column wherever it is in the markup; `sticky` keeps its content in view. Right under a Nav a Board is shorter by `--boxy-nav-height`, so there is no need to set `--boxy-board-height` by hand. `tall` takes two rows of whichever column the cell is in.
- Table: `numeric` on a column (`boxy-table-cell-numeric`) puts it on the right in tabular digits; `foot` is the rows of totals in a `<tfoot>`.
- NumberInput: `unit` shows €, %, kg… at the right end of the field.
- Input, Select and NumberInput: `size="small"` and `"tiny"` (`boxy-input-small`, `boxy-input-tiny`, and the same on `boxy-select` and `boxy-number-input`): the small text in less padding. The React components no longer pass the native `size` attribute on.

## 0.3.0

- Dropdown: a field that opens a rounded box with a search on top and the options under it, split by lines; `numbered` puts 01, 02… before them, `ring` on an option adds a ProgressRing. Select stays the native one.
- Icon: `boxy-icon` sizes any line-icon SVG (Lucide, Tabler…) to its text, in its color, with square line ends; `boxy-icon-large` doubles it. In a button it sits after the label at the line's height. The kit ships no icons; the docs use Lucide. `--boxy-icon-stroke` sets the line.
- `icon` on Tile (where a ring goes), on a TagList's tags, on Dropdown options (shown in the field too) and on Input (inside it on the left). Field: a label over any form control.

## 0.2.0

- Form controls: Textarea, Select (its open list styled where the browser allows), Checkbox, Radio and Switch (rows in the InteractiveList look; the switch a YES ■ | □ NO pair) and ChoiceList to hold them, optionally numbered, and NumberInput (with `min` and `max`, or `from` and `to`, a slider under it: a line with a small accent square to drag; `step` everywhere).
- Alert is dark like a Toast by default, its dot and title in its tone; `look="light"` gives the light one.
- Renamed: StatTile is Tile (StatTiles → Tiles, StatTileLook → TileLook, StatRing → TileRing, `boxy-stat-tile*` → `boxy-tile*`, `boxykit/css/stat-tile` → `boxykit/css/tile`), and LabelSquare is LabelTile (LabelSquares → LabelTiles, `boxy-label-square*` → `boxy-label-tile*`, `boxykit/css/label-square` → `boxykit/css/label-tile`, `--boxy-square-size` → `--boxy-label-tile-size`).

## 0.1.1

### Patch Changes

- Components that wrap one element (List, Tag, Section, Alert, Caption, Board…) pass that element's props on, `ref` too. Modal calls `onClose` once when ✕ or the backdrop closes it, not twice.

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
