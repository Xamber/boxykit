Layout

1. A stack primitive. About half of the app CSS is the same thing: a flex column with a token gap (.side-panel, .calc-block, .form-group, .labeled-input, .auth-panel, .side-actions). One
   Stack with a gap prop would remove most of it.
2. A "tool" mode for Board. Every page needs rows as tall as their content, a main cell and a side cell, a sticky side panel, and the side cell allowed to come first in the markup. That
   is all of .tool-board today.
3. Board that knows about Nav. I had to set --boxy-board-height: calc(100dvh - var(--boxy-nav-height)) by hand in .app-shell.
4. A trailing slot in Nav. The logout button needed its own .app-bar grid wrapped around the nav.

Forms

5. A field grid. Two columns, a full-width span, stacked fields in one column, and collapse to one column on narrow screens (.field-grid, .field-full, .field-stack, .field-tall).
6. Field with the label below the control. The tax inputs use a Mono label under the input, which Field can't do, so they lose the label association and rely on aria-label.
7. A unit suffix on NumberInput. The units currently live in the labels ("Gross salary, €/year", "VAT %").

Data display

8. Numeric columns and row looks in Table. Right-aligned, tabular, non-wrapping number cells, plus muted and total rows (.calc-table, is-muted, is-total).
9. Columns and ratio on Tiles. "Three across, half as tall as wide" and a wide tile that fills the row are both overrides of kit classes (.number-tiles, .side-panel .boxy-tile-wide).
10. A label–value list. The dl rows with a mono label on the left and a value on the right appear three times on the invoice, with an accent row for the total. LabelTile covers the tile
    form, not the row form.
11. An outlined box. The From / Bill to cards and the two bottom boxes are the same radius-plus-outline panel, written by hand.

Smaller

12. A code block. The register page prints the credential JSON in a hand-made .code-block.
13. Print support. A print-hidden helper, print-color-adjust: exact so the yellow prints, and a size step below --boxy-font-size-small for paper (I added three private --paper-* sizes).