import { fetchFromApi } from "@/lib/fetch-from-api";
import { QueryParams } from "@/types/global";
import { ITask, ITimeSpan } from "@/types/task";

export const getMyTasks = async (queryParams?: QueryParams) => {
  return fetchFromApi<ITask[]>("/tasks/my-tasks", {
    queryParams,
    // as it is user specific data
    // & data cache (one of next.js caching mechanisms) is shared across users
    // we are opting out from data cache
    cache: "no-store",

    // add tags to revalidate client side "router cache"
    // as forward & backward navigation reuses already rendered pages
    next: {
      tags: ["tasks"],
    },
  });
};

export const getTaskTimeSpans = async (taskId: string) => {
  return fetchFromApi<ITimeSpan[]>(`/tasks/${taskId}/time-spans`, {
    cache: "no-store",
  });
};
