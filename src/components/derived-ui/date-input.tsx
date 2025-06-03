"use client";

import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Input, InputProps, useBreakpointValue } from "@chakra-ui/react";
import { Field } from "../ui/field";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Calendar1 } from "lucide-react";
import { InputGroup } from "../ui/input-group";

export interface DateInputProps extends InputProps {
  name: string;
  placeholder: string;
  label?: string;
}

export default function DateInput(props: DateInputProps) {
  const { name, placeholder, label, ...rest } = props;

  // shouldUsePortal will be true from "base" to below "md" breakpoint
  // used to show DatePicker Calendar within a portal from "base" to below "md"
  const shouldUsePortal = useBreakpointValue({ base: true, md: false });

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Field
      label={label}
      invalid={!!errors[name]}
      errorText={(errors[name]?.message as string) || ""}
      alignItems="stretch"
    >
      <Controller
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <DatePicker
            onChange={onChange}
            onBlur={onBlur}
            selected={value}
            showTimeSelect
            withPortal={shouldUsePortal}
            customInput={
              <InputGroup width="full" startElement={<Calendar1 />}>
                <Input
                  placeholder={placeholder}
                  borderRadius="2xl"
                  value={format(value, "PPPp")}
                  readOnly
                  {...rest}
                />
              </InputGroup>
            }
          />
        )}
      />
    </Field>
  );
}
