import {
  ProgressBar,
  ProgressLabel,
  ProgressRoot,
} from "@/components/ui/progress";
import { HabitUnitType } from "@/types/habit";
import { getPercentage } from "@/utils/global";
import { HStack, VStack } from "@chakra-ui/react";
import RecordCustomUnit from "./record-custom-unit";
import { ITask } from "@/types/task";
import RecordTimeUnit from "./record-time-unit";

const HabitDifficultiesProgress = ({ task }: { task: ITask }) => {
  // destructure difficulties, habit unit & completedUnits
  const {
    habit: { difficulties, unit },
    completedUnits,
  } = task;

  // get color of progress bar based on difficulty level
  function getDifficultyColorPalette(difficulty: string) {
    switch (difficulty) {
      case "mini":
        return "green";
      case "plus":
        return "purple";
      case "elite":
        return "red";
      default:
        return "gray";
    }
  }

  // show action button only to the first difficulty
  // whose requirement is greater than the completedUnits
  let difficultyToShowActionButton = "";
  // setter function for difficultyToShowActionButton
  function setDifficultyToShowActionButton(
    difficulty: string,
    difficultyRequirement: number,
    completedUnits: number
  ) {
    if (
      !difficultyToShowActionButton &&
      completedUnits < difficultyRequirement
    ) {
      difficultyToShowActionButton = difficulty;
    }
  }

  // clone of difficulties object
  const difficultiesClone = { ...difficulties };
  // delete _id from difficultiesClone
  delete difficultiesClone._id;

  return (
    <VStack align="stretch" gap="2">
      {Object.keys(difficultiesClone).map((difficulty) => {
        // difficulty requirement
        const difficultyRequirement =
          difficultiesClone[difficulty as keyof typeof difficultiesClone];

        // assign difficultyToShowActionButton variable
        setDifficultyToShowActionButton(
          difficulty,
          Number(difficultyRequirement),
          completedUnits
        );

        return (
          <HStack justify="space-between" key={difficulty}>
            {/* progress bar */}
            <ProgressRoot
              max={Number(difficultyRequirement)}
              // ProgressRoot value can not be greater than max
              // as completedUnits can be greater than current difficulty requirement
              // we are handling it here
              value={
                completedUnits > Number(difficultyRequirement)
                  ? Number(difficultyRequirement)
                  : completedUnits
              }
              variant="outline"
              position="relative"
              colorPalette={getDifficultyColorPalette(difficulty)}
              size="lg"
              flexGrow="1"
              shape="full"
              striped
            >
              {/* progress label */}
              <ProgressLabel
                position="absolute"
                left="0"
                top="0"
                zIndex="1"
                lineHeight="1"
                fontSize="12px"
                fontWeight="300"
                px="2"
                // width can become 0% also it can become greater than 100%
                // because completedUnits can be 0 or greater than the difficulty level
                // that's why minW & maxW given
                minW="max-content"
                maxW="100%"
                // width equals to the progress bar (filled part) within the progress container
                width={`${getPercentage(completedUnits, Number(difficultyRequirement))}%`}
                display="flex"
                // align the text to the end of the progress bar (filled part)
                justifyContent="flex-end"
              >
                {`${difficulty} ${completedUnits > Number(difficultyRequirement) ? difficultyRequirement : completedUnits}/${difficultyRequirement} ${unit.name}`}
              </ProgressLabel>
              <ProgressBar />
            </ProgressRoot>
            {/* action button */}
            {difficulty === difficultyToShowActionButton ? (
              unit.type === HabitUnitType.Custom ? (
                <RecordCustomUnit
                  task={task}
                  difficultyColorPalette={getDifficultyColorPalette(difficulty)}
                />
              ) : (
                <RecordTimeUnit
                  task={task}
                  difficultyColorPalette={getDifficultyColorPalette(difficulty)}
                />
              )
            ) : null}
          </HStack>
        );
      })}
    </VStack>
  );
};

export default HabitDifficultiesProgress;
