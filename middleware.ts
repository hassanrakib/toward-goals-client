import { decrypt } from "@/services/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // if the user is authenticated the cookie will be found
  const cookie = (await cookies()).get("session")?.value;

  // optimistic check
  const session = await decrypt(cookie);

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
