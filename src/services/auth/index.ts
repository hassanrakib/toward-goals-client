"use server";

import { ISessionPayload } from "@/types/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const decrypt = async (session: string | undefined = "") => {
  try {
    return jwtDecode<ISessionPayload>(session);
  } catch (err: unknown) {
    console.log((err as Error).message);
    return null;
  }
};

export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");
};
