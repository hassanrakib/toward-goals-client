import { Avatar } from "@/components/ui/avatar";
import { ITask } from "@/types/task";
import { getTimeAgo } from "@/utils/task/getTimeAgo";
import {
  Box,
  Card,
  Circle,
  Float,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import HabitDifficultiesProgress from "./habit-difficulties-progress";
import TimeSpans from "./time-spans";
import StatusLabels from "./status-labels";
import { getMyGoalProgressLevel } from "@/services/progress/goal-progress";

const Task = async ({ task }: { task: ITask }) => {
  // destructure necessary props
  const {
    goal,
    user: { username },
    description,
    createdAt,
  } = task;

  // get the level of the goal
  const goalProgressLevel = await getMyGoalProgressLevel(goal);

  return (
    <Card.Root maxW="xl" mx="auto">
      <Card.Body>
        <HStack mb="3" gap="3">
          {/* showing avatar with task goal level */}
          <Box display="inline-block" position="relative">
            <Avatar
              src="https://images.unsplash.com/photo-1511806754518-53bada35f930"
              name={username}
            />
            <Float placement="bottom-end" offset="1.5">
              <Circle size="5" bg="bg">
                <Text color="black" fontWeight="bold" fontSize="14px">
                  {goalProgressLevel.data?.level}
                </Text>
              </Circle>
            </Float>
          </Box>
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
          {/* description is an html string */}
          <div
            className="task"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {/* show time spans */}
          <TimeSpans taskId={task._id} />
          {/* show task progress */}
          <HabitDifficultiesProgress task={task} />
          {/* show completed, deadline, extra unit status */}
          <StatusLabels task={task} />
        </VStack>
      </Card.Body>
      {/* add footer here */}
    </Card.Root>
  );
};

export default Task;
