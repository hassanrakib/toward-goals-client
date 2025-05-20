import { IGoalProgress } from "@/types/progress";
import { Box, Text, Badge, VStack } from "@chakra-ui/react";
import { format, isToday, isYesterday } from "date-fns";
import { Flame } from "lucide-react";

export default function CurrentWorkStreak({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) {
  const {
    workStreak: { current: streakDays, streakDates },
  } = goalProgress;
  return (
    <Box
      bgGradient="to-r"
      gradientFrom="orange.100"
      gradientTo="orange.50"
      borderRadius="xl"
      p={6}
      shadow="md"
      textAlign="center"
      // maxW="sm"
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Badge
        colorScheme="orange"
        fontSize="sm"
        position="absolute"
        top="1rem"
        right="1rem"
      >
        🔥 Streak
      </Badge>

      <VStack gap={3}>
        <Flame color="orange" size={40} />
        <Text
          fontSize="4xl"
          fontWeight="bold"
          bgGradient="to-r"
          gradientFrom="orange.400"
          gradientTo="red.400"
          bgClip="text"
        >
          {streakDays} Day{streakDays !== 1 && "s"}
        </Text>
        <Text color="gray.600" fontSize="md">
          {streakDays > 0
            ? `Last worked on ${isToday(streakDates[streakDates.length - 1]) ? "Today" : isYesterday(streakDates[streakDates.length - 1]) ? "Yesterday" : format(streakDates[streakDates.length - 1], "PP")} ${format(streakDates[streakDates.length - 1], "h:mm a")} 💪`
            : "Stop thinking, start doing!"}
        </Text>
      </VStack>
    </Box>
  );
}
