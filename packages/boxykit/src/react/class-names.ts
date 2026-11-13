/** Joins the class names that are set: classNames("boxy-button", tiny && "boxy-button-tiny"). */
export function classNames(...names: (string | false | null | undefined)[]): string {
  return names.filter(Boolean).join(" ");
}
