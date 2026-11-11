"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ComponentProps, KeyboardEvent, ReactElement } from "react";
import { classNames } from "./class-names.js";
import { ProgressRing } from "./progress.js";

export type DropdownOption = {
  value: string;
  label: string;
  /** A ProgressRing after the label, filled to this (0–1). */
  ring?: number;
};

function ringTitle(ring: number): string {
  return `${String(Math.round(ring * 100))}%`;
}

/**
 * A field that opens a box of `options` under it, with a search on top (`search={false}` drops it).
 * `numbered` puts 01, 02… before them; an option keeps its number while the search hides others.
 * Arrows move, Enter picks, Esc and a click outside close. Controlled with `value`, or give `defaultValue`;
 * `name` adds a hidden input, so it goes with a form. Native button props (`aria-label`, `id`…) reach the field.
 */
export function Dropdown({
  className,
  options,
  value,
  defaultValue,
  onChange,
  placeholder = "Choose…",
  search = true,
  searchPlaceholder = "Search",
  numbered = false,
  nothingFound = "Nothing found",
  name,
  id,
  ...props
}: {
  className?: string;
  options: DropdownOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  search?: boolean;
  searchPlaceholder?: string;
  numbered?: boolean;
  /** What the box says when the search matches nothing. */
  nothingFound?: string;
  name?: string;
} & Omit<ComponentProps<"button">, "type" | "value" | "defaultValue" | "onChange" | "className" | "name">): ReactElement {
  const ownId = useId();
  const triggerId = id ?? `${ownId}trigger`;
  const listId = `${ownId}list`;
  const [own, setOwn] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const current = value ?? own;
  const selected = options.find((option) => option.value === current);
  const needle = query.trim().toLowerCase();
  const shown = options
    .map((option, index) => ({ option, number: index + 1 }))
    .filter(({ option }) => option.label.toLowerCase().includes(needle));
  const activeOption = shown[Math.min(active, shown.length - 1)]?.option;

  function optionId(option: DropdownOption): string {
    return `${listId}-${option.value}`;
  }

  // A click anywhere outside closes it.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent): void {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  // Opening moves the focus into the box: the search, or the list without one.
  useEffect(() => {
    if (!open) return;

    (searchRef.current ?? listRef.current)?.focus();
  }, [open]);

  // The option reached with the arrows stays in view.
  useEffect(() => {
    if (!open || !activeOption) return;

    document.getElementById(optionId(activeOption))?.scrollIntoView({ block: "nearest" });
  });

  function show(): void {
    const index = shown.findIndex(({ option }) => option.value === current);

    setQuery("");
    setActive(Math.max(0, index));
    setOpen(true);
  }

  function close(): void {
    setOpen(false);
    triggerRef.current?.focus();
  }

  function pick(option: DropdownOption): void {
    if (value === undefined) setOwn(option.value);
    if (option.value !== current) onChange?.(option.value);
    close();
  }

  function onPopupKeyDown(event: KeyboardEvent<HTMLElement>): void {
    const last = shown.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(last, active + 1),
      ArrowUp: Math.max(0, active - 1),
      Home: 0,
      End: last,
    };
    const next = moves[event.key];

    if (next !== undefined) {
      event.preventDefault();
      setActive(Math.max(0, next));

      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (activeOption) pick(activeOption);

      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      close();

      return;
    }

    if (event.key === "Tab") setOpen(false);
  }

  // The search, or the list itself without one, holds the focus and points at the active option.
  let activeId: string | undefined;

  if (open && activeOption) activeId = optionId(activeOption);

  return (
    <div ref={rootRef} className={classNames("boxy-dropdown", className)}>
      <button
        ref={triggerRef}
        id={triggerId}
        className="boxy-dropdown-trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (open) {
            setOpen(false);

            return;
          }

          show();
        }}
        onKeyDown={(event) => {
          if (open || (event.key !== "ArrowDown" && event.key !== "ArrowUp")) return;

          event.preventDefault();
          show();
        }}
        {...props}
      >
        {selected?.label ?? <span className="boxy-dropdown-placeholder">{placeholder}</span>}
      </button>
      {name !== undefined && <input type="hidden" name={name} value={current ?? ""} />}
      <div className="boxy-dropdown-popup" hidden={!open}>
        {search && (
          <input
            ref={searchRef}
            className="boxy-dropdown-search"
            type="search"
            role="combobox"
            aria-label={searchPlaceholder}
            aria-expanded={open}
            aria-autocomplete="list"
            placeholder={searchPlaceholder}
            autoComplete="off"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            aria-controls={listId}
            aria-activedescendant={activeId}
            onKeyDown={onPopupKeyDown}
          />
        )}
        <div
          ref={listRef}
          id={listId}
          className="boxy-dropdown-list"
          role="listbox"
          aria-labelledby={triggerId}
          tabIndex={-1}
          onKeyDown={search ? undefined : onPopupKeyDown}
          aria-activedescendant={search ? undefined : activeId}
        >
          {shown.map(({ option, number }) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/interactive-supports-focus -- the search or the list keeps the focus and points at an option (aria-activedescendant); Enter there picks it
            <div
              key={option.value}
              id={optionId(option)}
              className="boxy-dropdown-option"
              role="option"
              aria-selected={option.value === current}
              data-state={option === activeOption && open ? "active" : undefined}
              onClick={() => {
                pick(option);
              }}
              onPointerMove={() => {
                setActive(shown.findIndex((item) => item.option === option));
              }}
            >
              {numbered && <span className="boxy-dropdown-option-number">{String(number).padStart(2, "0")}</span>}
              <span className="boxy-dropdown-option-label">{option.label}</span>
              {option.ring !== undefined && <ProgressRing value={option.ring} title={ringTitle(option.ring)} />}
            </div>
          ))}
        </div>
        <p className="boxy-dropdown-empty" hidden={shown.length > 0}>
          {nothingFound}
        </p>
      </div>
    </div>
  );
}
