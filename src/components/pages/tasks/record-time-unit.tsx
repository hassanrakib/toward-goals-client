"use client";

import StyledButton from "@/components/derived-ui/styled-button";
import StyledDialog from "@/components/derived-ui/styled-dialog";
import StyledProgressBar from "@/components/derived-ui/styled-progress";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import {
  useCreateTimeSpanMutation,
  useUpdateTaskMutation,
} from "@/redux/features/task/task.api";
import { ITask, TimeSpanCreationData } from "@/types/task";
import { getPercentage } from "@/utils/global";
import { getActiveDifficulty, getDifficultyColorPalette } from "@/utils/habit";
import { Badge, Box, Stack, Text, VStack } from "@chakra-ui/react";
import { format, secondsToMinutes } from "date-fns";
import { Check, Plus, Timer } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RecordTimeUnit = ({ task }: { task: ITask }) => {
  // router from next/navigation
  const router = useRouter();

  // destructure
  const {
    _id: taskId,
    completedUnits: prevCompletedDurationInMin,
    habit: { difficulties, unit },
  } = task;

  // rtk query
  // create time span mutation
  const [createTimeSpan] = useCreateTimeSpanMutation();

  // handler update completedUnits
  const [updateTask] = useUpdateTaskMutation();

  // dialog component is not unmounting
  // so it preservs the isSuccessful state of useUpdateTaskMutation() hook
  // this state will help us to set and reset whenever needed
  const [isTaskUpdateSuccessful, setIsTaskUpdateSuccessful] = useState(false);

  // show timer
  // startTime of the timer
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [newCompletedDurationInSec, setNewCompletedDurationInSec] = useState(0);

  // get the duration in minute
  const newCompletedDurationInMin = secondsToMinutes(newCompletedDurationInSec);
  // remaining seconds after completed minutes
  const newDurationRemainingSeconds = newCompletedDurationInSec % 60;

  // total completed duration in minute new and prev
  const totalCompletedDurationInMin =
    prevCompletedDurationInMin + newCompletedDurationInMin;

  // prevCompletedDurationInMin + current completed duration in minute + remaining seconds in min
  const totalCompletedDurationInMinWithRemainingSec =
    prevCompletedDurationInMin +
    newCompletedDurationInMin +
    newDurationRemainingSeconds / 60;

  // get active difficulty (even after starting the timer)
  const activeDifficulty = getActiveDifficulty(
    difficulties,
    totalCompletedDurationInMinWithRemainingSec
  );
  // active difficulty color palette
  const activeDifficultyColorPalette = getDifficultyColorPalette(
    activeDifficulty.name
  );

  // run the timer
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    // if startTime is set by the user means timer is running
    if (startTime) {
      // set an interval that sets the duration state every 1s
      intervalId = setInterval(() => {
        setNewCompletedDurationInSec((prev) => prev + 1);
      }, 1000);
    }

    // clear the interval before unmounting
    return () => clearInterval(intervalId);
  }, [startTime]);

  // record newly completed time unit
  const recordCompletedTimeUnit = async (endTime: Date) => {
    // condition to tell typescript that startTime is not null
    if (startTime) {
      // timespan creation data
      const timeSpan: TimeSpanCreationData = {
        task: taskId,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      };

      // stop the timer
      setStartTime(null);

      // if newCompletedDurationInMin is less than 1
      // we will not do any operation
      if (newCompletedDurationInMin < 1) {
        return;
      }

      //if more than 1 minute worked

      // create time span for the task
      const result = await createTimeSpan(timeSpan);

      // if successfully added time span
      if (result.data?.data) {
        // update completedUnits property
        const updatedTask = await updateTask({
          taskId,
          newCompletedUnits: newCompletedDurationInMin,
        });

        // if successfully updated completedUnits
        if (updatedTask.data?.data) {
          // set isTaskUpdateSuccessful to true
          setIsTaskUpdateSuccessful(true);
        }
      }
    }
  };

  return (
    <StyledDialog
      triggerElement={
        // trigger the dialog
        <Box cursor="pointer">
          <Timer size="18px" color={activeDifficultyColorPalette} />
        </Box>
      }
      // know when the close trigger completed
      onExitComplete={() => {
        // stop the timer before the dialog closes
        setStartTime(null);
        // clear the states
        setNewCompletedDurationInSec(0);
        // refresh the current route
        if (isTaskUpdateSuccessful) {
          setIsTaskUpdateSuccessful(false);
          router.refresh();
        }
      }}
    >
      {/* if successfully updated the task */}
      {isTaskUpdateSuccessful && (
        <Text
          fontSize="2xl"
          textAlign="center"
        >{`Congrats! ${newCompletedDurationInMin} minute worked.`}</Text>
      )}
      {/* is task not updated */}
      {!isTaskUpdateSuccessful && (
        <VStack alignItems="stretch">
          <Text fontSize="2xl" textAlign="center" mb="4">
            {`Started at @${startTime ? format(startTime, "p") : ""}`}
          </Text>
          {/* progress bar */}
          <StyledProgressBar
            // width equals to the progress bar (filled part) within the progress container
            barWidthInContainer={`${getPercentage(totalCompletedDurationInMinWithRemainingSec, activeDifficulty.requirement)}%`}
            // progress bar label
            label={`${activeDifficulty.name} ${totalCompletedDurationInMinWithRemainingSec > activeDifficulty.requirement ? activeDifficulty.requirement : totalCompletedDurationInMin}/${activeDifficulty.requirement} ${unit.name}`}
            // label will be shown on the top of the progress bar
            labelPosition="top"
            // max value for progress bar
            max={activeDifficulty.requirement}
            // ProgressRoot value can not be greater than max
            // as totalCompletedDurationInMinWithRemainingSec can be greater than current difficulty requirement
            // we are handling it here
            value={
              totalCompletedDurationInMinWithRemainingSec >
              activeDifficulty.requirement
                ? activeDifficulty.requirement
                : totalCompletedDurationInMinWithRemainingSec
            }
            colorPalette={activeDifficultyColorPalette}
            animated={startTime ? true : false}
            size="xl"
          />
          {/* see current completed duration + start timer + add completed duration */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spaceX="2"
          >
            <Badge
              size="lg"
              variant="subtle"
              colorPalette={activeDifficultyColorPalette}
            >
              {/* show an animated  spinner when startTime is set */}
              <ProgressCircleRoot
                key={startTime ? "animated" : "static"}
                value={startTime ? null : undefined}
                animationDuration="1s"
                size="xs"
                colorPalette={activeDifficultyColorPalette}
              >
                <ProgressCircleRing />
              </ProgressCircleRoot>
              {/* plus icon */}
              <Plus />
              {/* show current completed duration */}
              <Text>
                {newCompletedDurationInMin} minute {newDurationRemainingSeconds}{" "}
                seconds
              </Text>
            </Badge>

            {/* if startTime, allow to update task */}
            {startTime ? (
              <StyledButton
                onClick={() => recordCompletedTimeUnit(new Date())}
                // keep the button disabled if duration is less than 1 minute
                disabled={newCompletedDurationInMin < 1}
                size="xs"
                bgColor={activeDifficultyColorPalette}
              >
                <Check />
              </StyledButton>
            ) : (
              // start the timer by setting startTime
              <StyledButton
                onClick={() => setStartTime(new Date())}
                size="xs"
                bgColor={activeDifficultyColorPalette}
              >
                <Timer />
              </StyledButton>
            )}
          </Stack>
        </VStack>
      )}
    </StyledDialog>
  );
};

export default RecordTimeUnit;
