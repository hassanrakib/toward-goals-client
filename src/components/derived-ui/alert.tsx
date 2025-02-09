import { Alert as ChakraAlert } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface AlertProps extends ChakraAlert.RootProps {}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const { children, ...rest } = props;

    return (
      <ChakraAlert.Root ref={ref} variant="outline" size="sm" {...rest}>
        <ChakraAlert.Indicator />
        <ChakraAlert.Title>{children}</ChakraAlert.Title>
      </ChakraAlert.Root>
    );
  }
);

export default Alert;
