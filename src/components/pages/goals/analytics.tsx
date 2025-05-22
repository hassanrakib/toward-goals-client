import { Card, GridItem, VStack } from "@chakra-ui/react";
import GoalLevel from "./goal-level";
import { IGoalProgress } from "@/types/progress";
import ConsistencyLevel from "./consistency-level";
import DeepFocusLevel from "./deep-focus-level";
import CommitmentLevel from "./commitment-level";

const Analytics = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  return (
    <GridItem colSpan={2}>
      <Card.Root variant="subtle" rounded="xl">
        <Card.Body
          position="relative"
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap={6}
        >
          <GoalLevel goalProgress={goalProgress} />
          <VStack alignItems="stretch" p={6}>
            <ConsistencyLevel goalProgress={goalProgress} />
            <DeepFocusLevel goalProgress={goalProgress} />
            <CommitmentLevel goalProgress={goalProgress} />
          </VStack>
        </Card.Body>
      </Card.Root>
    </GridItem>
  );
};

export default Analytics;
