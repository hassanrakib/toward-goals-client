import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
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
      invalidatesTags: ["myJoinedGoal"],
    }),
  }),
});

export const { useCreateGoalProgressMutation } = goalProgressApi;
