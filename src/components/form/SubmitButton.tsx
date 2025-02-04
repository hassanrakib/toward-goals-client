import { Button } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface ISubmitButtonProps {
  children: React.ReactNode;
  loading: boolean;
  loadingText: string;
}

const SubmitButton = ({
  children,
  loading,
  loadingText,
}: ISubmitButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Button
      type="submit"
      colorScheme="gray"
      bg="gray.600"
      color="white"
      _hover={{ bg: "gray.700" }}
      w="100%"
      borderRadius="md"
      loading={loading || isSubmitting}
      loadingText={loadingText}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
