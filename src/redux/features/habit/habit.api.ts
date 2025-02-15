import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import {
  HabitCreationData,
  HabitUnitCreationData,
  IHabit,
  IHabitUnit,
} from "@/types/habit";

const habitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHabitUnit: build.mutation<
      IResponse<IHabitUnit>,
      HabitUnitCreationData
    >({
      query: ({ goalId, ...habitUnit }) => ({
        url: `/habits/${goalId}/create-habit-unit`,
        method: "POST",
        body: habitUnit,
      }),
    }),
    createHabit: build.mutation<IResponse<IHabit>, HabitCreationData>({
      query: ({ goalId, ...habit }) => ({
        url: `/habits/${goalId}/create-habit`,
        method: "POST",
        body: habit,
      }),
    }),
  }),
});

export const { useCreateHabitUnitMutation, useCreateHabitMutation } = habitApi;
