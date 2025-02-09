import { ButtonProps, Button } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface StyledButtonProps extends ButtonProps {};

const StyledButton = forwardRef<HTMLButtonElement, ButtonProps>(
  function StyledButton(props, ref) {
    const { children, ...rest } = props;

    return (
      <Button
        ref={ref}
        colorScheme="gray"
        bg="gray.600"
        color="white"
        _hover={{ bg: "gray.700" }}
        w="100%"
        borderRadius="md"
        {...rest}
      >
        {children}
      </Button>
    );
  }
);

export default StyledButton;
