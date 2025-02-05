import { Alert as ChakraAlert } from "@chakra-ui/react";

interface IAlertProps {
  children: string;
  status: "error" | "info" | "success" | "warning";
}

const Alert = ({ children, status }: IAlertProps) => {
  return (
    <ChakraAlert.Root status={status} variant="outline" size="sm">
      <ChakraAlert.Indicator />
      <ChakraAlert.Title>{children}</ChakraAlert.Title>
    </ChakraAlert.Root>
  );
};

export default Alert;
