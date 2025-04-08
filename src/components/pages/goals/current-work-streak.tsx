import { Box, Text, Badge, VStack } from "@chakra-ui/react";
import { Flame } from "lucide-react";

export default function CurrentWorkStreak({ days }: { days: number }) {
  return (
    <Box
      bgGradient="to-r"
      gradientFrom="orange.100"
      gradientTo="orange.50"
      borderRadius="xl"
      p={6}
      shadow="md"
      textAlign="center"
      maxW="sm"
      position="relative"
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
          {days} Day{days !== 1 && "s"}
        </Text>
        <Text color="gray.600" fontSize="md">
          {days > 0
            ? "You’ve been on fire! Keep going! 💪"
            : "Stop thinking, start doing!"}
        </Text>
      </VStack>
    </Box>
  );
}
