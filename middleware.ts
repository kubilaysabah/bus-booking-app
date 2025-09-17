import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/profile']
const publicRoutes = ['/login', '/signup', '/']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  console.log("Middleware - Path:", path, "Protected:", isProtectedRoute, "Public:", isPublicRoute)

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  console.log("Middleware - Cookie exists:", !!cookie)
  const session = await decrypt(cookie)
  console.log("Middleware - Session userId:", session?.userId)
 
  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 5. Redirect to /profile if the user is authenticated and on auth pages
  if (
    isPublicRoute &&
    session?.userId &&
    (path === '/login' || path === '/signup')
  ) {
    console.log("Middleware - Redirecting authenticated user to /profile")
    return NextResponse.redirect(new URL('/profile', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}