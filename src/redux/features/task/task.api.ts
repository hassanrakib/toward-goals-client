import { baseApi } from "@/redux/baseApi";
import { IResponse, QueryParams } from "@/types/global";
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
    getTasks: build.query<IResponse<ITask[]>, QueryParams>({
      query: (params) => ({
        url: "/tasks/my-tasks",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useCreateTaskMutation, useGetTasksQuery } = taskApi;
