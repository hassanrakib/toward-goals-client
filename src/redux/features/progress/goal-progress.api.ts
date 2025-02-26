import { baseApi } from "@/redux/baseApi";
import { IResponse, QueryParams } from "@/types/global";
import { GoalProgressCreationData, IGoalProgress } from "@/types/progress";

const goalProgressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createGoalProgress: build.mutation<
      IResponse<IGoalProgress>,
      GoalProgressCreationData
    >({
      query: (goalProgressCreationData) => ({
        url: "/progress/create-goal-progress",
        method: "POST",
        body: goalProgressCreationData,
      }),
    }),
    getGoalsProgress: build.query<IResponse<IGoalProgress[]>, QueryParams>({
      query: (params) => {
        return {
          url: "/progress/my-goals-progress",
          method: "GET",
          params,
        };
      },
    }),
  }),
});

export const { useCreateGoalProgressMutation, useGetGoalsProgressQuery } =
  goalProgressApi;
