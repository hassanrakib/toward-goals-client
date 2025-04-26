"use client";

import Form from "@/components/derived-ui/form";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import StyledPopover, {
  PopoverCloseTrigger,
} from "@/components/derived-ui/styled-popover";
import SubmitButton from "@/components/derived-ui/submit-button";
import { recordCustomUnitSchema } from "@/schemas/task";
import { ITask } from "@/types/task";
import { Box, HStack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CirclePlus } from "lucide-react";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  newCompletedUnits: number;
}

const RecordCustomUnit = ({
  task,
  difficultyColorPalette,
}: {
  task: ITask;
  difficultyColorPalette: string;
}) => {
  const {
    _id: taskId,
    habit: { unit },
  } = task;

  // form default values
  const defaultValues: IFormValues = {
    newCompletedUnits: 1,
  };
  // form submit handler
  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    console.log(data);
  };

  return (
    <StyledPopover
      triggerElement={
        <Box cursor="pointer">
          <CirclePlus size="18px" color={difficultyColorPalette} />
        </Box>
      }
    >
      {/* form */}
      <Form
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues,
          resolver: zodResolver(recordCustomUnitSchema),
        }}
      >
        <HStack>
          <StyledNumberInput
            name="newCompletedUnits"
            placeholder={`How many ${unit.name} di d you complete?`}
            unit={unit.name}
            flexGrow="1"
          />
          <PopoverCloseTrigger>
            <SubmitButton isServerActionLoading={false} size="xs">
              <Check />
            </SubmitButton>
          </PopoverCloseTrigger>
        </HStack>
      </Form>
    </StyledPopover>
  );
};

export default RecordCustomUnit;
