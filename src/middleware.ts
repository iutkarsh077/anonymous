import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const publicPath = path === '/sign-up' || path === '/sign-in' || path === '/forgot-password';

    const token = request.cookies.get('anonymousUser')?.value || '';

    if (publicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}  
 
export const config = {
  matcher: [
    '/',
    '/sign-up',
    '/sign-in',
    '/forgot-password',
  ],
}