"use client";
import {
  NumberInputField,
  NumberInputProps,
  NumberInputRoot,
} from "../ui/number-input";
import { Field } from "../ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { InputGroup } from "../ui/input-group";
import { Text } from "@chakra-ui/react";

export interface StyledNumberInputProps extends NumberInputProps {
  name: string;
  placeholder: string;
  label?: string;
  unit: string;
}

const StyledNumberInput = (props: StyledNumberInputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { name, placeholder, label, unit, ...rest } = props;
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
            width="full"
            disabled={field.disabled}
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(Number(value));
            }}
            {...rest}
          >
            <InputGroup width="full" endElement={<Text mr={4}>{unit}</Text>}>
              <NumberInputField
                borderRadius="2xl"
                placeholder={placeholder}
                onBlur={field.onBlur}
              />
            </InputGroup>
          </NumberInputRoot>
        )}
      />
    </Field>
  );
};

export default StyledNumberInput;
