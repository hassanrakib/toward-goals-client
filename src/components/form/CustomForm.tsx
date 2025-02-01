"use client";

import { Fieldset, Stack } from "@chakra-ui/react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";

// make some props mandatory for useForm
type CustomizedUseFormProps<FormValues extends FieldValues> =
  UseFormProps<FormValues> & {
    defaultValues: FormValues;
  };

interface ICustomFormProps<FormValues extends FieldValues> {
  children: React.ReactNode;
  submitHandler: SubmitHandler<FormValues>;
  title: string;
  description: string;
  useFormProps: CustomizedUseFormProps<FormValues>;
}

export default function CustomForm<FormValues extends FieldValues>({
  children,
  submitHandler,
  title,
  description,
  useFormProps,
}: ICustomFormProps<FormValues>) {
  const methods = useForm<FormValues>(useFormProps);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    submitHandler(data);

    // reset the form after submission
    methods.reset(useFormProps.defaultValues);
  };

  return (
    <FormProvider {...methods}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>{title}</Fieldset.Legend>
          <Fieldset.HelperText>{description}</Fieldset.HelperText>
        </Stack>

        <Fieldset.Content>{children}</Fieldset.Content>
      </Fieldset.Root>
    </FormProvider>
  );
}
