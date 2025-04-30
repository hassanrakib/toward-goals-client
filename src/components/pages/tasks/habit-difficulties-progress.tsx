import { HabitDifficultiesName, HabitUnitType } from "@/types/habit";
import { getPercentage } from "@/utils/global";
import { HStack, VStack } from "@chakra-ui/react";
import RecordCustomUnit from "./record-custom-unit";
import { ITask } from "@/types/task";
import RecordTimeUnit from "./record-time-unit";
import { getActiveDifficulty, getDifficultyColorPalette } from "@/utils/task";
import StyledProgressBar from "@/components/derived-ui/styled-progress";

const HabitDifficultiesProgress = ({ task }: { task: ITask }) => {
  // destructure difficulties, habit unit & completedUnits
  const {
    habit: { difficulties, unit },
    completedUnits,
  } = task;

  const activeDifficulty = getActiveDifficulty(difficulties, completedUnits);

  return (
    <VStack align="stretch" gap="2">
      {Object.keys(difficulties).map((difficulty) => {
        // difficulty requirement
        const difficultyRequirement =
          difficulties[difficulty as HabitDifficultiesName];

        return (
          <HStack justify="space-between" key={difficulty}>
            {/* progress bar */}
            <StyledProgressBar
              // width equals to the progress bar (filled part) within the progress container
              barWidthInContainer={`${getPercentage(completedUnits, difficultyRequirement)}%`}
              // progress bar label
              label={`${difficulty} ${completedUnits > difficultyRequirement ? difficultyRequirement : completedUnits}/${difficultyRequirement} ${unit.name}`}
              // progress bar max value
              max={difficultyRequirement}
              // ProgressRoot value can not be greater than max
              // as completedUnits can be greater than current difficulty requirement
              // we are handling it here
              value={
                completedUnits > difficultyRequirement
                  ? difficultyRequirement
                  : completedUnits
              }
              colorPalette={getDifficultyColorPalette(
                difficulty as HabitDifficultiesName
              )}
              flex="1"
            />
            {/* action button */}
            {difficulty === activeDifficulty.name ? (
              unit.type === HabitUnitType.Custom ? (
                <RecordCustomUnit task={task} />
              ) : (
                <RecordTimeUnit task={task} />
              )
            ) : null}
          </HStack>
        );
      })}
    </VStack>
  );
};

export default HabitDifficultiesProgress;
