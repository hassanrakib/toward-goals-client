import { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { getHookFormError } from "@/utils/form";
import { CheckboxGroup, Fieldset, Flex } from "@chakra-ui/react";

export interface CheckboxCardsProps {
  name: string;
  label: string;
  defaultSelectedValue?: string[];
  children: ReactNode;
}

const CheckboxCards = (props: CheckboxCardsProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const { name, label, defaultSelectedValue, children } = props;

  return (
    <Fieldset.Root invalid={Boolean(getHookFormError(errors, name))}>
      <Fieldset.Legend>{label}</Fieldset.Legend>
      <Controller
        name={name}
        render={({ field }) => (
          <CheckboxGroup
            invalid={Boolean(getHookFormError(errors, name))}
            name={field.name}
            value={field.value}
            defaultValue={defaultSelectedValue}
            onValueChange={field.onChange}
          >
            <Fieldset.Content>
              <Flex gap="2">{children}</Flex>
            </Fieldset.Content>
          </CheckboxGroup>
        )}
      />
      <Fieldset.ErrorText>
        {getHookFormError(errors, name)?.message}
      </Fieldset.ErrorText>
    </Fieldset.Root>
  );
};

export default CheckboxCards;
