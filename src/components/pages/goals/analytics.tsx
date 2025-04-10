import { GridItem, VStack } from "@chakra-ui/react";
import GoalLevel from "./goal-level";
import { IGoalProgress } from "@/types/progress";
import ConsistencyLevel from "./consistency-level";
import DeepFocusLevel from "./deep-focus-level";
import CommitmentLevel from "./commitment-level";

const Analytics = ({ goalProgress }: { goalProgress: IGoalProgress }) => {
  return (
    <GridItem
      colSpan={2}
      bgGradient="to-r"
      gradientFrom="orange.100"
      gradientTo="orange.50"
      borderRadius="xl"
      p={6}
      shadow="md"
      // maxW="sm"
      position="relative"
      display="grid"
      gridTemplateColumns="repeat(2, 1fr)"
      gap={6}
    >
      <GoalLevel goalProgress={goalProgress} />
      <VStack
        alignItems="stretch"
        border="2px solid"
        borderColor="yellow.400"
        borderRadius="md"
        boxShadow="0 0 10px rgb(233, 205, 114)"
        p={6}
      >
        <ConsistencyLevel goalProgress={goalProgress} />
        <DeepFocusLevel goalProgress={goalProgress} />
        <CommitmentLevel goalProgress={goalProgress} />
      </VStack>
    </GridItem>
  );
};

export default Analytics;
