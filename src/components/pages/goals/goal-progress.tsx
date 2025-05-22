import { IGoalProgress } from "@/types/progress";
import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CircleCheckBig, Circle, Gem, Calendar } from "lucide-react";
import {
  differenceInDays,
  format,
  isAfter,
  startOfDay,
  startOfToday,
} from "date-fns";
import HabitCompletionsChart from "./habit-completions-chart";
import CurrentWorkStreak from "./current-work-streak";
import SkippedVsWorkedDays from "./skipped-vs-worked-days";
import TodosDeadlines from "./todos-deadlines";
import Analytics from "./analytics";
import AvatarWithLevel from "@/components/shared/avatar-with-level";

const GoalProgress = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  // destructuring properties from the goal progress
  const { goal, user, isCompleted } = goalProgress;

  return (
    <Card.Root>
      <Card.Body>
        {/* Top section with goal image in the background */}
        <Box
          position="relative"
          h="150px"
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
          <Flex
            position="absolute"
            left="4"
            bottom="4"
            zIndex="1"
            alignItems="center"
            spaceX="3"
          >
            {/* show avatar with level */}
            <AvatarWithLevel
              size="lg"
              username={user.username}
              goalId={goal._id}
            />
            {/* Goal Title + Goal Starting date or ending in days */}
            <VStack color="white" alignItems="flex-start" gap="unset">
              <Box>
                <Heading display="inline-block" size="2xl" mr="2">
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
                    ? `Ends in ${goal.duration - differenceInDays(startOfToday(), startOfDay(goal.startDate))} days`
                    : `Starting on ${format(goal.startDate, "PPP")}`}
                </Text>
              </Flex>
            </VStack>
          </Flex>
        </Box>
        {/* showing goal progress visually */}
        <Grid templateColumns="repeat(2, 1fr)" gap={4} px="6" py="4">
          <Analytics goalProgress={goalProgress} />
          <HabitCompletionsChart goalProgress={goalProgress} />
          <CurrentWorkStreak goalProgress={goalProgress} />
          <SkippedVsWorkedDays goalProgress={goalProgress} />
          <TodosDeadlines goalProgress={goalProgress} />
        </Grid>
      </Card.Body>
    </Card.Root>
  );
};

export default GoalProgress;
