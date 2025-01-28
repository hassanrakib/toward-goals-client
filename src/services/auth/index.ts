"use server";

import { envConfig } from "@/config/envConfig";
import Response from "@/types/response";
import { Session } from "@/types/session";
import { cookies } from "next/headers";

export const verifySession = async (): Promise<Session | null> => {
  try {
    const sessionToken = (await cookies()).get("accessToken")?.value;

    if (!sessionToken) {
      return null;
    }

    // try verifying the session
    const response = await fetch(`${envConfig.baseApi}/auth/verify-session`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });

    const session: Response<Session> = await response.json();

    // if session valid
    if (session.data) {
      // return session
      return session.data;
    }

    // if session not valid, try refreshing the session
    return await refreshSession();

  } catch (error: unknown) {
    console.error((error as Error).message);
    // if error happens return null
    return null;
  }
};

export const refreshSession = async (): Promise<Session | null> => {
  try {
    const refreshSessionToken = (await cookies()).get("refreshToken")?.value;

    if (!refreshSessionToken) {
      return null;
    }

    const response = await fetch(`${envConfig.baseApi}/auth/refresh-session`, {
      method: "POST",
      // send all the tokens including refresh token
      // to get a fresh session in the cookie
      credentials: "include",
    });

    const session: Response<Session> = await response.json();

    // if success in getting a new session
    if (session.data) {
      return session.data;
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.error((error as Error).message);
    return null;
  }
};

export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");
  cookieStore.delete("refreshToken");
};
