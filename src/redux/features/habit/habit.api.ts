import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import {
  HabitCreationData,
  HabitOfAGoal,
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
    getHabitsOfAGoal: build.query<
      IResponse<HabitOfAGoal[]>,
      { goalId: string }
    >({
      query: (params) => ({
        url: `/habits/${params.goalId}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        // different cache tags for different goalId
        { type: "habitOfAGoal", id: arg.goalId },
      ],
    }),
  }),
});

export const {
  useCreateHabitUnitMutation,
  useCreateHabitMutation,
  useGetHabitsOfAGoalQuery,
} = habitApi;
