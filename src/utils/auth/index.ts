import { envConfig } from "@/config/envConfig";
import { IResponse } from "@/types/global";
import { jwtDecode } from "jwt-decode";
import debounce from "../global";
import { ISessionPayload } from "@/types/auth";

// decrypt the session cookie
export const decrypt = (session: string | undefined = "") => {
  try {
    return jwtDecode<ISessionPayload>(session);
  } catch (err: unknown) {
    console.log((err as Error).message);
    return null;
  }
};

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
    // return false;
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
    // return false;
  }
}, 1000);
