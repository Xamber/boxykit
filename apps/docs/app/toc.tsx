"use client";

// The anchors down the right side: an InteractiveList that follows the page.
import { InteractiveList, useCurrentSection } from "boxykit/react";
import type { ReactElement } from "react";

export function Toc({ anchors }: { anchors: { slug: string; title: string }[] }): ReactElement {
  const current = useCurrentSection(anchors.map((a) => a.slug));
  const links = anchors.map((a) => ({ href: `#${a.slug}`, label: a.title }));
  let href: string | undefined;

  if (current) href = `#${current}`;

  return <InteractiveList className="docs-toc" label="On this page" links={links} current={href} />;
}
