import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import * as jose from 'jose';

interface CustomNextRequest extends NextRequest {
  user?: any; // Make sure to use "?" to indicate optional
}

export async function middleware(request: CustomNextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("From Middleware URL => ", request.url);

  const pathsToVerify = ['/admin', '/hospital'];

  if (pathsToVerify.some((path) => pathname.startsWith(path))) {
    const cookie = cookies().get('token');

    console.log("From Middleware HItted => ", cookie);

    if (!cookie || typeof cookie === 'undefined' || cookie.value === 'undefined') {
      return redirectToLogin(request);
    }

    try {
      const { payload, protectedHeader } = await jose.jwtVerify(
        cookie.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      console.log("From Middleware => ", payload);

      if (validateAccess(payload, pathname)) {
        request.user = payload;
        return NextResponse.next();
      } else {
        return redirectToUnauthorized(request);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      return redirectToLogin(request);
    }
  }


  return NextResponse.next();
}

function validateAccess(payload: any, pathname: string): boolean {
  if (pathname.startsWith('/admin') && payload.isAdmin) {
    return true;
  } else if (pathname.startsWith('/hospital') && payload.isHospital) {
    return true;
  } else if (pathname.startsWith('/admin') && payload.isHospital) {
    // Redirect to /hospital for users having both roles
    return false;
  } else if (pathname.startsWith('/hospital') && payload.isAdmin) {
    // Redirect to /admin for users having both roles
    return false;
  }
  return false;
}


function redirectToLogin(request: NextRequest) {
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

function redirectToUnauthorized(request: NextRequest) {
  return NextResponse.redirect(new URL('/auth/unauthorized', request.url));
}
