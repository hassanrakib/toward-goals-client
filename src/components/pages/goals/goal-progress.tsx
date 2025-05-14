import { IGoalProgress } from "@/types/progress";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import NextImage from "next/image";
import { Gem } from "lucide-react";
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

const GoalProgress = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  // destructuring properties from the goal progress
  const { goal, level } = goalProgress;

  return (
    <Box
      width="full"
      maxW="900px"
      mx="auto"
      bgColor="bg"
      rounded="md"
      boxShadow="xs"
      overflow="hidden"
      position="relative"
    >
      {/* Top section with goal image in the background */}
      <Box
        position="relative"
        h="150px"
        w="full"
        bgImg={`url(${goal.image ? goal.image : "https://placehold.co/600x400"})`}
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
        {/* Goal Title + Goal Starting date or goal day */}
        <Flex
          position="absolute"
          left="4"
          bottom="4"
          zIndex="1"
          alignItems="center"
        >
          <Image asChild alt={String(level.level)}>
            <NextImage
              src={level.badgeImage}
              alt={String(level.level)}
              width="50"
              height="50"
            />
          </Image>
          <Box color="white">
            <Text fontSize="2xl" fontWeight="bold">
              {goal.title}
            </Text>
            <Text fontSize="sm" color="white" fontWeight="medium">
              {isAfter(new Date(), goal.startDate)
                ? `Remaining ${goal.duration - differenceInDays(startOfToday(), startOfDay(goal.startDate))} days`
                : `Starting on ${format(goal.startDate, "PPP")}`}
            </Text>
          </Box>
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
    </Box>
  );
};

export default GoalProgress;
