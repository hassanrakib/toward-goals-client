import { Tag } from "@/components/ui/tag";
import { getTaskTimeSpans } from "@/services/task";
import { HStack, Text } from "@chakra-ui/react";
import { format } from "date-fns";

const TimeSpans = async ({ taskId }: { taskId: string }) => {
  // get all the timespans for the task
  const timeSpans = await getTaskTimeSpans(taskId);

  // if no timeSpans
  if (!timeSpans.data?.length) {
    return null;
  }

  return (
    <HStack flexWrap="wrap" fontSize="15px" fontWeight="300">
      <Text>I did work within these timeframes: </Text>
      {timeSpans.data?.map((timeSpan) => (
        <Tag key={timeSpan._id}>
          {format(timeSpan.startTime, "h:mm a")} -{" "}
          {format(timeSpan.endTime, "h:mm a")}
        </Tag>
      ))}
    </HStack>
  );
};

export default TimeSpans;
