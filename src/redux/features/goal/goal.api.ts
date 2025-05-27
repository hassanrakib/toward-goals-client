import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { GoalCreationData, IGoal, MyJoinedGoal } from "@/types/goal";

const goalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createGoal: build.mutation<IResponse<IGoal>, GoalCreationData>({
      query: (goal) => ({
        url: "/goals/create-goal",
        method: "POST",
        body: goal,
      }),
    }),
    getMyJoinedGoals: build.query<
      IResponse<MyJoinedGoal[]>,
      { isCompleted?: boolean }
    >({
      query: (params) => {
        return {
          url: "/goals/my-joined-goals",
          method: "GET",
          params,
        };
      },
      providesTags: ["myJoinedGoal"],
    }),
  }),
});

export const { useCreateGoalMutation, useGetMyJoinedGoalsQuery } = goalApi;
