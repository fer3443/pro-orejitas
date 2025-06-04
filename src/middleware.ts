import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-user')?.value

  // Si el usuario tiene sesión activa y quiere entrar a login o register
  const isAuthPage = request.nextUrl.pathname === '/auth/login' || request.nextUrl.pathname === '/auth/register'

  if (token && isAuthPage) {
    // Redirigimos a dashboard (o cualquier ruta protegida)
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// Aplica el middleware solo a las rutas /login y /register
export const config = {
  matcher: ['/auth/login', '/auth/register'],
}