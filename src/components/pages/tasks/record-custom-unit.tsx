import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ITask } from "@/types/task";
import { Box } from "@chakra-ui/react";
import { CirclePlus } from "lucide-react";

const RecordCustomUnit = ({
  task,
  iconColor,
}: {
  task: ITask;
  iconColor: string;
}) => {
  const { _id: taskId, completedUnits } = task;

  return (
    <PopoverRoot size="xs" positioning={{ placement: "bottom-end" }}>
      <PopoverTrigger asChild>
        <Box cursor="pointer">
          <CirclePlus size="18px" color={iconColor} />
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>hello boss!</PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default RecordCustomUnit;
