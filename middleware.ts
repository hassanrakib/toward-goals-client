import { verifySession } from "@/services/auth";
import { Session } from "@/types/session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // the session parsed from the "session" cookie
  let session: Session | null = null;

  // initially for the first request the session cookie will be undefined
  // but later for the subsequest requests
  // if the user is authenticated the session cookie will be found
  const sessionCookie = (await cookies()).get("session")?.value;

  // if session cookie found
  // set the session variable
  if (sessionCookie) {
    session = JSON.parse(sessionCookie);
  }

  // if this is the first request of an authenticated user there will be no session cookie
  // verify the session token which is 'accessToken' using verifySession()
  // verifySession() call will set new "session" in the cookie
  if (!sessionCookie) {
    const newSession = await verifySession();

    const newSessionCookie = (await cookies()).get("session")?.value;

    if (newSession && newSessionCookie) {
      session = JSON.parse(newSessionCookie);
    }
  }

  // if the user is uauthenticated
  if (!session) {
    // and trying to get into auth routes
    if (authRoutes.includes(pathname)) {
      // let the user go
      return NextResponse.next();
    } else {
      // redirect the user to the /login route as the user is trying to access
      // the protected routes from the matcher below
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // if the user is authenticated
  if (session) {
    // and trying to get into the auth routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - The root route `/`
     * - API routes (optional, if you want to exclude them)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|$).*)",
  ],
};
