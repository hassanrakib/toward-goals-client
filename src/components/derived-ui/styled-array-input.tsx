"use client";

import { Group, IconButton, VStack } from "@chakra-ui/react";
import { useFieldArray } from "react-hook-form";
import StyledInput, { StyledInputProps } from "./styled-input";
import { Plus, Trash2 } from "lucide-react";
import StyledButton from "./styled-button";
import { useEffect } from "react";

export interface StyledArrayInputProps
  extends Omit<StyledInputProps, "name" | "label"> {
  arrayName: string;
  fieldName: string;
  maxFieldCount: number;
  onFieldCountChange?: (count: number) => void;
}

const StyledArrayInput = (props: StyledArrayInputProps) => {
  // destructure props
  const { arrayName, fieldName, maxFieldCount, onFieldCountChange, ...rest } =
    props;

  // use react hook form useFieldArray() to create dynamic form
  const { fields, append, remove } = useFieldArray({ name: arrayName });

  // whenever field count changes
  useEffect(() => {
    // call the callback(if provided) to let the parent know about the current field count
    onFieldCountChange?.(fields.length);
  }, [fields.length, onFieldCountChange]);

  return (
    <VStack alignItems="stretch">
      {fields.map((field, index) => (
        <Group key={field.id} attached={false} w="full" alignItems="flex-start">
          <StyledInput name={`${arrayName}.${index}.${fieldName}`} {...rest} />
          <IconButton
            colorPalette="yellow"
            color="red.600"
            onClick={() => remove(index)}
          >
            <Trash2 />
          </IconButton>
        </Group>
      ))}
      {/* if field count is equal to maxFieldCount, don't render the append button */}
      {fields.length !== maxFieldCount ? (
        <StyledButton
          // append a new field
          onClick={() => append({ fieldName: "" })}
          bgColor="bg"
          border="1.5px dashed"
          borderColor="yellow.500"
        >
          <Plus />
        </StyledButton>
      ) : null}
    </VStack>
  );
};

export default StyledArrayInput;
