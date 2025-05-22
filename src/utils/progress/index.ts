import { IResponse } from "@/types/global";
import { IGoalProgress } from "@/types/progress";
import { createListCollection } from "@chakra-ui/react";

export const generateAvailableGoalsCollection = (
  goalsProgressResponse: IResponse<IGoalProgress[]> | undefined
) => {
  return createListCollection({
    items:
      goalsProgressResponse?.data?.map(({ goal }) => ({
        label: goal.title,
        value: goal._id,
      })) || [],
  });
};

// define radius for a bar in a stacked bar chart (two bars)
export function getRadiusForABarInAProgressBarChart(
  barIndex: number,
  firstBarContribution: number,
  secondBarContribution: number
): number | [number, number, number, number] | undefined {
  // for the first bar in the stack
  if (barIndex === 0) {
    // if the second bar has contribution
    // then first bar will have the top-left & bottom-left rounded
    // no contribution of the second bar => every corner will be rounded
    if (secondBarContribution > 0) {
      return [12, 0, 0, 12];
    }

    return 12;
  }

  // for the second bar in the stack
  if (barIndex === 1) {
    if (firstBarContribution > 0) {
      return [0, 12, 12, 0];
    }

    return 12;
  }
}
