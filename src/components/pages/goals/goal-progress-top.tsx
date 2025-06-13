import AvatarWithLevel from "@/components/shared/avatar-with-level";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Calendar, Gem } from "lucide-react";
import GoalLevel from "./goal-level";
import { IGoalProgress } from "@/types/progress";
import GoalCompletedStatus from "./goal-completed-status";
import DurationInfo from "@/components/shared/duration-info";
import { addDays } from "date-fns";

const GoalProgressTop = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  // destructuring properties from the goal progress
  const { goal, user } = goalProgress;
  return (
    <Box
      position="relative"
      h="220px"
      w="full"
      rounded="xl"
      overflow="hidden"
      bgImg={`url(${goal.image ? goal.image : "/images/goal-bg.webp"})`}
      backgroundSize="cover"
      backgroundPosition="center"
      _after={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(4px)",
        zIndex: 0,
      }}
    >
      {/* Gem icon with points */}
      <Box
        color="white"
        display="flex"
        alignItems="center"
        spaceX="2"
        position="absolute"
        top="4"
        right="4"
        zIndex="1"
      >
        <Text fontSize="xl" fontWeight="bold">
          {goalProgress.points}
        </Text>
        <Gem />
      </Box>
      <VStack
        alignItems="stretch"
        position="absolute"
        left="3"
        bottom="2"
        right="2"
        zIndex="1"
        gap="unset"
      >
        {/* Goal Title + Goal Starting date or ending in days */}
        <VStack color="white" alignItems="stretch" gap="unset">
          <Box>
            <Heading display="inline" size="2xl" mr="2">
              {goal.title}
            </Heading>
            {/* show completed badge or mark goal completed */}
            <GoalCompletedStatus goalProgress={goalProgress} />
          </Box>
          <Flex color="gray.300" alignItems="center" spaceX="1">
            <Calendar size="16" />
            <DurationInfo
              startDate={goal.startDate}
              endDate={addDays(goal.startDate, goal.duration).toISOString()}
              fontSize="sm"
              fontWeight="medium"
            />
          </Flex>
        </VStack>
        <Flex alignItems="center">
          {/* show avatar with level */}
          <AvatarWithLevel
            size="lg"
            username={user.username}
            goalId={goal._id}
          />
          {/* goal level */}
          <GoalLevel goalProgress={goalProgress} />
        </Flex>
      </VStack>
    </Box>
  );
};

export default GoalProgressTop;
