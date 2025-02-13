import { Controller, useFormContext } from "react-hook-form";
import { Field } from "../ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";
import { ListCollection } from "@chakra-ui/react";

export interface StyledSelectProps<T> {
  name: string;
  label?: string;
  placeholder: string;
  collection: ListCollection<T>;
}

export default function StyledSelect<
  T extends { label: string; value: string },
>(props: StyledSelectProps<T>) {
  const {
    formState: { errors },
  } = useFormContext();

  const { name, label, placeholder, collection } = props;

  return (
    <Field
      label={label}
      invalid={!!errors[name]}
      errorText={(errors[name]?.message as string) || ""}
    >
      <Controller
        name={name}
        render={({ field }) => (
          <SelectRoot
            name={field.name}
            value={field.value}
            onValueChange={({ value }) => field.onChange(value)}
            onInteractOutside={() => field.onBlur()}
            collection={collection}
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
