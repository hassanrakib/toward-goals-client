import AvatarWithLevel from "@/components/shared/avatar-with-level";
import { Badge, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { addDays, differenceInDays, format, isAfter } from "date-fns";
import { Calendar, Circle, CircleCheckBig, Gem } from "lucide-react";
import GoalLevel from "./goal-level";
import { IGoalProgress } from "@/types/progress";

const GoalProgressTop = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  // destructuring properties from the goal progress
  const { goal, user, isCompleted } = goalProgress;
  return (
    <Box
      position="relative"
      h="220px"
      w="full"
      rounded="xl"
      overflow="hidden"
      bgImg={`url(${goal.image ? goal.image : "/images/goal-progress-cover.jpg"})`}
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
        left="4"
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
            {/* show completed badge */}
            {isCompleted ? (
              <Badge
                variant="solid"
                rounded="2xl"
                size="sm"
                colorPalette="green"
              >
                <CircleCheckBig size="12" />
                Completed
              </Badge>
            ) : (
              <Badge
                variant="surface"
                rounded="2xl"
                size="sm"
                colorPalette="yellow"
                cursor="pointer"
              >
                <Circle size="12" />
                Mark Completed
              </Badge>
            )}
          </Box>
          <Flex color="gray.300" alignItems="center" spaceX="1">
            <Calendar size="16" />
            <Text fontSize="sm" fontWeight="medium">
              {isAfter(new Date(), goal.startDate)
                ? `Ends in ${goal.duration - differenceInDays(new Date(), goal.startDate)} days (${format(addDays(goal.startDate, goal.duration), "PPpp")})`
                : `Starting on ${format(goal.startDate, "PPpp")}`}
            </Text>
          </Flex>
        </VStack>
        <Flex alignItems="center" spaceX="2">
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
