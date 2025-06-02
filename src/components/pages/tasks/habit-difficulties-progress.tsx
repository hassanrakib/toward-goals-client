import { HabitDifficultiesName } from "@/types/habit";
import { capitalizeFirstLetter, getPercentage } from "@/utils/global";
import { VStack } from "@chakra-ui/react";
import { ITask } from "@/types/task";
import { getDifficultyColorPalette } from "@/utils/habit";
import StyledProgressBar from "@/components/derived-ui/styled-progress";

const HabitDifficultiesProgress = ({ task }: { task: ITask }) => {
  // destructure difficulties & completedUnits
  const {
    habit: { difficulties },
    completedUnits,
  } = task;

  return (
    <VStack align="stretch">
      {Object.keys(difficulties).map((difficulty) => {
        // difficulty requirement
        const difficultyRequirement =
          difficulties[difficulty as HabitDifficultiesName];

        // current difficulty completion
        // as completedUnits can be greater than current difficulty requirement
        // we are handling it here
        const currentDifficultyCompletion =
          completedUnits > difficultyRequirement
            ? difficultyRequirement
            : completedUnits;

        return (
          /* progress bar */
          <StyledProgressBar
            key={difficulty}
            labelPosition="inline"
            // width equals to the progress bar (filled part) within the progress container
            progressPercentage={`${getPercentage(currentDifficultyCompletion, difficultyRequirement)}%`}
            // progress bar label
            label={capitalizeFirstLetter(difficulty)}
            // progress bar max value
            max={difficultyRequirement}
            value={currentDifficultyCompletion}
            colorPalette={getDifficultyColorPalette(
              difficulty as HabitDifficultiesName
            )}
          />
        );
      })}
    </VStack>
  );
};

export default HabitDifficultiesProgress;
