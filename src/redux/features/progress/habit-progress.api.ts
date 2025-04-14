import { baseApi } from "@/redux/baseApi";
import { IResponse, QueryParams } from "@/types/global";
import { HabitProgressCreationData, IHabitProgress } from "@/types/progress";

const habitProgressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHabitProgress: build.mutation<
      IResponse<IHabitProgress>,
      HabitProgressCreationData
    >({
      query: (habitProgressCreationData) => ({
        url: "/progress/create-habit-progress",
        method: "POST",
        body: habitProgressCreationData,
      }),
    }),
    getHabitsProgress: build.query<IResponse<IHabitProgress[]>, QueryParams>({
      query: (params) => ({
        url: "/progress/my-habits-progress",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useCreateHabitProgressMutation, useGetHabitsProgressQuery } =
  habitProgressApi;
