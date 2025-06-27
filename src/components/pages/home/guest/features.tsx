import { Heading, Highlight, Icon, Stack, Text } from "@chakra-ui/react";
import GoalSubgoalFeature from "./goal-subgoal-feat";
import HabitTaskFeature from "./habit-task-feat";
import ProgressFeature from "./progress-feat";
import { CalendarCog } from "lucide-react";

export default function Features() {
  return (
    <Stack gap="5" maxW="4xl" mx="auto">
      {/* features section headers */}
      <Stack alignItems="center" textAlign="center" maxW="lg" mx="auto" py="3">
        <Icon color="yellow.400" size="2xl">
          <CalendarCog />
        </Icon>
        <Heading size={{ base: "2xl", sm: "3xl" }}>
          <Highlight
            query={["System"]}
            styles={{ color: "yellow.400", textShadow: "2xl" }}
          >
            More Than a Goal. It&apos;s a System.
          </Highlight>
        </Heading>
        <Text fontSize="xs" color="fg.muted">
          Turn your ambitions into a flexible goal-achieving system, designed to
          move at your pace, however your day unfolds.
        </Text>
      </Stack>
      {/* Goal Subgoal Features */}
      <GoalSubgoalFeature />
      {/* Habit Task Features */}
      <HabitTaskFeature />
      {/* Progress Feature */}
      <ProgressFeature />
    </Stack>
  );
}
