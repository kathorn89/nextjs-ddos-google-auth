import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl.clone();

    // Ensure API routes, static files, and Next.js internal routes are NOT blocked
    if (url.pathname.startsWith("/_next") || url.pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/realtime", "/dashboard"],
};
