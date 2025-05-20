import { Dialog, DialogTrigger } from "@chakra-ui/react";
import { DialogBody, DialogContent, DialogRoot } from "../ui/dialog";
import React, { ReactNode } from "react";
import { CloseButton } from "../ui/close-button";

interface StyledDialogProps extends Dialog.RootProps {
  triggerElement?: ReactNode;
  children: ReactNode;
  showCloseTrigger?: boolean;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  backdrop?: boolean;
}

const StyledDialog = React.forwardRef<HTMLDivElement, StyledDialogProps>(
  function StyledDialog(props, ref) {
    const {
      triggerElement,
      children,
      showCloseTrigger = true,
      portalled,
      portalRef,
      backdrop,
      ...rest
    } = props;

    return (
      <DialogRoot
        closeOnInteractOutside={false}
        trapFocus={false}
        placement="center"
        {...rest}
      >
        {/* show trigger element when needed */}
        {triggerElement && (
          <DialogTrigger asChild>{triggerElement}</DialogTrigger>
        )}
        <DialogContent
          portalled={portalled}
          portalRef={portalRef}
          backdrop={backdrop}
          ref={ref}
        >
          <DialogBody pt="6">{children}</DialogBody>
          {showCloseTrigger && (
            <Dialog.CloseTrigger
              bg="gray.300"
              rounded="full"
              position="absolute"
              top="0"
              insetEnd="-12"
              asChild
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          )}
        </DialogContent>
      </DialogRoot>
    );
  }
);

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
