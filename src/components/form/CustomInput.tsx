"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { InputGroup } from "@/components/ui/input-group";
import { HTMLInputTypeAttribute } from "react";

interface ICustomInputProps {
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  startElement?: React.ReactNode;
}

export default function CustomInput({
  name,
  placeholder,
  type,
  startElement,
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
      <InputGroup width="100%" startElement={startElement || null}>
        <Input placeholder={placeholder} type={type} {...register(name)} />
      </InputGroup>
    </Field>
  );
}
