import { Toast, Toasts } from "boxykit/react";

// Toasts is fixed to the bottom-right corner, over the page; the caller shows and hides each Toast.
export function ToastBasic() {
  return (
    <Toasts>
      <Toast title="Saved">TSK-0412 moved to Done</Toast>
    </Toasts>
  );
}
