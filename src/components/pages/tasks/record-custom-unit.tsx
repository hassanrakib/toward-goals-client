"use client";

import Form from "@/components/derived-ui/form";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import StyledProgressBar from "@/components/derived-ui/styled-progress";
import SubmitButton from "@/components/derived-ui/submit-button";
import { toaster } from "@/components/ui/toaster";
import { useUpdateTaskMutation } from "@/redux/features/task/task.api";
import { ITask } from "@/types/task";
import { getPercentage } from "@/utils/global";
import { getActiveDifficulty, getDifficultyColor } from "@/utils/habit";
import { Box, Card, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UseFormReset } from "react-hook-form";

interface IFormValues {
  newCompletedUnits: number;
}

const RecordCustomUnit = ({ task }: { task: ITask }) => {
  // destructure
  const {
    _id: taskId,
    habit: { unit, difficulties },
    completedUnits,
  } = task;

  // router from next/navigation
  const router = useRouter();

  // task update handler
  const [updateTask, { isLoading: isUpdatingTask }] = useUpdateTaskMutation();

  // state for form input controlling
  const [newCompletedUnits, setNewCompletedUnits] = useState(0);

  // calculate totalCompletedUnit
  const totalCompletedUnit = completedUnits + newCompletedUnits;

  // get active difficulty
  const activeDifficulty = getActiveDifficulty(
    difficulties,
    totalCompletedUnit
  );

  // get active difficulty color
  const activeDifficultyColor = getDifficultyColor(activeDifficulty.name);

  // get active difficulty completion
  // as totalCompletedUnit can be greater than current difficulty requirement
  // we are handling it here
  const activeDifficultyCompletion =
    totalCompletedUnit > activeDifficulty.requirement
      ? activeDifficulty.requirement
      : totalCompletedUnit;

  // form submit handler
  const onSubmit = async (
    data: IFormValues,
    reset: UseFormReset<IFormValues>
  ) => {
    // if new completed units less than 1, just return don't do anything
    if (data.newCompletedUnits < 1) {
      return;
    }

    // update the task
    const res = await updateTask({
      taskId,
      newCompletedUnits: data.newCompletedUnits,
    });

    if (res.data?.data) {
      // show a ui feedback
      toaster.create({
        type: "info",
        description: `${data.newCompletedUnits} ${unit.name} completed`,
      });
      // reset the form
      reset({ newCompletedUnits: 0 });
      // refresh the current route
      router.refresh();
      // clear the state
      setNewCompletedUnits(0);
    }
  };

  return (
    <Card.Root
      variant="elevated"
      rounded="2xl"
      border="2px dashed"
      borderColor="yellow.500"
    >
      <Card.Body gap="2">
        {/* progress bar */}
        <StyledProgressBar
          // label will be shown on the top of the progress bar
          labelPosition="top"
          // width equals to the progress bar (filled part) within the progress container
          progressPercentage={`${getPercentage(activeDifficultyCompletion, activeDifficulty.requirement)}%`}
          // progress bar label
          label={`${totalCompletedUnit}/${activeDifficulty.requirement} ${unit.name}`}
          // max value for progress bar
          max={activeDifficulty.requirement}
          value={activeDifficultyCompletion}
          barColorPalette={activeDifficultyColor}
          size="xl"
        />
        <Box alignSelf="center">
          <Form
            onSubmit={onSubmit}
            useFormProps={{
              defaultValues: { newCompletedUnits: 0 },
            }}
          >
            <HStack alignItems="center">
              <StyledNumberInput
                name="newCompletedUnits"
                placeholder={`How many ${unit.name} did you complete?`}
                min={0}
                unit={unit.name}
                onNumberInputChange={(value) => {
                  setNewCompletedUnits(value);
                }}
                size="sm"
              />
              <SubmitButton
                isServerActionLoading={isUpdatingTask}
                size="xs"
                disabled={newCompletedUnits < 1}
              >
                Done
              </SubmitButton>
            </HStack>
          </Form>
        </Box>
      </Card.Body>
    </Card.Root>
  );
};

export default RecordCustomUnit;
