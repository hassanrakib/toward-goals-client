"use client";

import StyledButton from "@/components/derived-ui/styled-button";
import StyledProgressBar from "@/components/derived-ui/styled-progress";
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "@/components/ui/progress-circle";
import { toaster } from "@/components/ui/toaster";
import {
  useCreateTimeSpanMutation,
  useUpdateTaskMutation,
} from "@/redux/features/task/task.api";
import { ITask, TimeSpanCreationData } from "@/types/task";
import { getPercentage } from "@/utils/global";
import { getActiveDifficulty, getDifficultyColor } from "@/utils/habit";
import { Badge, Card, Stack, Text } from "@chakra-ui/react";
import { secondsToMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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

  // show timer
  // startTime of the timer
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [newCompletedDurationInSec, setNewCompletedDurationInSec] = useState(0);

  // get the duration in minute
  const newCompletedDurationInMin = secondsToMinutes(newCompletedDurationInSec);
  // remaining seconds after completed minutes
  const newDurationRemainingSeconds = newCompletedDurationInSec % 60;

  // total completed duration in minute new and prev
  const totalCompletedDurationInMin = useMemo(
    () => prevCompletedDurationInMin + newCompletedDurationInMin,
    [prevCompletedDurationInMin, newCompletedDurationInMin]
  );

  // prevCompletedDurationInMin + current completed duration in minute + remaining seconds in min
  const totalCompletedDurationInMinWithRemainingSec =
    totalCompletedDurationInMin + newDurationRemainingSeconds / 60;

  // get active difficulty (even after starting the timer)
  const activeDifficulty = useMemo(
    () => getActiveDifficulty(difficulties, totalCompletedDurationInMin),
    [difficulties, totalCompletedDurationInMin]
  );

  // active difficulty color
  const activeDifficultyColor = useMemo(
    () => getDifficultyColor(activeDifficulty.name),
    [activeDifficulty.name]
  );

  // get active difficulty completion
  // as totalCompletedDurationInMinWithRemainingSec can be greater than current difficulty requirement
  // we are handling it here
  const activeDifficultyCompletion =
    totalCompletedDurationInMinWithRemainingSec > activeDifficulty.requirement
      ? activeDifficulty.requirement
      : totalCompletedDurationInMinWithRemainingSec;

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
          // show a ui feedback
          toaster.create({
            type: "info",
            description: `${newCompletedDurationInMin} minute worked`,
          });

          // refresh the current route
          router.refresh();

          // reset the state
          setNewCompletedDurationInSec(0);
        }
      }
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
        <StyledProgressBar
          // width equals to the progress bar (filled part) within the progress container
          progressPercentage={`${getPercentage(activeDifficultyCompletion, activeDifficulty.requirement)}%`}
          // progress bar label
          label={`${totalCompletedDurationInMin}/${activeDifficulty.requirement} ${unit.name}`}
          // label will be shown on the top of the progress bar
          labelPosition="top"
          // max value for progress bar
          max={activeDifficulty.requirement}
          value={activeDifficultyCompletion}
          barColorPalette={activeDifficultyColor}
          animated={startTime ? true : false}
          size="xl"
        />
        {/* see current completed duration + start timer + add completed duration */}
        <Stack alignSelf="center" direction="row" alignItems="center">
          <Badge size="lg" variant="outline" rounded="xl">
            {/* show an animated  spinner when startTime is set */}
            <ProgressCircleRoot
              key={startTime ? "animated" : "static"}
              value={startTime ? null : undefined}
              size="xs"
            >
              <ProgressCircleRing />
            </ProgressCircleRoot>
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
            >
              Done
            </StyledButton>
          ) : (
            // start the timer by setting startTime
            <StyledButton onClick={() => setStartTime(new Date())} size="xs">
              Start
            </StyledButton>
          )}
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default RecordTimeUnit;
