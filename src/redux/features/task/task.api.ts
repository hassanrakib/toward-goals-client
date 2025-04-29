import { baseApi } from "@/redux/baseApi";
import { IResponse, QueryParams } from "@/types/global";
import {
  ITask,
  ITimeSpan,
  TaskCreationData,
  TimeSpanCreationData,
} from "@/types/task";

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
    createTimeSpan: build.mutation<IResponse<ITimeSpan>, TimeSpanCreationData>({
      query: (timeSpan) => ({
        url: "/tasks/create-time-span",
        method: "POST",
        body: timeSpan,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useCreateTimeSpanMutation,
} = taskApi;
