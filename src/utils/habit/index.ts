import { HabitDifficultiesName, IHabitDifficulties } from "@/types/habit";

export const getActiveDifficulty = (
  difficulties: IHabitDifficulties,
  totalCompletedUnit: number
) => {
  const activeDifficultyName =
    (Object.keys(difficulties) as Array<HabitDifficultiesName>).find(
      (difficulty) => totalCompletedUnit < difficulties[difficulty]
    ) || "elite";

  return {
    name: activeDifficultyName,
    requirement: difficulties[activeDifficultyName],
  };
};

export function getDifficultyColor(difficulty: HabitDifficultiesName) {
  switch (difficulty) {
    case "mini":
      return "yellow.400";
    case "plus":
      return "teal.400";
    case "elite":
      return "red.400";
    default:
      return "green.400";
  }
}
