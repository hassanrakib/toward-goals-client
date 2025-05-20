import { fetchFromApi } from "@/lib/fetch-from-api";
import { QueryParams } from "@/types/global";
import { ISubgoalProgress } from "@/types/progress";

export const getMySubgoalsProgress = async (queryParams?: QueryParams) => {
  return fetchFromApi<ISubgoalProgress[]>("/progress/my-subgoals-progress", {
    queryParams,
  });
};
