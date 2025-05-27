import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { ISubgoal, SubgoalCreationData, SubgoalOfAGoal } from "@/types/subgoal";

const subgoalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubgoal: build.mutation<IResponse<ISubgoal>, SubgoalCreationData>({
      query: ({ goalId, ...subgoal }) => ({
        url: `/subgoals/${goalId}/create-subgoal`,
        method: "POST",
        body: subgoal,
      }),
    }),
    getSubgoalsOfAGoal: build.query<
      IResponse<SubgoalOfAGoal[]>,
      { goalId: string; isCompleted?: boolean }
    >({
      query: ({ goalId, ...params }) => ({
        url: `/subgoals/${goalId}`,
        method: "GET",
        params,
      }),
      // provide different cache tags for different goalId
      providesTags: (result, error, arg) => [
        { type: "subgoalsOfAGoal", id: arg.goalId },
      ],
    }),
  }),
});

export const { useCreateSubgoalMutation, useGetSubgoalsOfAGoalQuery } =
  subgoalApi;
