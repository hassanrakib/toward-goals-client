"use server";

import { envConfig } from "@/config/envConfig";
import Response from "@/types/response";
import { Session } from "@/types/session";
import { cookies } from "next/headers";

export const createSession = async (): Promise<Session | null> => {
  try {
    let newSession: Session | null = null;

    const sessionToken = (await cookies()).get("sessionToken")?.value;

    if (sessionToken) {
      // try verifying the session token
      // the api call will set new session in the cookie
      const response = await fetch(`${envConfig.baseApi}/auth/create-session`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      });

      const result: Response<Session> = await response.json();

      // if successful in setting the session cookie
      // return new session
      if (result.data) {
        // set the new session
        newSession = result.data;
      }
    }

    return newSession;
  } catch (error: unknown) {
    console.error((error as Error).message);
    // if error happens return null as session
    return null;
  }
};

export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");
  cookieStore.delete("sessionToken");
};
