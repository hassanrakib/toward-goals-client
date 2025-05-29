import { fetchFromApi } from "@/lib/fetch-from-api";
import { QueryParams } from "@/types/global";
import { IHabitProgress } from "@/types/progress";

export const getMyHabitsProgress = async (queryParams?: QueryParams) => {
  return fetchFromApi<IHabitProgress[]>("/progress/my-habits-progress", {
    queryParams,
    // as it is user specific data
    // & data cache (one of next.js caching mechanisms) is shared across users
    // we are opting out from data cache
    cache: "no-store",

    // add tags to revalidate client side "router cache"
    // as forward & backward navigation reuses already rendered pages
    next: {
      tags: ["habitsProgress"],
    },
  });
};
