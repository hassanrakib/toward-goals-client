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

export function getDifficultyColorPalette(difficulty: HabitDifficultiesName) {
  switch (difficulty) {
    case "mini":
      return "green";
    case "plus":
      return "purple";
    case "elite":
      return "red";
    default:
      return "gray";
  }
}
