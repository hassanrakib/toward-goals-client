"use client";

import StyledButton from "@/components/derived-ui/styled-button";
import StyledPopover, {
  PopoverCloseTrigger,
} from "@/components/derived-ui/styled-popover";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import { ITask } from "@/types/task";
import { Box, Stack } from "@chakra-ui/react";
import { formatDuration, intervalToDuration } from "date-fns";
import { Check, Timer } from "lucide-react";
import { useEffect, useState } from "react";

const RecordTimeUnit = ({
  task,
  difficultyColorPalette,
}: {
  task: ITask;
  difficultyColorPalette: string;
}) => {
  const { _id: taskId } = task;

  // show timer
  // startTime of the timer
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [duration, setDuration] = useState("0 second");

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    // if startTime is set by the user means timer is running
    if (startTime) {
      // set an interval that sets the duration state every 1s
      intervalId = setInterval(() => {
        setDuration(
          formatDuration(
            intervalToDuration({ start: startTime, end: new Date() })
          )
        );
      }, 1000);
    }

    // clear the interval before unmounting
    return () => clearInterval(intervalId);
  }, [startTime]);

  // record newly completed time unit
  const recordCompletedTimeUnit = () => {
    // do the updating operation here
    // don't forget workedTimeSpan

    // stop the timer
    setStartTime(null);
    setDuration("");
  };

  return (
    <StyledPopover
      triggerElement={
        // trigger the popover + start the timer
        <Box cursor="pointer" onClick={() => setStartTime(new Date())}>
          <Timer size="18px" color={difficultyColorPalette} />
        </Box>
      }
      closeOnInteractOutside={false}
      modal
    >
      <Stack direction="row" alignItems="center">
        {/* show a spinner spinning indefinitely */}
        <ProgressCircleRoot
          value={null}
          size="xs"
          colorPalette={difficultyColorPalette}
          animationDuration="slowest"
        >
          <ProgressCircleRing />
        </ProgressCircleRoot>
        <Box flex="1">{duration}</Box>
        <PopoverCloseTrigger>
          <StyledButton
            onClick={recordCompletedTimeUnit}
            size="xs"
          >
            <Check />
          </StyledButton>
        </PopoverCloseTrigger>
      </Stack>
    </StyledPopover>
  );
};

export default RecordTimeUnit;
