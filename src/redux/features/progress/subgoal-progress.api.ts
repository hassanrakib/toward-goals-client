import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import {
  ISubgoalProgress,
  SubgoalProgressCreationData,
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
      invalidatesTags: (result, error, arg) => [{type: "subgoalsOfAGoal", id: arg.goal}],
    }),
  }),
});

export const { useCreateSubgoalProgressMutation } =
  subgoalProgressApi;
