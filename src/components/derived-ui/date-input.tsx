"use client";

import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import { Flex, IconButton, Input, InputProps, Text } from "@chakra-ui/react";
import { Field } from "../ui/field";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Calendar1 } from "lucide-react";

export interface DateInputProps extends InputProps {
  name: string;
  placeholder: string;
  label?: string;
}

export default function DateInput(props: DateInputProps) {
  const { name, placeholder, label, ...rest } = props;

  const {
    formState: { errors },
  } = useFormContext();

  return (
    <Field
      label={label}
      invalid={!!errors[name]}
      errorText={(errors[name]?.message as string) || ""}
    >
      <Controller
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Flex gap={2} width="100%" borderWidth={1} borderRadius="2xl">
            <DatePicker
              onChange={onChange}
              onBlur={onBlur}
              selected={value}
              showTimeSelect
              customInput={
                <IconButton
                  aria-label="Select date and time"
                  variant="ghost"
                  borderRadius="2xl"
                  px={2}
                >
                  <Calendar1 size={22} />
                  <Text>Select Date</Text>
                </IconButton>
              }
            />
            <Input
              placeholder={placeholder}
              borderWidth={0}
              borderRadius="2xl"
              value={format(value, "PPPp")}
              readOnly
              // disabled={true}
              {...rest}
            />
          </Flex>
        )}
      />
    </Field>
  );
}
