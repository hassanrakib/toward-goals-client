import { IGoalProgress } from "@/types/progress";
import { Text, Badge, VStack, Card } from "@chakra-ui/react";
import { Flame, Tally5 } from "lucide-react";
import LastStreakDate from "./last-streak-date";

export default function CurrentWorkStreak({
  goalProgress,
}: {
  goalProgress: IGoalProgress;
}) {
  const {
    workStreak: { current: currentStreak, streakDates },
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
            {currentStreak} Day{currentStreak > 1 && "s"}
          </Text>
          {/* shows the last streak date */}
          <LastStreakDate
            currentStreak={currentStreak}
            streakDates={streakDates}
          />
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}
