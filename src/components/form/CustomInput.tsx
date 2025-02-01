"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import { RegisterOptions, useFormContext } from "react-hook-form";

interface ICustomInputProps {
  name: string;
  placeholder: string;
  registerOptions?: RegisterOptions;
}

export default function CustomInput({
  name,
  placeholder,
  registerOptions,
}: ICustomInputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Field
      invalid={!!errors[name]}
      errorText={errors[name] ? (errors[name].message as string) : ""}
    >
      <Input {...register(name, registerOptions)} placeholder={placeholder} />
    </Field>
  );
}
