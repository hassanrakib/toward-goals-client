import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import {
  ISubgoalProgress,
  SubgoalProgressCreationData,
  SubgoalProgressUpdateData,
} from "@/types/progress";

const subgoalProgressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubgoalProgress: build.mutation<
      IResponse<ISubgoalProgress>,
      SubgoalProgressCreationData
    >({
      query: (subgoalProgressCreationData) => ({
        url: "/progress/create-subgoal-progress",
        method: "POST",
        body: subgoalProgressCreationData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "subgoalOfAGoal", id: arg.goal },
      ],
    }),
    updateSubgoalProgress: build.mutation<
      IResponse<ISubgoalProgress>,
      SubgoalProgressUpdateData
    >({
      query: ({ subgoalProgressId, ...update }) => ({
        url: `/progress/my-subgoals-progress/${subgoalProgressId}`,
        method: "PATCH",
        body: update,
      }),
      invalidatesTags: (result, error, arg) => [
        {
          type: "subgoalOfAGoal",
          id: arg.goalId,
        },
      ],
    }),
  }),
});

export const {
  useCreateSubgoalProgressMutation,
  useUpdateSubgoalProgressMutation,
} = subgoalProgressApi;
