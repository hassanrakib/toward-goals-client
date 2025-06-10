// we are considering functions here to be server actions
// so, that we can we use them in client (only in event handlers)
// & server both type of components
"use server";

import { envConfig } from "@/config/envConfig";
import { cookies } from "next/headers";

// delete session cookie on sign out
export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("session");
};

// set session in the cookie store to be used by next.js server components using cookies() api
// cookies will be scoped to the frontend domain, as next.js server is setting the cookie
// request to frontend server (next.js) will recieve cookie from browser and can use cookies()
// so backend api call will not send cookie (cookie not scoped to backend domain, no cookie for backend domain in the browser)
export const setSessionInCookie = async (session: string) => {
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    secure: envConfig.NODE_ENV === "production",
    httpOnly: true,
    sameSite: true,
    // 5 minute less than the session life time
    maxAge: Number(envConfig.session_expires_in) - 300,
  });
};
