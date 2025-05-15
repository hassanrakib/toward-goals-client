import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInYears,
} from "date-fns";

export const getTimeAgo = (time: Date) => {
  const timeNow = new Date();

  const years = differenceInYears(timeNow, time);
  if (years > 0) return `${years}y ago`;

  const days = differenceInDays(timeNow, time);
  if (days > 0) return `${days}d ago`;

  const hours = differenceInHours(timeNow, time);
  if (hours > 0) return `${hours}h ago`;

  const minutes = differenceInMinutes(timeNow, time);
  if (minutes > 0) return `${minutes}m ago`;

  return "just now";
};
