import { GridItem, VStack } from "@chakra-ui/react";
import GoalLevel from "./goal-level";
import { IGoalProgress } from "@/types/progress";
import ConsistencyLevel from "./consistency-level";

const Analytics = ({goalProgress} : {goalProgress: IGoalProgress}) => {
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
      gap={4}
    >
      <GoalLevel goalProgress={goalProgress} />
      <VStack alignItems="stretch">
        <ConsistencyLevel goalProgress={goalProgress} />
      </VStack>
    </GridItem>
  );
};

export default Analytics;
