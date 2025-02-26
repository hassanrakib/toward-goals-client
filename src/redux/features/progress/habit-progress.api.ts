import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
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
  }),
});

export const { useCreateHabitProgressMutation } = habitProgressApi;
