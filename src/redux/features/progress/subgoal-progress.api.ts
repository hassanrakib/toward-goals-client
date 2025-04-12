import { baseApi } from "@/redux/baseApi";
import { IResponse, QueryParams } from "@/types/global";
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
    }),
    getSubgoalsProgress: build.query<
      IResponse<ISubgoalProgress[]>,
      QueryParams
    >({
      query: (params) => ({
        url: "/progress/my-subgoals-progress",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useCreateSubgoalProgressMutation, useGetSubgoalsProgressQuery } =
  subgoalProgressApi;
