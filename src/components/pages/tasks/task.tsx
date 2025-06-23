import { ITask } from "@/types/task";
import { getTimeAgo } from "@/utils/task";
import {
  Box,
  Card,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import HabitDifficultiesProgress from "./habit-difficulties-progress";
import TimeSpans from "./time-spans";
import StatusLabels from "./status-labels";
import AvatarWithLevel from "@/components/shared/avatar-with-level";
import { HabitUnitType } from "@/types/habit";
import RecordCustomUnit from "./record-custom-unit";
import RecordTimeUnit from "./record-time-unit";

const Task = async ({ task }: { task: ITask }) => {
  // destructure necessary props
  const {
    goal,
    habit: { unit },
    user: { username },
    title,
    description,
    createdAt,
  } = task;

  return (
    <Card.Root>
      <Card.Body>
        <HStack mb="3" gap="3">
          {/* showing avatar with task goal level */}
          <AvatarWithLevel username={username} goalId={goal} />
          <Stack gap="0">
            <Text fontWeight="semibold" fontSize="15px">
              @{username}
            </Text>
            <Text color="fg.muted" fontSize="13px">
              {getTimeAgo(createdAt)}
            </Text>
          </Stack>
        </HStack>
        <VStack alignItems="stretch">
          {/* show the title */}
          <Heading
            size="xl"
            _before={{
              content: '"#"',
              color: "#666",
              marginRight: "0.25rem",
              fontWeight: "normal",
            }}
          >
            {title}
          </Heading>
          {/* description is an html string */}
          <div
            className="task"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {/* show time spans */}
          <TimeSpans taskId={task._id} />
          {/* show task progress */}
          <HabitDifficultiesProgress task={task} />
          {/* show option to record work unit */}
          <Box mt="2">
            {unit.type === HabitUnitType.Custom ? (
              <RecordCustomUnit task={task} />
            ) : (
              <RecordTimeUnit task={task} />
            )}
          </Box>
        </VStack>
      </Card.Body>
      <Card.Footer>
        {/* show completed, deadline, extra unit status */}
        <StatusLabels task={task} />
      </Card.Footer>
    </Card.Root>
  );
};

export default Task;
