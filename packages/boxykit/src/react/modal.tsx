"use client";

import { useEffect, useRef } from "react";
import type { MouseEvent, ReactElement, ReactNode } from "react";
import { classNames } from "./class-names.js";

/**
 * A square over the dimmed page: title small at the top with ✕, the content, then `actions`.
 * Esc, ✕ and a click on the dim call `onClose`; the caller owns `open`.
 */
export function Modal({
  className,
  open,
  title,
  actions,
  onClose,
  children,
}: {
  className?: string;
  open: boolean;
  title: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
  children: ReactNode;
}): ReactElement {
  const ref = useRef<HTMLDialogElement>(null);

  // showModal() rather than the open attribute: it brings the backdrop, Esc and the focus trap.
  useEffect(() => {
    const dialog = ref.current;

    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // The frame fills the dialog, so a click on the dialog itself is a click on the dim around it.
  function onClick(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- the backdrop click is a mouse shortcut; Esc closes it from the keyboard
    <dialog ref={ref} className={classNames("boxy-modal", className)} onClose={onClose} onClick={onClick}>
      <div className="boxy-modal-frame">
        <header className="boxy-modal-head">
          <h2 className="boxy-modal-title">{title}</h2>
          <button className="boxy-modal-close" type="button" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </header>
        <div className="boxy-modal-body">{children}</div>
        {actions && <footer className="boxy-modal-actions">{actions}</footer>}
      </div>
    </dialog>
  );
}
