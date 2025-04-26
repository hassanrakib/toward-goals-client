"use server";

import { envConfig } from "@/config/envConfig";
import { IResponse } from "@/types/global";
import { ITask, ITimeSpan } from "@/types/task";
import { cookies } from "next/headers";

export const getMyTasks = async (): Promise<IResponse<ITask[]>> => {
  // send cookies explicitly
  // as it is running in server not on the browser
  const cookieStore = (await cookies()).toString();
  try {
    const res = await fetch(`${envConfig.baseApi}/tasks/my-tasks`, {
      headers: {
        Cookie: cookieStore,
      },
    });

    return res.json();
  } catch (err) {
    throw err;
  }
};

export const getTaskTimeSpans = async (
  taskId: string
): Promise<IResponse<ITimeSpan[]>> => {
  // send cookies explicitly
  // as it is running in server not on the browser
  const cookieStore = (await cookies()).toString();
  try {
    const res = await fetch(`${envConfig.baseApi}/tasks/${taskId}/time-spans`, {
      headers: {
        Cookie: cookieStore,
      },
    });

    return res.json();
  } catch (err) {
    throw err;
  }
};
