"use client";
import {
  NumberInputField,
  NumberInputProps,
  NumberInputRoot,
} from "../ui/number-input";
import { Field } from "../ui/field";
import { Controller, useFormContext } from "react-hook-form";

export interface StyledNumberInputProps extends NumberInputProps {
  name: string;
  placeholder: string;
  label?: string;
}

const StyledNumberInput = (props: StyledNumberInputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { name, placeholder, label, ...rest } = props;
  return (
    <Field
      label={label}
      invalid={!!errors[name]}
      errorText={(errors[name]?.message as string) || ""}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <NumberInputRoot
            disabled={field.disabled}
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value);
            }}
            {...rest}
          >
            <NumberInputField
              borderRadius="2xl"
              placeholder={placeholder}
              onBlur={field.onBlur}
            />
          </NumberInputRoot>
        )}
      />
    </Field>
  );
};

export default StyledNumberInput;
