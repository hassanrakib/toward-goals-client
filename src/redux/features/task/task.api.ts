import { baseApi } from "@/redux/baseApi";
import { IResponse } from "@/types/global";
import {
  ITask,
  ITimeSpan,
  TaskCreationData,
  TaskUpdateData,
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
    createTimeSpan: build.mutation<IResponse<ITimeSpan>, TimeSpanCreationData>({
      query: (timeSpan) => ({
        url: "/tasks/create-time-span",
        method: "POST",
        body: timeSpan,
      }),
    }),
    updateTask: build.mutation<IResponse<ITask>, TaskUpdateData>({
      query: ({ taskId, ...updateData }) => ({
        url: `/tasks/${taskId}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useCreateTimeSpanMutation,
  useUpdateTaskMutation,
} = taskApi;
