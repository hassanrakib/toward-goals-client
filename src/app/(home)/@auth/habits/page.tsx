import HabitProgress from "@/components/pages/habits/habit-progress";
import CreateProgressLink from "@/components/shared/create-progress-link";
import { getMyHabitsProgress } from "@/services/progress/habit-progress";
import { VStack } from "@chakra-ui/react";

export default async function Habits({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  // get the goalId from the search params
  const goalId = (await searchParams).goalId;

  // get all the habits progress
  const habitsProgress = await getMyHabitsProgress({ goal: goalId });

  return (
    <>
      {/* show a button to create a new habit */}
      {!habitsProgress.data?.length && (
        <CreateProgressLink
          callToAction="Start your personal way to work"
          actionLink="/habits/create-habit"
          actionLabel="Create habit"
        />
      )}

      {/* show habits progress */}
      <VStack alignItems="stretch" maxW="900px" mx="auto" gap="3.5">
        {habitsProgress.data?.map((habitProgress) => (
          <HabitProgress
            key={habitProgress._id}
            habitProgress={habitProgress}
          />
        ))}
      </VStack>
    </>
  );
}
