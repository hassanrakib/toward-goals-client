"use client";

import StyledButton from "@/components/derived-ui/styled-button";
import StyledPopover, {
  PopoverActionTrigger,
} from "@/components/derived-ui/styled-popover";
import { Button, Popover, Portal, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Demo = () => {
  const [state, setState] = useState(1);

  useEffect(() => {
    console.log("mounting...");
    return () => {
      console.log("unmounting...");
    };
  }, []);

  return (
    <StyledPopover triggerElement={<Button>Click me</Button>}>
      <PopoverActionTrigger>
        <Button>Close me</Button>
      </PopoverActionTrigger>
    </StyledPopover>
  );
};

export default Demo;
