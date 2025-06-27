import { Heading, Highlight, Stack, Text } from "@chakra-ui/react";
import GoalSubgoalFeature from "./goal-subgoal-feat";
import HabitTaskFeature from "./habit-task-feat";
import ProgressFeature from "./progress-feat";

export default function Features() {
  return (
    <Stack gap="5" maxW="4xl" mx="auto">
      {/* features section headers */}
      <Stack textAlign="center" maxW="lg" mx="auto">
        <Heading size={{ base: "2xl", sm: "3xl" }}>
          <Highlight
            query={["System"]}
            styles={{ color: "yellow.500", textShadow: "2xl" }}
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
