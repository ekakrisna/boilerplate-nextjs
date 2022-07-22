import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/user')) {
    const accessToken = request.cookies.get('accessToken');
    const userRole = request.cookies.get('userRole');

    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    } else {
      if (userRole !== 'user') {
        // return next;
      }
    }
  }

  if (request.nextUrl.pathname.startsWith('/admin')) {
    const accessToken = request.cookies.get('accessToken');
    const userRole = request.cookies.get('userRole');

    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth-admin/login', request.url));
    } else {
      if (userRole !== 'admin') {
        // return next;
      }
    }
  }
  if (request.nextUrl.pathname.startsWith('/teacher')) {
    const accessToken = request.cookies.get('accessToken');
    const userRole = request.cookies.get('userRole');

    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth-teacher/login', request.url));
    } else {
      if (userRole !== 'teacher') {
        // return next;
      }
    }
  }

  if (request.nextUrl.pathname.startsWith('/auth')) {
    const accessToken = request.cookies.get('accessToken');

    if (accessToken) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}
