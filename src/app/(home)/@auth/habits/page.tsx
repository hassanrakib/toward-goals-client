import HabitProgress from "@/components/pages/habits/habit-progress";
import { getMyHabitsProgress } from "@/services/progress/habit-progress";
import { VStack } from "@chakra-ui/react";

export default async function Habits() {
  // get all the habits progress
  const habitsProgress = await getMyHabitsProgress();

  return (
    <VStack align="stretch">
      {habitsProgress.data?.map((habitProgress) => (
        <HabitProgress key={habitProgress._id} habitProgress={habitProgress} />
      ))}
    </VStack>
  );
}