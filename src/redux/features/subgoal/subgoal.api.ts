import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { ISubgoal, SubgoalCreationData } from "@/types/subgoal";

const subgoalApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubgoal: build.mutation<IResponse<ISubgoal>, SubgoalCreationData>({
      query: ({ goalId, ...subgoal }) => ({
        url: `/subgoals/${goalId}/create-subgoal`,
        method: "POST",
        body: subgoal,
      }),
    }),
  }),
});

export const { useCreateSubgoalMutation } = subgoalApi;
