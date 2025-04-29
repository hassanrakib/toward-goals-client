"use server";

import { envConfig } from "@/config/envConfig";
import { IResponse } from "@/types/global";
import { IGoalProgress } from "@/types/progress";
import { cookies } from "next/headers";

export const getMyGoalsProgress = async (): Promise<
  IResponse<IGoalProgress[]>
> => {
  // send cookies explicitly
  // as it is running in server not on the browser
  const cookieStore = (await cookies()).toString();
  try {
    const res = await fetch(`${envConfig.baseApi}/progress/my-goals-progress`, {
      headers: {
        Cookie: cookieStore,
      },
    });

    return res.json();
  } catch (err) {
    throw err;
  }
};

export const getMyGoalProgressLevel = async (
  goalId: string
): Promise<IResponse<{level: string}>> => {
  // send cookies explicitly
  // as it is running in server not on the browser
  const cookieStore = (await cookies()).toString();
  try {
    const res = await fetch(
      `${envConfig.baseApi}/progress/my-goal-progress/${goalId}/level`,
      {
        headers: {
          Cookie: cookieStore,
        },
      }
    );

    return res.json();
  } catch (err) {
    throw err;
  }
};
