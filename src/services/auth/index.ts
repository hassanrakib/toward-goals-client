"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const decrypt = (session: string | undefined = "") => {
  try {
    return jwtDecode(session);
  } catch (err: unknown) {
    console.error((err as Error).message);
    return null;
  }
};

export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");
};
