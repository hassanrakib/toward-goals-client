"use client";

import { Text } from "@chakra-ui/react";
import { format, isToday, isYesterday } from "date-fns";

// keep it a client component
// becuase date formatting needs to be done in users local computer
export default function LastStreakDate({
  currentStreak,
  streakDates,
}: {
  currentStreak: number;
  streakDates: Date[];
}) {
  return (
    <Text color="gray.600" fontSize="md">
      {currentStreak > 0
        ? `Last worked on ${isToday(streakDates[streakDates.length - 1]) ? "Today" : isYesterday(streakDates[streakDates.length - 1]) ? "Yesterday" : format(streakDates[streakDates.length - 1], "PP")} ${format(streakDates[streakDates.length - 1], "h:mm a")} 💪`
        : "Stop thinking, start doing!"}
    </Text>
  );
}
