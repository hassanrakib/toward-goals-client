import { ITask } from "@/types/task";
import { Badge, Box, HStack } from "@chakra-ui/react";
import { isBefore } from "date-fns";
import { CircleCheckBig, CircleX } from "lucide-react";
import CompletedStaus from "./completed-status";

const StatusLabels = ({ task }: { task: ITask }) => {
  // destructure
  const {
    isCompleted,
    updatedAt,
    deadline,
    completedUnits,
    habit: {
      unit: { name: unitName },
      difficulties: { elite: eliteRequirement },
    },
  } = task;

  // decide whether the deadline is met
  // updating isCompleted property is the last update
  // so, checking isCompleted: true also last update before the deadline
  // otherwise, check todays date is before the deadline
  const isDeadlineMet = isCompleted && isBefore(updatedAt, deadline) || isBefore(new Date(), deadline);

  // calculate extra unit worked after max difficulty requirement
  const extraUnit =
    completedUnits > eliteRequirement ? completedUnits - eliteRequirement : 0;

  return (
    <HStack flexWrap="wrap" mt="4">
      {/* completed status */}
      <CompletedStaus task={task} />
      {/* deadline status */}
      <Badge colorPalette={isDeadlineMet ? "green" : "red"}>
        {isDeadlineMet ? (
          <CircleCheckBig size="14px" />
        ) : (
          <CircleX size="14px" />
        )}{" "}
        Deadline
      </Badge>
      {/* extra unit worked */}
      <Badge colorPalette="blue">
        <Box border="1px solid white" rounded="lg" px="2" shadow="sm">
          {extraUnit} {unitName}
        </Box>
        Extra
      </Badge>
    </HStack>
  );
};

export default StatusLabels;
