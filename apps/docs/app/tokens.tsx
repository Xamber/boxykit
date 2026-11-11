// The theme's values, a row each like the examples: a swatch per color, a line per size and space.
import { ExampleRow, Group } from "./rows";

/** A token and what it is for. */
type Token = { name: string; about: string };

const COLOR_GROUPS: { title: string; about: string; code: string; tokens: Token[] }[] = [
  {
    title: "Page",
    about: "Black on white; the greys for what steps back.",
    code: `color: var(--boxy-muted);
border-bottom: var(--boxy-border);`,
    tokens: [
      { name: "bg", about: "The page" },
      { name: "fg", about: "The text" },
      { name: "muted", about: "Labels, captions, empty messages" },
      { name: "ghost", about: "Faded headline words" },
      { name: "line", about: "The lines that divide the page" },
    ],
  },
  {
    title: "Accent",
    about: "The yellow: the main action, the current page, what is chosen. Text on it is --boxy-on-accent.",
    code: `background: var(--boxy-accent);
color: var(--boxy-on-accent);`,
    tokens: [
      { name: "accent", about: "The yellow" },
      { name: "accent-strong", about: "An accent button under the pointer" },
      { name: "accent-soft", about: "Selection, what is under the pointer" },
      { name: "on-accent", about: "Text on the yellow" },
    ],
  },
  {
    title: "Band",
    about: "The inverted bands: the nav, dark tiles and buttons, toasts.",
    code: `background: var(--boxy-band-bg);
color: var(--boxy-band-fg);`,
    tokens: [
      { name: "band-bg", about: "The band" },
      { name: "band-fg", about: "Text on it" },
      { name: "band-muted", about: "The nav numbers, toast titles" },
      { name: "band-line", about: "Lines on the band" },
      { name: "band-hover", about: "A band link under the pointer" },
    ],
  },
  {
    title: "Status",
    about: "The tones of alerts; each -soft one is its background.",
    code: `color: var(--boxy-danger);
background: var(--boxy-danger-soft);`,
    tokens: [
      { name: "info", about: "Information" },
      { name: "success", about: "Right, saved" },
      { name: "warning", about: "Close, careful" },
      { name: "danger", about: "Wrong, errors" },
      { name: "danger-soft", about: "Behind an error" },
    ],
  },
];

const SIZES: Token[] = [
  { name: "font-size-tiny", about: "Tile numbers 01/04" },
  { name: "font-size-small", about: "Labels, buttons, tables, captions" },
  { name: "font-size", about: "Body text" },
  { name: "font-size-heading", about: "Tile values" },
  { name: "font-size-display", about: "Section headings" },
  { name: "font-size-headline", about: "Headlines" },
  { name: "font-size-hero", about: "The hero number" },
];

const SPACES = ["space", "space-2", "space-3", "space-4", "space-6", "space-8", "space-12", "space-24"];

export function TokensGroup() {
  return (
    <Group slug="tokens" title="Tokens">
      {COLOR_GROUPS.map((group) => (
        <ExampleRow group="Tokens" key={group.title} title={group.title} about={group.about} react={group.code}>
          <ol className="docs-swatches">
            {group.tokens.map(({ name, about }) => (
              <li key={name} className="docs-swatch">
                <span className="docs-swatch-color" style={{ background: `var(--boxy-${name})` }} />
                <code className="docs-token">--boxy-{name}</code>
                <span className="docs-about">{about}</span>
              </li>
            ))}
          </ol>
        </ExampleRow>
      ))}
      <ExampleRow
        group="Tokens"
        title="Type"
        about="Each size is --boxy-font-scale (1.5) times the one below it; tiny is the odd one, for the small numbers."
        react="font-size: var(--boxy-font-size-heading);"
      >
        <ol className="docs-type-scale">
          {SIZES.map(({ name, about }) => (
            <li key={name} className="docs-type-size">
              <span className="docs-type-sample" style={{ fontSize: `var(--boxy-${name})` }}>
                Boxykit
              </span>
              <code className="docs-token">--boxy-{name}</code>
              <span className="docs-about">{about}</span>
            </li>
          ))}
        </ol>
      </ExampleRow>
      <ExampleRow group="Tokens" title="Spacing" about="Multiples of --boxy-space (0.25rem)." react="padding: var(--boxy-space-4);">
        <ol className="docs-stack">
          {SPACES.map((s) => (
            <li key={s} className="docs-space">
              <span className="docs-space-bar" style={{ width: `var(--boxy-${s})` }} />
              <code className="docs-token">--boxy-{s}</code>
            </li>
          ))}
        </ol>
      </ExampleRow>
    </Group>
  );
}
