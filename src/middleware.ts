import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./utils/auth";

const authRoutes = ["/signin", "/signup"];

export default async function middleware(request: NextRequest) {
  // which path the user is intending to go
  const { pathname } = request.nextUrl;

  // if the user is authenticated the session will be found
  const session = (await cookies()).get("session")?.value;

  // optimistic check
  const sessionPayload = decrypt(session);

  // if the user is uauthenticated
  if (!sessionPayload) {
    // and trying to get into auth routes
    // or root route(root route has a public version alongside private version)
    if (authRoutes.includes(pathname) || pathname === "/") {
      // let the user go
      return NextResponse.next();
    } else {
      // redirect the user to the /signin route as the user is trying to access
      // the protected routes
      return NextResponse.redirect(
        new URL(`/signin?redirect=${pathname}`, request.url)
      );
    }
  }

  // if the user is authenticated
  if (sessionPayload) {
    // and trying to get into the auth routes
    if (authRoutes.includes(pathname)) {
      // redirect to the homepage
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      // else user want to go any protected route
      return NextResponse.next();
    }
  }
}

export const config = {
  // matcher defines the routes to call middleware for
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/feed",
    "/goals/:path?",
    "/habits/:path?",
    "/subgoals/:path?",
    "/tasks/:path?",
  ],
};
