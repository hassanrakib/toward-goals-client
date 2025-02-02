"use client";

import { Fieldset } from "@chakra-ui/react";
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
  useFormProps: CustomizedUseFormProps<FormValues>;
}

export default function CustomForm<FormValues extends FieldValues>({
  children,
  submitHandler,
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
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Fieldset.Root>{children}</Fieldset.Root>
      </form>
    </FormProvider>
  );
}
