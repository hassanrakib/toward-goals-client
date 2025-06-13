"use client";

import { Text, TextProps } from "@chakra-ui/react";
import {
  differenceInDays,
  differenceInSeconds,
  format,
  isBefore,
} from "date-fns";

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
  // initially assign number of full days except remaining seconds
  let durationInDays = differenceInDays(endDate, startDate);

  // increase the durationInDays by 1 if after full days in durationInDays
  // there are seconds remaining
  const remainingSecondsAfterDurationInDays =
    differenceInSeconds(endDate, startDate) % (24 * 60 * 60);

  if (remainingSecondsAfterDurationInDays) durationInDays += 1;

  // get the total days gone
  const daysGone = differenceInDays(new Date(), startDate);

  // decide what to render as info
  let info;

  //if days gone  is greater than duration in days
  if (daysGone > durationInDays) {
    info = `Ended on ${format(endDate, "PPpp")}`;
  } else {
    info = `Ends in ${durationInDays - daysGone} days (${format(endDate, "PPpp")})`;
  }

  // if current date before start date
  if (isBefore(new Date(), startDate)) {
    info = `Starting on ${format(startDate, "PPpp")}`;
  }

  return (
    <Text {...rest}>
      {info}
    </Text>
  );
}
