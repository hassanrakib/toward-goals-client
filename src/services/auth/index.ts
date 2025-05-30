// we are considering functions here to be server actions
// so, that we can we use them in client (only in event handlers)
// & server both type of components
"use server";

import { ISessionPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

// decrypt the session cookie
export const decrypt = async (session: string | undefined = "") => {
  try {
    return jwtDecode<ISessionPayload>(session);
  } catch (err: unknown) {
    console.log((err as Error).message);
    return null;
  }
};

// delete session cookie on sign out
export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");
};
