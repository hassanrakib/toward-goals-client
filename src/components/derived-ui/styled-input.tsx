"use client";

import { Field } from "@/components/ui/field";
import { Input, InputProps } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { InputGroup, InputGroupProps } from "@/components/ui/input-group";
import { forwardRef } from "react";

export type StyledInputProps = InputProps & Omit<InputGroupProps, "children"> & {name: string};

const StyledInput = forwardRef<HTMLInputElement, StyledInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function StyledInput(props, ref) {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const { name, placeholder, type, startElement } = props;

    return (
      <Field
        invalid={!!errors[name]}
        errorText={(errors[name]?.message as string) || ""}
      >
        <InputGroup width="100%" startElement={startElement}>
          <Input placeholder={placeholder} type={type} {...register(name)} />
        </InputGroup>
      </Field>
    );
  }
);

export default StyledInput;
