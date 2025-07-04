import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // You can access incoming requests and even rewrite them to other URLs.
  // For more information, see: https://nextjs.org/docs/app/building-your-application/routing/middleware
  const res = NextResponse.next();
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
