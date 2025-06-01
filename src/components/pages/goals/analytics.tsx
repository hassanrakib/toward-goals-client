import { Badge, Card, VStack } from "@chakra-ui/react";
import { IGoalProgress } from "@/types/progress";
import ConsistencyLevel from "./consistency-level";
import DeepFocusLevel from "./deep-focus-level";
import CommitmentLevel from "./commitment-level";
import { ChartNoAxesCombined } from "lucide-react";

const Analytics = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  return (
    <Card.Root variant="subtle" rounded="xl">
      <Card.Body
        position="relative"
        alignItems="stretch"
        justifyContent="center"
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
          <ChartNoAxesCombined size="16" /> Analytics
        </Badge>
        <VStack alignItems="stretch" mt="4">
          <ConsistencyLevel goalProgress={goalProgress} />
          <DeepFocusLevel goalProgress={goalProgress} />
          <CommitmentLevel goalProgress={goalProgress} />
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};

export default Analytics;
