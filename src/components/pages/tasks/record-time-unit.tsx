"use client";

import StyledButton from "@/components/derived-ui/styled-button";
import StyledDialog from "@/components/derived-ui/styled-dialog";
import StyledProgressBar from "@/components/derived-ui/styled-progress";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import { toaster } from "@/components/ui/toaster";
import { useCreateTimeSpanMutation } from "@/redux/features/task/task.api";
import { ITask, TimeSpanCreationData } from "@/types/task";
import { getPercentage } from "@/utils/global";
import { getActiveDifficulty, getDifficultyColorPalette } from "@/utils/task";
import { Badge, Box, Stack, Text, VStack } from "@chakra-ui/react";
import { format, secondsToMinutes } from "date-fns";
import { Check, Plus, Timer } from "lucide-react";
import { useEffect, useState } from "react";

const RecordTimeUnit = ({ task }: { task: ITask }) => {
  // destructure
  const {
    _id: taskId,
    completedUnits,
    habit: { difficulties, unit },
  } = task;

  // rtk query
  // create time span mutation
  const [
    createTimeSpan,
    { isLoading: isCreatingTimeSpan, error: createTimeSpanError },
  ] = useCreateTimeSpanMutation();

  // show timer
  // startTime of the timer
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [durationInSeconds, setDurationInSeconds] = useState(0);

  // get the duration in minute
  const durationInCompletedMinute = secondsToMinutes(durationInSeconds);
  // remaining seconds after completed minutes
  const remainingSeconds = durationInSeconds % 60;

  // completedUnits + current completed duration in minute
  const totalCompletedDuration =
    completedUnits + durationInCompletedMinute + remainingSeconds / 60;

  // get active difficulty (even after starting the timer)
  const activeDifficulty = getActiveDifficulty(
    difficulties,
    totalCompletedDuration
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
        setDurationInSeconds((prev) => prev + 1);
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

      // if durationInCompletedMinute is less than 1
      // we will not do any operation
      if (durationInCompletedMinute < 1) {
        toaster.create({ type: "info", title: "Hey, don't quit!" });
        return;
      }

      // stop the timer
      setStartTime(null);
      setDurationInSeconds(0);

      //if more than 1 minute worked

      // create time span for the task
      const result = await createTimeSpan(timeSpan);

      // if successfully added time span
      if (result.data?.data) {
        toaster.create({
          type: "success",
          description: `From ${format(startTime, "h:mm a")} - ${format(endTime, "h:mm a")} => ${durationInCompletedMinute} minute worked.`,
          duration: 6000,
        });
      }
    }
  };

  return (
    <StyledDialog
      triggerElement={
        // trigger the popover
        <Box cursor="pointer">
          <Timer size="18px" color={activeDifficultyColorPalette} />
        </Box>
      }
      // know when the close trigger button clicked
      onCloseTrigger={() => {
        // stop the timer before the dialog closes
        setStartTime(null);
        setDurationInSeconds(0);
      }}
    >
      <VStack alignItems="stretch">
        <Text fontSize="2xl" textAlign="center" mb="4">
          {startTime
            ? `Started @${format(startTime, "p")}`
            : `Not yet started!`}
        </Text>
        {/* progress bar */}
        <StyledProgressBar
          // width equals to the progress bar (filled part) within the progress container
          barWidthInContainer={`${getPercentage(totalCompletedDuration, activeDifficulty.requirement)}%`}
          // progress bar label
          label={`${activeDifficulty.name} ${totalCompletedDuration > activeDifficulty.requirement ? activeDifficulty.requirement : durationInCompletedMinute}/${activeDifficulty.requirement} ${unit.name}`}
          // label will be shown on the top of the progress bar
          labelPosition="top"
          // max value for progress bar
          max={activeDifficulty.requirement}
          // ProgressRoot value can not be greater than max
          // as totalCompletedDuration can be greater than current difficulty requirement
          // we are handling it here
          value={
            totalCompletedDuration > activeDifficulty.requirement
              ? activeDifficulty.requirement
              : totalCompletedDuration
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
              {durationInCompletedMinute} minute {remainingSeconds} seconds
            </Text>
          </Badge>

          {/* if startTime, allow to update task */}
          {startTime ? (
            <StyledButton
              onClick={() => recordCompletedTimeUnit(new Date())}
              // keep the button disabled if duration is less than 1 minute
              disabled={durationInCompletedMinute < 1}
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
    </StyledDialog>
  );
};

export default RecordTimeUnit;
