import { Toast, Toasts } from "boxykit/react";

export function ToastCount() {
  return (
    <Toasts>
      <Toast title="Uploading" count={3}>
        report.pdf, logo.svg, notes.md
      </Toast>
    </Toasts>
  );
}
