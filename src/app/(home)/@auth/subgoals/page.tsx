import SubgoalProgress from "@/components/pages/subgoals/subgoal-progress";
import { getMySubgoalsProgress } from "@/services/progress/subgoal-progress";
import { VStack } from "@chakra-ui/react";

const Subgoals = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  // get the goalId from the search params
  const goalId = (await searchParams).goalId;

  // get all the subgoals progress
  const subgoalsProgress = await getMySubgoalsProgress({ goal: goalId });

  return (
    <VStack align="stretch">
      {subgoalsProgress.data?.map((subgoalProgress) => (
        <SubgoalProgress
          key={subgoalProgress._id}
          subgoalProgress={subgoalProgress}
        />
      ))}
    </VStack>
  );
};

export default Subgoals;
