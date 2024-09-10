import { NextResponse } from "next/server";

export const POST = async (req) => {
    // Create a response object
    const response = NextResponse.json({ success: true });
  
    // Set the cookie to expire immediately
    response.cookies.set('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure flag in production
      path: '/',
      expires: new Date(0), // Set expiration date to a past date to delete the cookie
    });
  
    return response;
  };
  