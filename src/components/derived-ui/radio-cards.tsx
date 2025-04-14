import { ReactNode, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getHookFormError } from "@/utils/form";
import { RadioCardRoot } from "../ui/radio-card";
import { Field } from "../ui/field";
import { HStack } from "@chakra-ui/react";

export interface RadioCardsProps {
  name: string;
  label: string;
  defaultValue?: string;
  children: ReactNode;
}

const RadioCards = (props: RadioCardsProps) => {
  const {
    setValue,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const { name, label, children, defaultValue } = props;

  useEffect(() => {
    // set default value after finally gettting it
    if (defaultValue) {
      setValue(name, defaultValue);
      clearErrors(name);
    }
  }, [setValue, clearErrors, name, defaultValue]);

  return (
    <Field
      label={label}
      invalid={Boolean(getHookFormError(errors, name))}
      errorText={getHookFormError(errors, name)?.message}
      alignItems="stretch"
    >
      <Controller
        name={name}
        render={({ field }) => (
          <RadioCardRoot {...field}>
            <HStack align="stretch">{children}</HStack>
          </RadioCardRoot>
        )}
      />
    </Field>
  );
};

export default RadioCards;
