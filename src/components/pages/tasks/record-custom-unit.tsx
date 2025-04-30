"use client";

import Form from "@/components/derived-ui/form";
import StyledDialog from "@/components/derived-ui/styled-dialog";
import StyledNumberInput from "@/components/derived-ui/styled-number-input";
import StyledProgressBar from "@/components/derived-ui/styled-progress";
import SubmitButton from "@/components/derived-ui/submit-button";
import { ITask } from "@/types/task";
import { getPercentage } from "@/utils/global";
import { getActiveDifficulty, getDifficultyColorPalette } from "@/utils/task";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Check, CirclePlus } from "lucide-react";
import { useState } from "react";

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

  // state for form input controlling
  const [newCompletedUnits, setNewCompletedUnits] = useState(0);

  // calculate totalCompletedUnit
  const totalCompletedUnit = completedUnits + newCompletedUnits;

  // get active difficulty
  const activeDifficulty = getActiveDifficulty(
    difficulties,
    totalCompletedUnit
  );

  // get active difficulty color palet
  const activeDifficultyColorPalette = getDifficultyColorPalette(
    activeDifficulty.name
  );

  // form submit handler
  const onSubmit = async (data: IFormValues) => {
    console.log(data);
  };

  return (
    <StyledDialog
      triggerElement={
        // trigger the popover
        <Box cursor="pointer">
          <CirclePlus size="18px" color={activeDifficultyColorPalette} />
        </Box>
      }
      // know when the close trigger button clicked
      onCloseTrigger={() => {
        // stop the timer before the dialog closes
        setNewCompletedUnits(0);
      }}
    >
      <VStack alignItems="stretch">
        <Text fontSize="2xl" textAlign="center" mb="4">
          Do your best!
        </Text>
        {/* progress bar */}
        <StyledProgressBar
          // width equals to the progress bar (filled part) within the progress container
          barWidthInContainer={`${getPercentage(totalCompletedUnit, activeDifficulty.requirement)}%`}
          // progress bar label
          label={`${activeDifficulty.name} ${totalCompletedUnit > activeDifficulty.requirement ? activeDifficulty.requirement : totalCompletedUnit}/${activeDifficulty.requirement} ${unit.name}`}
          // label will be shown on the top of the progress bar
          labelPosition="top"
          // max value for progress bar
          max={activeDifficulty.requirement}
          // ProgressRoot value can not be greater than max
          // as totalCompletedUnit can be greater than current difficulty requirement
          // we are handling it here
          value={
            totalCompletedUnit > activeDifficulty.requirement
              ? activeDifficulty.requirement
              : totalCompletedUnit
          }
          colorPalette={activeDifficultyColorPalette}
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
                unit={unit.name}
                onNumberInputChange={(value) => {
                  setNewCompletedUnits(value);
                }}
              />
              <SubmitButton
                isServerActionLoading={false}
                size="xs"
                bgColor={activeDifficultyColorPalette}
              >
                <Check />
              </SubmitButton>
            </HStack>
          </Form>
        </Box>
      </VStack>
    </StyledDialog>
  );
};

export default RecordCustomUnit;
