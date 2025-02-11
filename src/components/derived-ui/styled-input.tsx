"use client";

import { Field } from "@/components/ui/field";
import { Input, InputProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { InputGroup } from "@/components/ui/input-group";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

export interface StyledInputProps extends InputProps {
  name: string;
  placeholder: string;
  label?: string;
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  startElement?: ReactNode;
}

const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function StyledInput(props, ref) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const { name, placeholder, label, type, startElement, ...rest } = props;

    return (
      <Field
        label={label}
        invalid={!!errors[name]}
        errorText={(errors[name]?.message as string) || ""}
      >
        <InputGroup width="100%" startElement={startElement}>
          <Input
            placeholder={placeholder}
            type={type}
            borderRadius="2xl"
            {...rest}
            {...register(name)}
          />
        </InputGroup>
      </Field>
    );
  }
);

export default StyledInput;
