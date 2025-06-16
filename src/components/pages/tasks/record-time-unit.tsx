"use client";

import StyledButton from "@/components/derived-ui/styled-button";
import StyledProgressBar from "@/components/derived-ui/styled-progress";
import { toaster } from "@/components/ui/toaster";
import {
  useCreateTimeSpanMutation,
  useUpdateTaskMutation,
} from "@/redux/features/task/task.api";
import { ITask, TimeSpanCreationData } from "@/types/task";
import { getPercentage } from "@/utils/global";
import { getActiveDifficulty, getDifficultyColor } from "@/utils/habit";
import { Badge, Card, Spinner, Stack, Text } from "@chakra-ui/react";
import { differenceInSeconds, secondsToMinutes } from "date-fns";
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
  const [createTimeSpan, { isLoading: isCreatingTimeSpan }] =
    useCreateTimeSpanMutation();

  // handler to update task's completedUnits
  const [updateTask, { isLoading: isUpdatingCompletedUnits }] =
    useUpdateTaskMutation();

  // show stopwatch
  // startTime of the stopwatch
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

  // run the stopwatch
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;

    // if startTime is set & not doing any of the mutations
    // then you keep running the stopwatch
    if (!isCreatingTimeSpan && !isUpdatingCompletedUnits && startTime) {
      // set an interval that sets the duration state every 1s
      intervalId = setInterval(() => {
        // get the differnce in seconds from the startTime to the current time
        // and set the state setNewCompletedDurationInSec
        setNewCompletedDurationInSec(
          differenceInSeconds(new Date(), startTime)
        );
      }, 1000);
    }

    // clear the interval before unmounting
    return () => clearInterval(intervalId);
  }, [startTime, isCreatingTimeSpan, isUpdatingCompletedUnits]);

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
          // set startTime to null to stop the timer
          // stopping the timer stops setting newCompletedDurationInSec state
          setStartTime(null);
          // reset the state newCompletedDurationInSec
          setNewCompletedDurationInSec(0);

          // refresh the current route
          router.refresh();

          // show a ui feedback
          toaster.create({
            type: "info",
            description: `${newCompletedDurationInMin} minute worked`,
          });
        }
      }
    }
  };

  return (
    <Card.Root rounded="2xl" border="2px dashed" borderColor="yellow.500">
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
        {/* see current completed duration + start stopwatch + add completed duration */}
        {/* don't render when the task is completed */}
        {!task.isCompleted && (
          <Stack alignSelf="center" direction="row" alignItems="center">
            <Badge size="lg" variant="outline" rounded="xl">
              {/* show an animated  spinner when startTime is set */}
              {startTime && <Spinner size="xs" />}
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
                loading={isCreatingTimeSpan || isUpdatingCompletedUnits}
                loadingText="Saving..."
              >
                Done
              </StyledButton>
            ) : (
              // start the timer by setting startTime
              <StyledButton
                disabled={task.isCompleted}
                onClick={() => setStartTime(new Date())}
                size="xs"
              >
                Start
              </StyledButton>
            )}
          </Stack>
        )}
      </Card.Body>
    </Card.Root>
  );
};

export default RecordTimeUnit;
