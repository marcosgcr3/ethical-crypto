import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

// Protected base paths
const protectedRoutes = ["/eb-clinical-portal", "/api/eb-portal"];
// Paths that should be accessible even if within a protected base path
const publicRoutes = ["/eb-clinical-portal/login"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route));

  if (isProtectedRoute && !isPublicRoute) {
    const sessionCookie = request.cookies.get("admin_session")?.value;

    if (!sessionCookie) {
      // For API routes, return 401. For URLs, redirect to login.
      if (path.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/eb-clinical-portal/login", request.nextUrl));
    }

    try {
      // Validate session
      await decrypt(sessionCookie);
      return NextResponse.next();
    } catch (error) {
      console.error("Session validation failed:", error);
      const res = NextResponse.redirect(new URL("/eb-clinical-portal/login", request.nextUrl));
      res.cookies.delete("admin_session");
      return res;
    }
  }

  return NextResponse.next();
}

// Optimization: Only run middleware on these paths
export const config = {
  matcher: [
    '/eb-clinical-portal/:path*',
    '/api/eb-portal/:path*',
  ],
};
