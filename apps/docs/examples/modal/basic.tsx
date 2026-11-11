"use client";

import { Button, LabelSquare, LabelSquares, Modal } from "boxykit/react";
import { useState } from "react";

export function ModalBasic() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <>
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Open modal
      </Button>
      <Modal
        open={open}
        title="TSK-0412"
        onClose={close}
        actions={
          <>
            <Button look="outline" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>Save</Button>
          </>
        }
      >
        <LabelSquares>
          <LabelSquare label="Status">In review</LabelSquare>
          <LabelSquare label="Owner">Mia</LabelSquare>
          <LabelSquare label="Title" wide>
            Fix the login form on Safari
          </LabelSquare>
        </LabelSquares>
      </Modal>
    </>
  );
}
