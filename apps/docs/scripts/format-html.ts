const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);

function tagName(token: string): string {
  return /^<\/?([a-zA-Z0-9-]+)/.exec(token)?.[1]?.toLowerCase() ?? "";
}

function isOpen(token: string): boolean {
  return token.startsWith("<") && !token.startsWith("</") && !token.endsWith("/>") && !VOID.has(tagName(token));
}

function isClose(token: string): boolean {
  return token.startsWith("</");
}

/** Indents one-line markup from renderToStaticMarkup; `<b>text</b>` and `<x></x>` stay on one line. */
export function formatHtml(html: string): string {
  const tokens = html.split(/(<[^>]+>)/).filter((t) => t.trim() !== "");
  const lines: string[] = [];
  let depth = 0;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i] ?? "";
    const next = tokens[i + 1] ?? "";
    const afterNext = tokens[i + 2] ?? "";
    const pad = "  ".repeat(depth);

    if (isOpen(token) && isClose(next)) {
      lines.push(pad + token + next);
      i += 1;
      continue;
    }

    if (isOpen(token) && !next.startsWith("<") && isClose(afterNext)) {
      lines.push(pad + token + next + afterNext);
      i += 2;
      continue;
    }

    if (isClose(token)) {
      depth -= 1;
      lines.push("  ".repeat(depth) + token);
      continue;
    }

    lines.push(pad + token);

    if (isOpen(token)) depth += 1;
  }

  return lines.join("\n");
}
