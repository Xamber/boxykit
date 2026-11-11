"use client";

import { Button, LabelTile, LabelTiles, Modal } from "boxykit/react";
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
        <LabelTiles>
          <LabelTile label="Status">In review</LabelTile>
          <LabelTile label="Owner">Mia</LabelTile>
          <LabelTile label="Title" wide>
            Fix the login form on Safari
          </LabelTile>
        </LabelTiles>
      </Modal>
    </>
  );
}
