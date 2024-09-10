// /api/auth/route.js
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  const { email, password } = await req.json();

  if (email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
    const response = NextResponse.json({ success: true });

    // Set a secure cookie for authentication
    response.cookies.set('auth', 'true', {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', // Set this flag for production environment
      path: '/', 
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  } else {
    return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
  }
};