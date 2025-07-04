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
      invalidatesTags: (result, error, arg) => [
        // invalidates different cache tags for different task id
        { type: "timeSpanOfATask", id: arg.task },
      ],
    }),
    updateTask: build.mutation<IResponse<ITask>, TaskUpdateData>({
      query: ({ taskId, ...updateData }) => ({
        url: `/tasks/${taskId}`,
        method: "PATCH",
        body: updateData,
      }),
    }),
    getTimeSpans: build.query<IResponse<ITimeSpan[]>, { taskId: string }>({
      query: ({ taskId }) => {
        return {
          url: `/tasks/${taskId}/time-spans`,
          method: "GET",
        };
      },
      providesTags: (result, error, arg) => [
        // different cache tags for different taskId
        { type: "timeSpanOfATask", id: arg.taskId },
      ],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useCreateTimeSpanMutation,
  useUpdateTaskMutation,
  useGetTimeSpansQuery,
} = taskApi;
