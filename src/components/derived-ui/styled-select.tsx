import { Controller, useFormContext } from "react-hook-form";
import { Field } from "../ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { ListCollection, Select } from "@chakra-ui/react";
import { getHookFormError } from "@/utils/form";

export interface StyledSelectProps<T> extends Select.RootProps {
  name: string;
  label?: string;
  placeholder: string;
  collection: ListCollection<T>;
  onChange?: (data: string[]) => void;
}

export default function StyledSelect<
  T extends { label: string; value: string },
>(props: StyledSelectProps<T>) {
  const {
    formState: { errors },
  } = useFormContext();

  const { name, label, placeholder, collection, onChange, ...rest } = props;

  return (
    <Field
      label={label}
      invalid={Boolean(getHookFormError(errors, name))}
      errorText={getHookFormError(errors, name)?.message}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <SelectRoot
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => {
              field.onChange(value);
              if (onChange) onChange(value);
            }}
            onInteractOutside={() => field.onBlur()}
            collection={collection}
            {...rest}
          >
            <SelectTrigger>
              <SelectValueText placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent rounded="2xl">
              {collection.items.map((item) => (
                <SelectItem item={item} key={item.value} rounded="2xl">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      />
    </Field>
  );
}
