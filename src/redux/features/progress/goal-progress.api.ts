import { baseApi } from "@/redux/baseApi";
import { IResponse, QueryParams } from "@/types/global";
import { IGoalProgress } from "@/types/progress";

const goalProgressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getGoalsProgress: build.query<IResponse<IGoalProgress[]>, QueryParams>({
      query: (params) => {
        return {
          url: "/progress/goals-progress",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useGetGoalsProgressQuery } = goalProgressApi;
