import { useFormContext } from "react-hook-form";
import Button from "../ui/button";

interface ISubmitButtonProps {
  children: React.ReactNode;
  isServerActionLoading: boolean;
  loadingText: string;
}

const SubmitButton = ({
  children,
  isServerActionLoading,
  loadingText,
}: ISubmitButtonProps) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <Button
      type="submit"
      loading={isServerActionLoading || isSubmitting}
      loadingText={loadingText}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
