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
import { DropdownNumbered } from "./dropdown/numbered";
import { DropdownPlain } from "./dropdown/plain";
import { DropdownSearch } from "./dropdown/search";
import { IconInText } from "./icon/in-text";
import { IconLabelled } from "./icon/labelled";
import { IconSet } from "./icon/set";
import { InputBasic } from "./input/basic";
import { InputInvalid } from "./input/invalid";
import { InputMuted } from "./input/muted";
import { LabelTileBasic } from "./label-tile/basic";
import { LabelTileLong } from "./label-tile/long";
import { LabelTileMissing } from "./label-tile/missing";
import { LabelTileRing } from "./label-tile/ring";
import { LabelTileWide } from "./label-tile/wide";
import { ListBullets } from "./list/bullets";
import { ListInteractive } from "./list/interactive";
import { ListInteractivePlain } from "./list/interactive-plain";
import { ListNumbered } from "./list/numbered";
import { ModalBasic } from "./modal/basic";
import { NavStrip } from "./nav/strip";
import { NumberInputBasic } from "./number-input/basic";
import { NumberInputFromTo } from "./number-input/from-to";
import { NumberInputPlain } from "./number-input/plain";
import { ProgressRingLarge } from "./progress/large";
import { ProgressRingExample } from "./progress/ring";
import { ProgressSpinner } from "./progress/spinner";
import { SectionBasic } from "./section/basic";
import { SelectBasic } from "./select/basic";
import { TileClickable } from "./tile/clickable";
import { TileCorner } from "./tile/corner";
import { TileLabelOnly } from "./tile/label-only";
import { TileLooks } from "./tile/looks";
import { TileOutOf } from "./tile/out-of";
import { TileWithRing } from "./tile/ring";
import { TileSelectable } from "./tile/selectable";
import { TileIndexExample } from "./tile/tile-index";
import { TileValue } from "./tile/value";
import { TileWide } from "./tile/wide";
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
  /** Names its rows: "Button · Looks". */
  title: string;
  /** The CSS files to import alone, after the tokens: boxykit/css/<name>. */
  css: string[];
  examples: Example[];
};

/** A section of the page, one anchor in the side list: a few components that belong together. */
export type SectionDoc = { slug: string; title: string; components: ComponentDoc[] };

export const SECTIONS: SectionDoc[] = [
  {
    slug: "typography",
    title: "Typography",
    components: [
      {
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
        title: "List",
        css: ["list"],
        examples: [
          { file: "list/bullets.tsx", title: "Bullets", about: "A small square in front of each item, in the middle of its height.", Component: ListBullets },
          { file: "list/numbered.tsx", title: "Numbered", about: "NumberedList: 01, 02… from a CSS counter, in the middle of the item.", Component: ListNumbered },
        ],
      },
      {
        title: "Tag",
        css: ["tag", "icon"],
        examples: [
          {
            file: "tag/list.tsx",
            title: "TagList",
            about: "Small rectangles: outlined, or look accent or dark for the ones that matter. title shows on hover; icon goes before the label.",
            Component: TagListExample,
          },
        ],
      },
    ],
  },
  {
    slug: "icons",
    title: "Icons",
    components: [
      {
        title: "Icon",
        css: ["icon"],
        examples: [
          {
            file: "icon/set.tsx",
            title: "A set",
            about: "The kit ships no icons: give any line icon (here Lucide) boxy-icon. large doubles it, for empty states and tiles.",
            Component: IconSet,
          },
          {
            file: "icon/in-text.tsx",
            title: "In text",
            about: "As big as the text around it and in its color; square line ends, to go with the rectangles.",
            Component: IconInText,
          },
          {
            file: "icon/labelled.tsx",
            title: "With a name",
            about: "Hidden from screen readers by default; one that says something the words don't gets role=\"img\" and aria-label.",
            Component: IconLabelled,
          },
        ],
      },
    ],
  },
  {
    slug: "layout",
    title: "Layout",
    components: [
      {
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
        title: "Section",
        css: ["section"],
        examples: [
          { file: "section/basic.tsx", title: "Basic", about: "A SectionHeading and the content under it.", Component: SectionBasic },
        ],
      },
      {
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
    ],
  },
  {
    slug: "navigation",
    title: "Navigation",
    components: [
      {
        title: "Nav",
        css: ["nav"],
        examples: [
          {
            file: "nav/strip.tsx",
            title: "Strip",
            about: "current sets aria-current=\"page\"; the numbers come by themselves. A label too long for its cell ends in ….",
            Component: NavStrip,
          },
        ],
      },
      {
        title: "InteractiveList",
        css: ["list"],
        examples: [
          {
            file: "list/interactive.tsx",
            title: "Numbered",
            about: "Links, the current one in the accent, → on hover. See the right panel for a live one: useCurrentSection follows the page.",
            Component: ListInteractive,
          },
          {
            file: "list/interactive-plain.tsx",
            title: "Not numbered",
            about: "numbered={false}: squares instead of numbers.",
            Component: ListInteractivePlain,
          },
        ],
      },
    ],
  },
  {
    slug: "tiles",
    title: "Tiles",
    components: [
      {
        title: "Tile",
        css: ["tile", "icon", "progress"],
        examples: [
          {
            file: "tile/value.tsx",
            title: "Value",
            about: "Outlined: the place 04/04 at the top, the value and its label at the bottom.",
            Component: TileValue,
          },
          {
            file: "tile/looks.tsx",
            title: "Accent and dark",
            about: "look fills the tile with the accent (the first or the main number) or dark (the others).",
            Component: TileLooks,
          },
          {
            file: "tile/ring.tsx",
            title: "With a ring",
            about: "A ring at the top right shows a share: shareRing(part, whole, of) makes it with its title.",
            Component: TileWithRing,
          },
          {
            file: "tile/wide.tsx",
            title: "Wide",
            about: "wide makes the tile two squares wide and as tall as one: the tile that leads a row.",
            Component: TileWide,
          },
          {
            file: "tile/out-of.tsx",
            title: "Out of",
            about: "outOf adds the whole, small after the value: 3/10.",
            Component: TileOutOf,
          },
          {
            file: "tile/corner.tsx",
            title: "Corner text",
            about: "corner puts a text such as a date where the place goes; icon puts an icon where a ring goes.",
            Component: TileCorner,
          },
          {
            file: "tile/label-only.tsx",
            title: "Label only",
            about: "A tile whose label says it all has no value.",
            Component: TileLabelOnly,
          },
          {
            file: "tile/clickable.tsx",
            title: "Clickable",
            about: "With onClick the whole tile is a button and its label ends in →; disabled fades it.",
            Component: TileClickable,
          },
          {
            file: "tile/selectable.tsx",
            title: "SelectableTiles",
            about: "Tiles that work like radio buttons: the chosen one accent, the others dark. children adds tiles after them.",
            Component: TileSelectable,
          },
          {
            file: "tile/tile-index.tsx",
            title: "TileIndex",
            about: "A place in small mono numbers, 01/04; without of just 01. The tiles draw it themselves.",
            Component: TileIndexExample,
          },
        ],
      },
      {
        title: "LabelTile",
        css: ["label-tile"],
        examples: [
          {
            file: "label-tile/basic.tsx",
            title: "Label over value",
            about: "An outlined square, the label small at the top and the value at the bottom.",
            Component: LabelTileBasic,
          },
          {
            file: "label-tile/long.tsx",
            title: "Long values",
            about: "The square keeps its size: lines break between words, evenly.",
            Component: LabelTileLong,
          },
          {
            file: "label-tile/wide.tsx",
            title: "Wide",
            about: "wide makes it two squares wide and at least as tall as one, for values longer than a word.",
            Component: LabelTileWide,
          },
          {
            file: "label-tile/missing.tsx",
            title: "Missing",
            about: "An empty field or list: a dashed outline and a faded value.",
            Component: LabelTileMissing,
          },
          {
            file: "label-tile/ring.tsx",
            title: "With a ring",
            about: "The label can hold more than text: here a ProgressRing next to it.",
            Component: LabelTileRing,
          },
        ],
      },
    ],
  },
  {
    slug: "buttons",
    title: "Buttons",
    components: [
      {
        title: "Button",
        css: ["button", "icon", "progress"],
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
    ],
  },
  {
    slug: "forms",
    title: "Forms",
    components: [
      {
        title: "Input",
        css: ["input", "field", "icon"],
        examples: [
          { file: "input/basic.tsx", title: "Basic", about: "Outlined, as wide as its container.", Component: InputBasic },
          { file: "input/muted.tsx", title: "Muted, with a label and an icon", about: "No line, a light fill: for filters and search in toolbars. Field puts a label over any control; icon goes inside on the left.", Component: InputMuted },
          { file: "input/invalid.tsx", title: "Invalid", about: "invalid sets aria-invalid, which the CSS marks.", Component: InputInvalid },
        ],
      },
      {
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
        title: "Dropdown",
        css: ["dropdown", "icon", "progress"],
        examples: [
          {
            file: "dropdown/search.tsx",
            title: "Search",
            about:
              "A field that opens a rounded box: a search on top, the options under it split by lines. Arrows move, Enter picks, Esc closes.",
            Component: DropdownSearch,
          },
          {
            file: "dropdown/numbered.tsx",
            title: "Numbered, with rings",
            about:
              "numbered puts 01, 02… before the options, and each keeps its number while searching. ring on an option adds a ProgressRing.",
            Component: DropdownNumbered,
          },
          {
            file: "dropdown/plain.tsx",
            title: "No search",
            about: "search={false} for a short list; icon on an option shows in the box and in the field. name adds a hidden input, so it goes with a form.",
            Component: DropdownPlain,
          },
        ],
      },
      {
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
        title: "NumberInput",
        css: ["number-input"],
        examples: [
          {
            file: "number-input/basic.tsx",
            title: "Min and max",
            about: "A slider under the field: drag the small square along the line, min and max at its ends. Type, or step with the arrow keys; it stays inside.",
            Component: NumberInputBasic,
          },
          {
            file: "number-input/from-to.tsx",
            title: "From and to",
            about: "from and to only set the line's ends: the slider runs over them, nothing shows at the ends, and a typed number can go past.",
            Component: NumberInputFromTo,
          },
          {
            file: "number-input/plain.tsx",
            title: "Just the field",
            about: "No range, no slider. step holds everywhere: typing snaps to it when you leave the field, and the arrow keys move by it.",
            Component: NumberInputPlain,
          },
        ],
      },
      {
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
    ],
  },
  {
    slug: "progress",
    title: "Progress",
    components: [
      {
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
    ],
  },
  {
    slug: "messages",
    title: "Messages",
    components: [
      {
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
    ],
  },
];

export const COMPONENTS: ComponentDoc[] = SECTIONS.flatMap((section) => section.components);
