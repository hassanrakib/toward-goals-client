"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { InputGroup } from "@/components/ui/input-group";
import { HTMLInputTypeAttribute } from "react";

interface ICustomInputProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute
  registerOptions?: RegisterOptions;
  inputIcon?: React.ReactNode;
}

export default function CustomInput({
  name,
  placeholder,
  type,
  registerOptions,
  inputIcon,
}: ICustomInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Field
      invalid={!!errors[name]}
      errorText={(errors[name]?.message as string) || ""}
    >
      <InputGroup width="100%" startElement={inputIcon || null}>
        <Input placeholder={placeholder} type={type} {...register(name, registerOptions)} />
      </InputGroup>
    </Field>
  );
}
