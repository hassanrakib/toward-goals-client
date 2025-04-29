"use client";
import { Button, Dialog, Portal, useDialog } from "@chakra-ui/react";
import { Cross } from "lucide-react";
import { useEffect, useState } from "react";

const Demo = () => {
  const [state, setState] = useState(0);

  const dialog = useDialog();

  useEffect(() => {
    return () => {
      console.log("unmounting...");
    };
  }, []);

  return (
    <Dialog.Root open={dialog.open} unmountOnExit>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" onClick={() => dialog.setOpen(true)}>
          Open Dialog
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Dialog Title: {state} </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>

              <button onClick={() => setState(4)}>Click</button>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger onClick={() => dialog.setOpen(false)} asChild>
              <Cross />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default Demo;
