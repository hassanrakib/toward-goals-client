import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import {
  GoalProgressCreationData,
  GoalProgressUpdateData,
  IGoalProgress,
} from "@/types/progress";

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
    updateGoalProgress: build.mutation<
      IResponse<IGoalProgress>,
      GoalProgressUpdateData
    >({
      query: ({ goalProgressId, ...update }) => ({
        url: `/progress/my-goals-progress/${goalProgressId}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: ["myJoinedGoal"],
    }),
  }),
});

export const { useCreateGoalProgressMutation, useUpdateGoalProgressMutation } =
  goalProgressApi;
