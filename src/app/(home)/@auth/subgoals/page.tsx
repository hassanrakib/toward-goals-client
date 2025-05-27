import SubgoalProgress from "@/components/pages/subgoals/subgoal-progress";
import CreateProgressLink from "@/components/shared/create-progress-link";
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
    <>
      {/* show a button to create a new subgoal */}
      {!subgoalsProgress.data?.length && <CreateProgressLink
        callToAction="Every big goal needs small wins"
        actionLink="/subgoals/create-subgoal"
        actionLabel="Create subgoal"
      />}
      <VStack alignItems="stretch" maxW="900px" mx="auto" gap="3.5">
        {/* show subgoals progress */}
        {subgoalsProgress.data?.map((subgoalProgress) => (
          <SubgoalProgress
            key={subgoalProgress._id}
            subgoalProgress={subgoalProgress}
          />
        ))}
      </VStack>
    </>
  );
};

export default Subgoals;
