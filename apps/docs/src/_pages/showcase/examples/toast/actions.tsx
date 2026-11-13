import { Button, Toast, Toasts } from "boxykit/react";

// With actions it waits for an answer: hide it when one of its buttons is pressed.
export function ToastActions() {
  return (
    <Toasts>
      <Toast
        title="Delete 3 tasks?"
        actions={
          <>
            <Button look="outline" size="tiny">
              Cancel
            </Button>
            <Button size="tiny">Delete</Button>
          </>
        }
      >
        This can’t be undone.
      </Toast>
    </Toasts>
  );
}
