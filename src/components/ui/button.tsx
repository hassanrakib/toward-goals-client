import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import { forwardRef } from "react";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { children, ...rest } = props;

    return (
      <ChakraButton
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
      </ChakraButton>
    );
  }
);

export default Button;
