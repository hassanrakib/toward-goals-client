import { PopoverRootProps, Popover } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";
import React, { ReactNode } from "react";

interface PopoverProps extends PopoverRootProps {
  triggerElement: ReactNode;
  children: ReactNode;
}

const StyledPopover = (props: PopoverProps) => {
  const { triggerElement, children, ...rest } = props;
  return (
    <PopoverRoot
      size="xs"
      positioning={{ placement: "top-end" }}
      unmountOnExit
      {...rest}
    >
      <PopoverTrigger asChild>{triggerElement}</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export const PopoverCloseTrigger = React.forwardRef<
  HTMLButtonElement,
  Popover.CloseTriggerProps
>(function PopoverCloseTrigger(props, ref) {
  const { children, ...rest } = props;
  return (
    <Popover.CloseTrigger
      {...rest}
      asChild
      ref={ref}
    >
      {children}
    </Popover.CloseTrigger>
  );
});

export default StyledPopover;
