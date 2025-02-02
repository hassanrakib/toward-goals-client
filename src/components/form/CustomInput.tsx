"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { InputGroup } from "@/components/ui/input-group";

interface ICustomInputProps {
  name: string;
  placeholder: string;
  registerOptions?: RegisterOptions;
  inputIcon?: React.ReactNode;
}

export default function CustomInput({
  name,
  placeholder,
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
        <Input {...register(name, registerOptions)} placeholder={placeholder} />
      </InputGroup>
    </Field>
  );
}
