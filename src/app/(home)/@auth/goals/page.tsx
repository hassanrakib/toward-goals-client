import GoalProgress from "@/components/pages/goals/goal-progress";
import { getMyGoalsProgress } from "@/services/progress/goal-progress";
import { VStack } from "@chakra-ui/react";

const Goals = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  // get the goalId from the search params
  const goalId = (await searchParams).goalId;

  const goalsProgress = await getMyGoalsProgress({ goal: goalId });

  return (
    <VStack alignItems="stretch" maxW="900px" mx="auto" gap="3.5">
      {goalsProgress.data?.map((goalProgress) => (
        <GoalProgress key={goalProgress._id} goalProgress={goalProgress} />
      ))}
    </VStack>
  );
};

export default Goals;
