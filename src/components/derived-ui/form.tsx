"use client";

import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReset,
} from "react-hook-form";

// make some props mandatory for useForm
type CustomizedUseFormProps<FormValues extends FieldValues> =
  UseFormProps<FormValues> & {
    defaultValues: FormValues;
  };

interface IFormProps<FormValues extends FieldValues> {
  children: React.ReactNode;
  onSubmit: (
    data: FormValues,
    reset: UseFormReset<FormValues>
  ) => Promise<void>;
  useFormProps: CustomizedUseFormProps<FormValues>;
}

export default function Form<FormValues extends FieldValues>({
  children,
  onSubmit,
  useFormProps,
}: IFormProps<FormValues>) {
  const methods = useForm<FormValues>(useFormProps);

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit(data, methods.reset);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>{children}</form>
    </FormProvider>
  );
}
