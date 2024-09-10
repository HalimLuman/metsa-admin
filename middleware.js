import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get("auth"); // Make sure 'auth' cookie is set

  const { pathname } = req.nextUrl;

  // If not authenticated and trying to access protected routes, redirect to sign-in
  if (!token && pathname !== "/sign-in") {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // Redirect authenticated users away from the sign-in page
  if (token && pathname === "/sign-in") {
    return NextResponse.redirect(new URL("/dashboard", req.url)); 
  }

  return NextResponse.next(); // Allow navigation if authenticated
}

export const config = {
  matcher: ["/dashboard", "/"], // Define protected routes
};
