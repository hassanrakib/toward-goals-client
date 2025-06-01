import { IGoalProgress } from "@/types/progress";
import { Text, Badge, VStack, Card } from "@chakra-ui/react";
import { format, isToday, isYesterday } from "date-fns";
import { Flame, Tally5 } from "lucide-react";

export default function CurrentWorkStreak({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) {
  const {
    workStreak: { current: streakDays, streakDates },
  } = goalProgress;
  return (
    <Card.Root variant="subtle" rounded="xl">
      <Card.Body
        position="relative"
        justifyContent="center"
        alignItems="center"
        px="2"
      >
        <Badge
          fontSize="sm"
          position="absolute"
          top="1rem"
          right="1rem"
          variant="surface"
          colorPalette="white"
          rounded="full"
        >
          <Tally5 size="16" /> Streak
        </Badge>
        <VStack gap={3} mt="4">
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
      </Card.Body>
    </Card.Root>
  );
}
