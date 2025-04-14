import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import { ITask, TaskCreationData } from "@/types/task";

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTask: build.mutation<IResponse<ITask>, TaskCreationData>({
      query: (task) => ({
        url: "/tasks/create-task",
        method: "POST",
        body: task,
      }),
    }),
  }),
});

export const { useCreateTaskMutation } = taskApi;
