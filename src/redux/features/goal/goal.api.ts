import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { GoalCreationData, IGoal } from "@/types/goal";

const goalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createGoal: build.mutation<IResponse<IGoal>, GoalCreationData>({
      query: (goal) => ({
        url: "/goals/create-goal",
        method: "POST",
        body: goal,
      }),
    }),
  }),
});

export const { useCreateGoalMutation } = goalApi;
