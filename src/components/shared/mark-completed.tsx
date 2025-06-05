import { Badge } from "@chakra-ui/react";
import { Circle, CircleCheckBig } from "lucide-react";

export default function MarkCompleted({
  isCompleted,
  onComplete,
}: {
  isCompleted: boolean;
  onComplete: () => void;
}) {
  return (
    <>
      {isCompleted ? (
        <Badge variant="solid" rounded="2xl" size="sm" colorPalette="green">
          <CircleCheckBig size="12" />
          Completed
        </Badge>
      ) : (
        <Badge
          variant="surface"
          rounded="2xl"
          size="sm"
          colorPalette="yellow"
          cursor="pointer"
          onClick={onComplete}
        >
          <Circle size="12" />
          Mark Completed
        </Badge>
      )}
    </>
  );
}
