# Style suggestions

A look at how boxykit looks, on 2026-11-12 at commit `9295ba8`: the docs page in headless Chrome at 1600×1000,
both themes, next to the CSS that draws it. Bugs and accessibility are in
[next-things-to-improve.md](next-things-to-improve.md); this file is taste.

These are opinions. None of them has been built or mocked up; each says what to change so it can be tried in a few
minutes and thrown away if it looks worse. Sizes below are computed from the tokens (`--boxy-font-size` 18px,
scale 1.5, `--boxy-space` 4px).

## The short version

The kit has two voices. One is confident and its own: Tiles, the Nav strip, the InteractiveList, headlines with
ghost words, the tiny mono `01/04`. The other is a careful default: Input, Select, Textarea, Table, the Dropdown's
field. The first voice is why the kit looks good; the "something is off" feeling is the second voice sitting next
to it. Most of what follows is moving the forms and the table into the first voice, and removing a few places
where two rules contradict each other.

## What already works, and why

Worth writing down, so changes don't lose it:

- **Tiles.** A fixed square, a 12px radius, three fills (yellow, black, outline), and inside it a strict layout:
  tiny mono index top left, a ring top right, a big tight number and a small label at the bottom. Everything has
  one place. The contrast between the 10px mono index and the 27px number does most of the work.
- **The Nav strip and the InteractiveList.** Full-width bands, sharp corners, numbered by CSS, the current one a
  solid yellow bar. They read as structure, not as widgets.
- **Headline + ghost.** `SHIP THIS WEEK` in tight capitals with the second half in grey is the kit's signature.
- **The number system.** `01`, `02/04`, `TSK-0784`: small grey mono for anything that counts or identifies.
- **The Switch.** `YES ■ | □ NO` is odd in a good way, and it is built from the same squares as the checkboxes.
- **Three colors.** Black, white, yellow, and greys mixed from them. Tones (info, success…) appear only as a dot
  and a word.

The pattern in all of these: **a strict grid position for every part, small mono next to big tight type, and
yellow used as a solid block.**

## What is off

### 1. Two shape rules that contradict each other

Rounded (12px or 6px): Tile, LabelTile, Tag, Alert, Toast, Modal, the Dropdown's box.
Sharp (0): Button, Input, Select, Textarea, NumberInput, ToggleGroup, Checkbox, the Dropdown's field.

So the Dropdown is a sharp field that opens a rounded box. A Board cell holds rounded LabelTiles above a sharp
yellow button. A Toast is rounded and its action buttons are sharp. The eye reads it as two kits.

There is a rule hiding in what works: **bands are sharp, objects are rounded.** A band runs the full width of its
container and sits on the page's lines (Nav, list rows, table rows, ToggleGroup, a full-width button in a Board
cell). An object floats on the page with space around it (Tile, Tag, Alert, Toast, Modal).

Buttons and fields are objects most of the time, and they are the ones that break the rule.

**Try:** `--boxy-radius-button: var(--boxy-radius-small);` (6px, the Tag's radius). One token; buttons, inputs,
selects, textareas and the Dropdown's field change together. Keep ToggleGroup, Nav and list rows at 0: they are
bands. If it looks too soft, the other consistent answer is the opposite: make the Dropdown's box, Tag and Toast
sharp, and keep 12px for Tile, LabelTile, Alert and Modal only. Either is better than the mix.

### 2. The fields have no character

An Input is a 53px-tall box with a 1px `#e0e0e0` line (1.32:1 against white, close to invisible) and 18px text.
Next to it a Button is 38px tall with 12px capitals. Three things follow:

- An input and a button in one row don't line up: 53px against 38px.
- The field is the biggest, palest thing in a form, where the Tile is the smallest, sharpest thing on a dashboard.
- Fields use the grey line, while the other things you can click (outline Button, ToggleGroup, Checkbox) use a
  black line. Grey means "divider" everywhere else in the kit.

**Try, in order of boldness:**

1. **A rule for lines:** black 1px (`--boxy-outline-strong`) for anything you can act on, grey for containers and
   dividers. Inputs, Select, Textarea, NumberInput and the Dropdown's field get the black line. This alone makes
   forms look like they belong.
2. **One control height.** A token, `--boxy-control-height: 2.5rem` (40px), for Button, Input, Select,
   Dropdown and ToggleGroup, and `1.75rem` for small. Today the heights are 38, 53, 53, 53 and 44.
3. **The field as a LabelTile.** The kit already has the shape: a small muted label at the top, the value under
   it, in one outlined box. Make `Field` draw that: the label *inside* the box, top left, small and grey, the
   input below it with no border of its own, and the whole box takes the focus ring. It is the form control only
   this kit would have, and it reuses the layout people already like in the tiles. The new "Search tasks" label
   floating above its field is the generic version of this.

### 3. The type scale has a hole where the interface lives

One ratio (1.5) gives 12, 18, 27, 40.5, 61 and 91px. It is lovely for display. For interface text it leaves two
sizes: 12px (buttons, tables, tags, choices, list links, captions, option rows, alerts, toasts) and 18px (inputs,
body). Nothing at 14–15px, which is where most desktop UI text sits.

The result: almost every component is set in 12px capitals, which is small to read in bulk (a table of 12px text;
a paragraph inside an Alert), and fields at 18px feel a size too big beside them.

**Try:** keep the display sizes on the 1.5 scale, and add one step for reading:
`--boxy-font-size-text: 0.875rem` (14px) for table cells, Alert and Toast bodies, Dropdown options, and field
values. Keep 12px for what is a *label*: capitals, captions, buttons, tags. That gives a clear split: capitals at
12, sentences at 14, body at 18.

### 4. Yellow means too many things

Solid yellow is: the main action, the current page, the chosen option, a switch that is on, a toggle that is on,
the slider's handle, a P1 tag, an accent tile. Soft yellow is: whatever is under the pointer (list links, table
rows, choices, dropdown options, toggle cells, select options). And the focus ring is yellow too.

In a Dropdown or an InteractiveList this stacks: the chosen row is yellow, the row under the pointer is pale
yellow, the focused field has a yellow ring. Three states, one hue, told apart by tint.

**Try:** yellow only for **chosen, current and primary**. Hover becomes neutral, which the outline Button already
does: `color-mix(in srgb, currentcolor 6%, transparent)`. Add `--boxy-hover` for it and use it wherever
`--boxy-accent-soft` is a hover today. Yellow then appears less often and means more when it does. (The focus
ring becomes black and yellow, see item 1 of the other file.)

### 5. Dark mode: the white tile shouts over the yellow one

The band colors invert in the dark theme: black becomes white. For a Button that's right. For Tiles it means a row
of "accent, dark, outline" turns into yellow, **solid white**, outline on a near-black page. The white square is
the brightest thing on the screen and beats the accent it is meant to support. Alerts and Toasts become white
slabs the same way.

**Try:** in the dark theme, set the band to a raised grey instead of white:
`--boxy-band-bg: #1f1f1f; --boxy-band-fg: #fff; --boxy-band-line: #333; --boxy-band-hover: #2b2b2b;` and give the
dark Button its own token (`--boxy-button-dark-bg`) so it can stay white. Yellow is then the only loud color in
dark mode, as it is in light.

Smaller: the dark page is `#0a0a0a` with `#2a2a2a` lines (1.38:1). The grid of lines that structures the page in
light almost disappears. `#333` reads better.

### 6. The details come from three different sets

- **Arrows:** a text `→` in list links and clickable tiles, a text `✕` in the Modal, and now Lucide's arrows in
  buttons. They differ in weight and height.
- **The Select's triangle** is two 4px gradients. At real size it is a dot (see the Dropdown fields: it reads as a
  speck, not a control).
- **Circles:** the Alert's dot, the Radio and the rings are round; list bullets, checkboxes, the switch and the
  slider handle are square.

**Try:**

- Draw the kit's own glyphs (arrow, chevron, close) as one family with the icon stroke and square ends, as CSS
  masks from inline SVG. No icon dependency, and they match Lucide at `--boxy-icon-stroke`.
- Replace the triangle with that chevron at 12px.
- Make the Alert's dot a **square**, the same one as the list bullet. It ties the messages to the lists, and it
  is the kind of detail people notice without knowing why. Leave Radio round (round means "one of") and the rings
  round.

### 7. The Table is the plainest thing in the kit

12px text, grey header words, hairlines, a pale yellow hover. It has none of the kit's vocabulary, and tables are
where an app like a task tracker spends most of its screen.

**Try:** header cells as Captions (grey capitals, spaced wide, which the kit already has). A `numbered` prop that
puts `01`, `02` in the first column in tiny mono, like the lists. Numeric columns in mono with tabular figures,
right-aligned. The first text column in the medium weight. The open row marked by a solid yellow bar on the left
is already there and good; make the selected row a full yellow band, like the current list link.

### 8. Soft shadows in a hard-edged kit

The Dropdown's box, Toasts and the Modal sit on blurred shadows (`0 8px 24px` at 8%). They are the only soft,
photographic thing in a kit made of flat fills and 1px lines, and in dark mode they can't be seen at all.

**Try:** no shadow, and a black 1px line (`--boxy-outline-strong`) on anything that floats. It is flatter, it
works the same in both themes, and it follows the "black line = you can act on it" rule from item 2. A hard
offset shadow (`4px 4px 0 var(--boxy-fg)`) is the other option and suits the name, but it is a strong fashion
statement that the rest of the kit doesn't make.

### 9. The type depends on the machine

`--boxy-font-sans` is `ui-sans-serif, system-ui`. On a Mac that is San Francisco, and the tight capitals look as
designed. On Windows it is Segoe UI and on Android Roboto: wider, with different numerals, and
`letter-spacing: -0.06em` on them looks cramped, not tight. The identity of this kit is mostly its type, and the
type is left to the operating system.

**Try:** a separate `--boxy-font-display` token (defaulting to the sans) used by Headline, HeroNumber,
SectionHeading and tile values, so an app can set one tight grotesk for the big type without touching body text.
In the docs, set it to a chosen face (Inter Tight, Geist, or similar under an open license) and say in the README
that the kit is drawn with it. The package still ships no font.

### 10. Smaller things

- **Rings at 16px** in a tile's corner look thin and a little fuzzy; the track at 15% is nearly invisible on
  yellow. A heavier stroke (3 of 18) and a 25% track read better at that size. A bolder idea in the kit's own
  language: a small **square** that fills from the bottom, like the indeterminate checkbox already does.
- **Checkbox and radio markers are 10px** next to 12px capitals. 12px markers match the cap height.
- **NumberInput centers its text**; every other field is left-aligned. Either is fine, both is noise.
- **Headlines at weight 500.** With tracking this tight, big capitals can take 600–700; at 500 the grey ghost
  words look almost as heavy as the black ones. Try `--boxy-font-weight-display: 600` on Headline only.
- **The Empty box** (dashed, 12px radius, grey text) is the one dashed thing besides a missing LabelTile. Fine,
  but it would be stronger with a Caption-style line ("NO TASKS YET") than with 18px grey body text.
- **Tags:** the outlined ones use the grey line and nearly vanish beside the yellow and black ones. Black line,
  per item 2.

## If only five things

In the order I'd try them, each small enough to judge in the docs in a few minutes:

1. **Black lines on everything you can act on** (item 2.1): inputs, select, textarea, dropdown, tags.
2. **Neutral hover, yellow only for chosen** (item 4): one new token.
3. **One radius decision** (item 1): `--boxy-radius-button: var(--boxy-radius-small)`, or sharpen the Dropdown's
   box and Toast. Pick after seeing both.
4. **One control height and a 14px text size** (items 2.2 and 3).
5. **Dark theme band in grey, not white** (item 5).

Then, as the piece that would give the forms the tiles' character: **Field drawn as a LabelTile** (item 2.3).

## What I would not change

The palette, the Tile, the Nav strip, the InteractiveList, the Headline with ghost words, the Switch, the mono
numbering, the press effect (`scale(0.97)`), and the restraint: no gradients, no tints, no icons shipped, tones
only as a dot and a word. The suggestions above are about making the rest of the kit obey the same few rules those
parts already follow.
