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
