import { Dialog, DialogTrigger } from "@chakra-ui/react";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
} from "../ui/dialog";
import React, { ReactNode } from "react";

interface StyledDialogProps extends Dialog.RootProps {
  triggerElement: ReactNode;
  children: ReactNode;
  showCloseTrigger?: boolean;
  onCloseTrigger?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  backdrop?: boolean;
}

const StyledDialog = (props: StyledDialogProps) => {
  const {
    triggerElement,
    children,
    showCloseTrigger = true,
    onCloseTrigger,
    portalled,
    portalRef,
    backdrop,
    ...rest
  } = props;

  return (
    <DialogRoot {...rest} closeOnInteractOutside={false}>
      <DialogTrigger asChild>{triggerElement}</DialogTrigger>
      <DialogContent
        portalled={portalled}
        portalRef={portalRef}
        backdrop={backdrop}
      >
        <DialogBody pt={showCloseTrigger ? "60px" : "24px"}>
          {children}
        </DialogBody>
        {showCloseTrigger && <DialogCloseTrigger onClick={onCloseTrigger} />}
      </DialogContent>
    </DialogRoot>
  );
};

// execute action also close the dialog
export const DialogActionTrigger = React.forwardRef<
  HTMLButtonElement,
  Dialog.ActionTriggerProps
>(function DialogActionTrigger(props, ref) {
  const { children, ...rest } = props;
  return (
    <Dialog.ActionTrigger {...rest} asChild ref={ref}>
      {children}
    </Dialog.ActionTrigger>
  );
});

export default StyledDialog;
