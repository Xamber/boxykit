/** Joins the class names that are set: classNames("boxy-button", small && "boxy-button-small"). */
export function classNames(...names: (string | false | null | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}
