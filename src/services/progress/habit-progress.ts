import { fetchFromApi } from "@/lib/fetch-from-api";
import { QueryParams } from "@/types/global";
import { IHabitProgress } from "@/types/progress";

export const getMyHabitsProgress = async (queryParams?: QueryParams) => {
  return fetchFromApi<IHabitProgress[]>("/progress/my-habits-progress", {
    queryParams,
  });
};
