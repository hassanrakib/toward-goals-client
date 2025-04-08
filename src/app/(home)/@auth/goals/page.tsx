import GoalProgress from "@/components/pages/goals/goal-progress";
import { getMyGoalsProgress } from "@/services/progress/goal-progress";
import { VStack } from "@chakra-ui/react";

const Goals = async () => {
  const goalsProgress = await getMyGoalsProgress();

  return (
    <VStack alignItems="stretch">
      {goalsProgress.data?.map((goalProgress) => (
        <GoalProgress key={goalProgress._id} goalProgress={goalProgress} />
      ))}
    </VStack>
  );
};

export default Goals;
