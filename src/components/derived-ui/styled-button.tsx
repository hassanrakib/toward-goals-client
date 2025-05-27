"use client";

import { ButtonProps, Button } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface StyledButtonProps extends ButtonProps {}

const StyledButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function StyledButton(props, ref) {
    const { children, ...rest } = props;

    return (
      <Button ref={ref} colorPalette="yellow" rounded="2xl" color="yellow.800" {...rest}>
        {children}
      </Button>
    );
  }
);

export default StyledButton;
