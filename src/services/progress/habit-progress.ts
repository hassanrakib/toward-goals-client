import { envConfig } from "@/config/envConfig";
import { IResponse } from "@/types/global";
import { IHabitProgress } from "@/types/progress";
import { cookies } from "next/headers";

export const getMyHabitsProgress = async (): Promise<
  IResponse<IHabitProgress[]>
> => {
  // send cookies explicitly
  // as it is running in server not on the browser
  const cookieStore = (await cookies()).toString();
  try {
    const res = await fetch(`${envConfig.baseApi}/progress/my-habits-progress`, {
      headers: {
        Cookie: cookieStore,
      },
    });

    return res.json();
  } catch (err) {
    throw err;
  }
};
