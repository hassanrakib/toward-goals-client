import { Alert as ChakraAlert, Spinner } from "@chakra-ui/react";
import { forwardRef } from "react";

export interface AlertProps extends ChakraAlert.RootProps {
  showSpinner?: boolean;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    const { showSpinner, children, ...rest } = props;

    return (
      <ChakraAlert.Root ref={ref} variant="outline" size="sm" {...rest}>
        <ChakraAlert.Indicator>
          {showSpinner && <Spinner size="sm" />}
        </ChakraAlert.Indicator>
        <ChakraAlert.Title>{children}</ChakraAlert.Title>
      </ChakraAlert.Root>
    );
  }
);

export default Alert;
