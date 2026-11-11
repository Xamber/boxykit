"use client";

import { useEffect, useState } from "react";

/**
 * The id of the section being read, for InteractiveList's `current`: the last of `ids` whose top has passed
 * a third of the way down the window, or the last one once the page is scrolled to the end.
 */
export function useCurrentSection(ids: readonly string[]): string | undefined {
  const [current, setCurrent] = useState<string>();
  // A string, so a new array with the same ids doesn't subscribe again.
  const key = ids.join(" ");

  useEffect(() => {
    const sections = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null);
    let frame = 0;

    function update() {
      const line = window.innerHeight / 3;
      const end = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
      let found = sections[0]?.id;

      frame = 0;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) found = section.id;
      }

      // The last sections may be too short to reach the line.
      if (end) found = sections.at(-1)?.id;

      setCurrent(found);
    }

    function schedule() {
      if (frame === 0) frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key]);

  return current;
}
