import type { ComponentType } from "react";
import { AlertEmpty } from "./alert/empty";
import { AlertLight } from "./alert/light";
import { AlertTones } from "./alert/tones";
import { BoardHalves } from "./board/halves";
import { BoardMainSide } from "./board/main-side";
import { BoardQuarters } from "./board/quarters";
import { BoardTall } from "./board/tall";
import { ButtonDisabled } from "./button/disabled";
import { ButtonExpand } from "./button/expand";
import { ButtonLink } from "./button/link";
import { ButtonLinksSmall } from "./button/links-small";
import { ButtonLooks } from "./button/looks";
import { ButtonPending } from "./button/pending";
import { ButtonSmall } from "./button/small";
import { ChoiceCheckbox } from "./choice/checkbox";
import { ChoiceRadio } from "./choice/radio";
import { ChoiceSwitch } from "./choice/switch";
import { InputBasic } from "./input/basic";
import { InputInvalid } from "./input/invalid";
import { InputMuted } from "./input/muted";
import { LabelSquareBasic } from "./label-square/basic";
import { LabelSquareLong } from "./label-square/long";
import { LabelSquareMissing } from "./label-square/missing";
import { LabelSquareRing } from "./label-square/ring";
import { LabelSquareWide } from "./label-square/wide";
import { ListBullets } from "./list/bullets";
import { ListInteractive } from "./list/interactive";
import { ListInteractivePlain } from "./list/interactive-plain";
import { ListNumbered } from "./list/numbered";
import { ModalBasic } from "./modal/basic";
import { NavStrip } from "./nav/strip";
import { NumberInputBasic } from "./number-input/basic";
import { NumberInputDecimal } from "./number-input/decimal";
import { ProgressRingLarge } from "./progress/large";
import { ProgressRingExample } from "./progress/ring";
import { ProgressSpinner } from "./progress/spinner";
import { SectionBasic } from "./section/basic";
import { SelectBasic } from "./select/basic";
import { StatTileClickable } from "./stat-tile/clickable";
import { StatTileCorner } from "./stat-tile/corner";
import { StatTileLabelOnly } from "./stat-tile/label-only";
import { StatTileLooks } from "./stat-tile/looks";
import { StatTileOutOf } from "./stat-tile/out-of";
import { StatTileRing } from "./stat-tile/ring";
import { StatTileSelectable } from "./stat-tile/selectable";
import { StatTileIndex } from "./stat-tile/tile-index";
import { StatTileValue } from "./stat-tile/value";
import { StatTileWide } from "./stat-tile/wide";
import { TableBasic } from "./table/basic";
import { TableExpandable } from "./table/expandable";
import { TagListExample } from "./tag/list";
import { TextCaption } from "./text/caption";
import { TextHeadline } from "./text/headline";
import { TextHero } from "./text/hero";
import { TextareaBasic } from "./textarea/basic";
import { ToastActions } from "./toast/actions";
import { ToastBasic } from "./toast/basic";
import { ToastCount } from "./toast/count";
import { ToggleGroupBasic } from "./toggle-group/basic";

/** One example: `file` is its path under examples/, read for the code panel. */
export type Example = {
  file: string;
  title: string;
  about: string;
  Component: ComponentType;
  /** A toast: Show toast pops the example in the corner; "wait" stays until one of its buttons is pressed. */
  toast?: "notice" | "wait";
};

export type ComponentDoc = {
  slug: string;
  title: string;
  /** The CSS files to import alone, after the tokens: boxykit/css/<name>. */
  css: string[];
  examples: Example[];
};

export const COMPONENTS: ComponentDoc[] = [
  {
    slug: "text",
    title: "Text",
    css: ["text"],
    examples: [
      {
        file: "text/headline.tsx",
        title: "Headline",
        about: "Big capitals, set tight. ghost adds words set back in grey.",
        Component: TextHeadline,
      },
      {
        file: "text/hero.tsx",
        title: "Hero number",
        about: "The biggest size in the regular weight, its unit at the heading size: the one number a screen is about.",
        Component: TextHero,
      },
      {
        file: "text/caption.tsx",
        title: "Caption and mono",
        about: "Small grey capitals spaced wide, for what a block is; mono for IDs, dates and counts.",
        Component: TextCaption,
      },
    ],
  },
  {
    slug: "board",
    title: "Board",
    css: ["board"],
    examples: [
      {
        file: "board/main-side.tsx",
        title: "Main and side",
        about: "Four cells, the left column twice as wide: the content on the left, its status and actions on the right.",
        Component: BoardMainSide,
      },
      {
        file: "board/quarters.tsx",
        title: "Quarters",
        about: "even makes the columns as wide as each other: four cells are four quarters.",
        Component: BoardQuarters,
      },
      {
        file: "board/halves.tsx",
        title: "Halves",
        about: "Two cells in an even board: the screen split in two.",
        Component: BoardHalves,
      },
      {
        file: "board/tall.tsx",
        title: "A tall cell",
        about: "tall takes the whole left column; end puts a cell's content on the line below it.",
        Component: BoardTall,
      },
    ],
  },
  {
    slug: "nav",
    title: "Nav",
    css: ["nav"],
    examples: [
      {
        file: "nav/strip.tsx",
        title: "Strip",
        about: "current sets aria-current=\"page\". A long label ends in …; the number comes by itself.",
        Component: NavStrip,
      },
    ],
  },
  {
    slug: "stat-tile",
    title: "StatTile",
    css: ["stat-tile", "progress"],
    examples: [
      {
        file: "stat-tile/value.tsx",
        title: "Value",
        about: "Outlined: the place 04/04 at the top, the value and its label at the bottom.",
        Component: StatTileValue,
      },
      {
        file: "stat-tile/looks.tsx",
        title: "Accent and dark",
        about: "look fills the tile with the accent (the first or the main number) or dark (the others).",
        Component: StatTileLooks,
      },
      {
        file: "stat-tile/ring.tsx",
        title: "With a ring",
        about: "A ring at the top right shows a share: shareRing(part, whole, of) makes it with its title.",
        Component: StatTileRing,
      },
      {
        file: "stat-tile/wide.tsx",
        title: "Wide",
        about: "wide makes the tile two squares wide and as tall as one: the tile that leads a row.",
        Component: StatTileWide,
      },
      {
        file: "stat-tile/out-of.tsx",
        title: "Out of",
        about: "outOf adds the whole, small after the value: 3/10.",
        Component: StatTileOutOf,
      },
      {
        file: "stat-tile/corner.tsx",
        title: "Corner text",
        about: "corner puts a text such as a date where the place goes.",
        Component: StatTileCorner,
      },
      {
        file: "stat-tile/label-only.tsx",
        title: "Label only",
        about: "A tile whose label says it all has no value.",
        Component: StatTileLabelOnly,
      },
      {
        file: "stat-tile/clickable.tsx",
        title: "Clickable",
        about: "With onClick the whole tile is a button and its label ends in →; disabled fades it.",
        Component: StatTileClickable,
      },
      {
        file: "stat-tile/selectable.tsx",
        title: "SelectableTiles",
        about: "Tiles that work like radio buttons: the chosen one accent, the others dark. children adds tiles after them.",
        Component: StatTileSelectable,
      },
      {
        file: "stat-tile/tile-index.tsx",
        title: "TileIndex",
        about: "A place in small mono numbers, 01/04; without of just 01. The tiles draw it themselves.",
        Component: StatTileIndex,
      },
    ],
  },
  {
    slug: "label-square",
    title: "LabelSquare",
    css: ["label-square"],
    examples: [
      {
        file: "label-square/basic.tsx",
        title: "Label over value",
        about: "An outlined square, the label small at the top and the value at the bottom.",
        Component: LabelSquareBasic,
      },
      {
        file: "label-square/long.tsx",
        title: "Long values",
        about: "The square keeps its size: lines break between words, evenly.",
        Component: LabelSquareLong,
      },
      {
        file: "label-square/wide.tsx",
        title: "Wide",
        about: "wide makes it two squares wide and at least as tall as one, for values longer than a word.",
        Component: LabelSquareWide,
      },
      {
        file: "label-square/missing.tsx",
        title: "Missing",
        about: "An empty field or list: a dashed outline and a faded value.",
        Component: LabelSquareMissing,
      },
      {
        file: "label-square/ring.tsx",
        title: "With a ring",
        about: "The label can hold more than text: here a ProgressRing next to it.",
        Component: LabelSquareRing,
      },
    ],
  },
  {
    slug: "button",
    title: "Button",
    css: ["button", "progress"],
    examples: [
      {
        file: "button/looks.tsx",
        title: "Looks",
        about: "Accent is the default; dark goes on the accent; outline takes the text color, so it works on any background.",
        Component: ButtonLooks,
      },
      {
        file: "button/small.tsx",
        title: "Small",
        about: "In table rows and next to lists; any look.",
        Component: ButtonSmall,
      },
      {
        file: "button/expand.tsx",
        title: "Expand and collapse",
        about: "An outline button that shows and hides a block, with aria-expanded.",
        Component: ButtonExpand,
      },
      {
        file: "button/pending.tsx",
        title: "Pending",
        about: "While what it started is under way: disabled but not faded, a Spinner after the label. SubmitButton swaps its label too.",
        Component: ButtonPending,
      },
      {
        file: "button/disabled.tsx",
        title: "Disabled",
        about: "Faded and without the press effect, in every look.",
        Component: ButtonDisabled,
      },
      {
        file: "button/link.tsx",
        title: "A link as a button",
        about: "buttonClass() gives any link the button look, so any router works.",
        Component: ButtonLink,
      },
      {
        file: "button/links-small.tsx",
        title: "Small links in a row",
        about: "An accent link with an outlined one next to it, under a list.",
        Component: ButtonLinksSmall,
      },
    ],
  },
  {
    slug: "input",
    title: "Input",
    css: ["input"],
    examples: [
      { file: "input/basic.tsx", title: "Basic", about: "Outlined, as wide as its container.", Component: InputBasic },
      { file: "input/muted.tsx", title: "Muted", about: "No line, a light fill: for filters and search in toolbars.", Component: InputMuted },
      { file: "input/invalid.tsx", title: "Invalid", about: "invalid sets aria-invalid, which the CSS marks.", Component: InputInvalid },
    ],
  },
  {
    slug: "textarea",
    title: "Textarea",
    css: ["textarea"],
    examples: [
      {
        file: "textarea/basic.tsx",
        title: "Basic",
        about: "The Input's look over several lines; it grows taller by hand. invalid works as on Input.",
        Component: TextareaBasic,
      },
    ],
  },
  {
    slug: "select",
    title: "Select",
    css: ["select"],
    examples: [
      {
        file: "select/basic.tsx",
        title: "Basic",
        about: "The native select in the Input's look. Where the browser allows (Chrome), the open list is styled too.",
        Component: SelectBasic,
      },
    ],
  },
  {
    slug: "choice",
    title: "Checkbox, Radio and Switch",
    css: ["choice"],
    examples: [
      {
        file: "choice/checkbox.tsx",
        title: "Checkbox",
        about: "Rows like an InteractiveList, in a ChoiceList: the square fills when on; indeterminate half-fills it.",
        Component: ChoiceCheckbox,
      },
      {
        file: "choice/radio.tsx",
        title: "Radio · Numbered",
        about: "One name for one question; the circle fills. numbered puts 01, 02… in front.",
        Component: ChoiceRadio,
      },
      {
        file: "choice/switch.tsx",
        title: "Switch",
        about: "On or off at once, no Save: YES ■ | □ NO at the end of the row, the side it is on in the accent.",
        Component: ChoiceSwitch,
      },
    ],
  },
  {
    slug: "number-input",
    title: "NumberInput",
    css: ["number-input"],
    examples: [
      {
        file: "number-input/basic.tsx",
        title: "Basic",
        about: "− and + step it; drag the number sideways to run it from min to max. Click it to type; arrow keys step.",
        Component: NumberInputBasic,
      },
      {
        file: "number-input/decimal.tsx",
        title: "Steps · Filled",
        about: "step can be a fraction: it snaps to the steps from min. filled shades how far it is from min to max as you drag.",
        Component: NumberInputDecimal,
      },
    ],
  },
  {
    slug: "toggle-group",
    title: "ToggleGroup",
    css: ["toggle-group"],
    examples: [
      {
        file: "toggle-group/basic.tsx",
        title: "One of a few",
        about: "The chosen cell is the accent.",
        Component: ToggleGroupBasic,
      },
    ],
  },
  {
    slug: "progress",
    title: "ProgressRing and Spinner",
    css: ["progress"],
    examples: [
      {
        file: "progress/ring.tsx",
        title: "ProgressRing",
        about: "Filled clockwise to a 0–1 value; title says what it means.",
        Component: ProgressRingExample,
      },
      {
        file: "progress/large.tsx",
        title: "Large",
        about: "size=\"large\" for a ring that stands alone, e.g. in a table cell.",
        Component: ProgressRingLarge,
      },
      {
        file: "progress/spinner.tsx",
        title: "Spinner",
        about: "The ring with a quarter running round it: something is under way.",
        Component: ProgressSpinner,
      },
    ],
  },
  {
    slug: "section",
    title: "Section",
    css: ["section"],
    examples: [
      { file: "section/basic.tsx", title: "Basic", about: "A SectionHeading and the content under it.", Component: SectionBasic },
    ],
  },
  {
    slug: "table",
    title: "Table",
    css: ["table"],
    examples: [
      { file: "table/basic.tsx", title: "Plain", about: "Columns with a header each.", Component: TableBasic },
      {
        file: "table/expandable.tsx",
        title: "Clickable rows",
        about: "onRowClick makes rows clickable (Enter and Space too); expanded draws a full-width row under an open one.",
        Component: TableExpandable,
      },
    ],
  },
  {
    slug: "list",
    title: "List",
    css: ["list"],
    examples: [
      { file: "list/bullets.tsx", title: "List", about: "A small square in front of each item, in the middle of its height.", Component: ListBullets },
      { file: "list/numbered.tsx", title: "NumberedList", about: "01, 02… from a CSS counter, in the middle of the item.", Component: ListNumbered },
      {
        file: "list/interactive.tsx",
        title: "InteractiveList",
        about: "Links, the current one in the accent, → on hover. See the right panel for a live one: useCurrentSection follows the page.",
        Component: ListInteractive,
      },
      {
        file: "list/interactive-plain.tsx",
        title: "InteractiveList, not numbered",
        about: "numbered={false}: squares instead of numbers.",
        Component: ListInteractivePlain,
      },
    ],
  },
  {
    slug: "tag",
    title: "Tag",
    css: ["tag"],
    examples: [
      {
        file: "tag/list.tsx",
        title: "TagList",
        about: "Small rectangles: outlined, or look accent or dark for the ones that matter. title shows on hover.",
        Component: TagListExample,
      },
    ],
  },
  {
    slug: "alert",
    title: "Alert and Empty",
    css: ["alert"],
    examples: [
      {
        file: "alert/tones.tsx",
        title: "Tones",
        about: "Dark like a Toast: a dot in the tone top right, an optional title in the tone on top. Danger and warning are announced right away (role=\"alert\"), the others politely.",
        Component: AlertTones,
      },
      {
        file: "alert/light.tsx",
        title: "Light",
        about: "look=\"light\": the page's colors, outlined.",
        Component: AlertLight,
      },
      { file: "alert/empty.tsx", title: "Empty", about: "A dashed box, grey and centered, instead of an empty list or table.", Component: AlertEmpty },
    ],
  },
  {
    slug: "toast",
    title: "Toast",
    css: ["toast"],
    examples: [
      { file: "toast/basic.tsx", title: "Notice", about: "The title small at the top, then the content. Show toast puts it in the corner for 3 seconds.", Component: ToastBasic, toast: "notice" },
      { file: "toast/count.tsx", title: "With a count", about: "count goes at the right of the title.", Component: ToastCount, toast: "notice" },
      {
        file: "toast/actions.tsx",
        title: "With actions",
        about: "A toast that waits for an answer (role=\"alertdialog\"): it goes only when a button hides it.",
        Component: ToastActions,
        toast: "wait",
      },
    ],
  },
  {
    slug: "modal",
    title: "Modal",
    css: ["modal", "button"],
    examples: [
      {
        file: "modal/basic.tsx",
        title: "Over the page",
        about: "The title small at the top, the content, the actions at the bottom. Esc, ✕ and a click on the dim close it.",
        Component: ModalBasic,
      },
    ],
  },
];
