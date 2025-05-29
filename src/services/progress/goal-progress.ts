import { fetchFromApi } from "@/lib/fetch-from-api";
import { QueryParams } from "@/types/global";
import { IGoalProgress } from "@/types/progress";

export const getMyGoalsProgress = async (queryParams?: QueryParams) => {
  return fetchFromApi<IGoalProgress[]>("/progress/my-goals-progress", {
    queryParams,
    // as it is user specific data
    // & data cache (one of next.js caching mechanisms) is shared across users
    // we are opting out from data cache
    cache: "no-store",

    // add tags to revalidate client side "router cache"
    // as forward & backward navigation reuses already rendered pages
    next: {
      tags: ["goalsProgress"],
    },
  });
};

export const getMyGoalProgressLevel = async (goalId: string) => {
  return fetchFromApi<{ level: string }>(
    `/progress/my-goal-progress/${goalId}/level`,
    {
      cache: "no-store",
    }
  );
};
