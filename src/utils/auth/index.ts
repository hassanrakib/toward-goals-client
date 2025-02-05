import { envConfig } from "@/config/envConfig";
import { IResponse } from "@/types/global";
import debounce from "../global";

// check username existence
export const isUsernameAvaliable = debounce(async (username: string) => {
  try {
    const res = await fetch(
      `${envConfig.baseApi}/auth/check-username?username=${username}`
    );

    const data: IResponse<{ exists: boolean }> = await res.json();

    // if username exists
    if (data.data?.exists) {
      return false;
    } else {
      return true;
    }
    // handle uncaught promise
  } catch (err) {
    console.log((err as Error).message);
  }
}, 1000);

// check email existence
export const isEmailAvailable = debounce(async (email: string) => {
  try {
    const res = await fetch(
      `${envConfig.baseApi}/auth/check-email?email=${email}`
    );

    const data: IResponse<{ exists: boolean }> = await res.json();

    // if email exists
    if (data.data?.exists) {
      return false;
    } else {
      return true;
    }
    // handle uncaught promise
  } catch (err) {
    console.log((err as Error).message);
  }
}, 1000);
