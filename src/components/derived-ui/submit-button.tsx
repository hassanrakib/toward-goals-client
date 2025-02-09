import { useFormContext } from "react-hook-form";
import StyledButton, { StyledButtonProps } from "../derived-ui/styled-button";
import { forwardRef } from "react";

export interface SubmitButtonProps extends StyledButtonProps {
  isServerActionLoading: boolean;
}

const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  function SubmitButton(props, ref) {
    const { children, isServerActionLoading, ...rest } = props;
    const {
      formState: { isSubmitting },
    } = useFormContext();
    return (
      <StyledButton
        ref={ref}
        {...rest}
        type="submit"
        loading={isServerActionLoading || isSubmitting}
      >
        {children}
      </StyledButton>
    );
  }
);

export default SubmitButton;
