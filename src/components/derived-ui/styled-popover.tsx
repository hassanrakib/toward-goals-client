import { Popover, PopoverRootProps } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "../ui/popover";
import React, { ReactNode } from "react";

interface StyledPopoverProps extends PopoverRootProps {
  triggerElement: ReactNode;
  maxW?: string;
  children: ReactNode;
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
}

const StyledPopover = (props: StyledPopoverProps) => {
  const {
    triggerElement,
    maxW,
    children,
    portalled,
    portalRef,
    ...rest
  } = props;
  return (
    <PopoverRoot size="xs" autoFocus={false} unmountOnExit {...rest}>
      <PopoverTrigger asChild>{triggerElement}</PopoverTrigger>
      <PopoverContent
        portalled={portalled}
        portalRef={portalRef}
        maxW={maxW}
      >
        <PopoverArrow />
        <PopoverBody>{children}</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

// execute action also close the popover
export const PopoverActionTrigger = React.forwardRef<
  HTMLButtonElement,
  Popover.CloseTriggerProps
>(function PopoverActionTrigger(props, ref) {
  const { children, ...rest } = props;
  return (
    <Popover.CloseTrigger {...rest} asChild ref={ref}>
      {children}
    </Popover.CloseTrigger>
  );
});

export default StyledPopover;
