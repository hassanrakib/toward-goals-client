"use client";

import { Text, TextProps } from "@chakra-ui/react";
import { differenceInDays, format, isBefore } from "date-fns";

interface DurationInfoProps extends TextProps {
  startDate: string;
  endDate: string;
}

// keep it a client component, date formatting needs to be done in
// user's local time zone
export default function DurationInfo(props: DurationInfoProps) {
  // destructure
  const { startDate, endDate, ...rest } = props;

  // get the total duration
  const duration = differenceInDays(endDate, startDate);

  // get the total days gone
  const daysGone = differenceInDays(new Date(), startDate);

  return (
    <Text fontSize="sm" fontWeight="medium" {...rest}>
      {/* if current date before start date */}
      {isBefore(new Date(), startDate)
        ? `Starting on ${format(startDate, "PPpp")}`
        : `Ends in ${duration - daysGone} days (${format(endDate, "PPpp")})`}
    </Text>
  );
}
