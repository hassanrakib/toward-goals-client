"use server";

import { envConfig } from "@/config/envConfig";
import Response from "@/types/response";
import { DecodedSession, Session } from "@/types/session";
import { cookies } from "next/headers";

export const verifySession = async () => {
  try {
    // try verifying the session
    const response = await fetch(`${envConfig.baseApi}/auth/verify-session`, {
      method: "POST",
      credentials: "include",
    });

    const result: Response<DecodedSession> = await response.json();

    // if session valid
    if (result.data?.session) {
      // return decoded session
      return result.data.session;
    }

    // if session not valid, try refreshing the session
    const newSession = await refreshSession();

    // if new session generated
    if (newSession) {
      // verify the session again to get the decoded session
      await verifySession();
    }

    // if none of the tries work
    return null;
  } catch (error: unknown) {
    console.error((error as Error).message);
    // if error happens return null
    return null;
  }
};

export const refreshSession = async () => {
  try {
    const response = await fetch(`${envConfig.baseApi}/auth/refresh-session`, {
      method: "POST",
      // send all the tokens including refresh token
      // to get a fresh session in the cookie
      credentials: "include",
    });

    const result: Response<Session> = await response.json();

    // if success in getting a new session
    // session will be a string
    // otherwise undefined
    return result.data?.session;
  } catch (error: unknown) {
    console.error((error as Error).message);
  }
};

export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");
  cookieStore.delete("refreshToken");
};
