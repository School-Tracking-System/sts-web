import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8000/api/v1";

export async function middleware(request: NextRequest) {
  const isAuthRoute = request.nextUrl.pathname.startsWith('/login');
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
  
  const sessionToken = request.cookies.get('session_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  // 1. Redirigir al dashboard si ya hay sesión y se intenta ir al login
  if (isAuthRoute) {
    if (sessionToken) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // 2. Manejo de rutas protegidas (Dashboard)
  if (isDashboardRoute) {
    // Si no hay token de sesión pero hay de refresco, intentamos renovar
    if (!sessionToken && refreshToken) {
      try {
        const response = await fetch(`${GATEWAY_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (response.ok) {
          const data = await response.json();
          const nextResponse = NextResponse.next();
          
          // Actualizamos las cookies en la respuesta
          nextResponse.cookies.set('session_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60,
            path: "/",
          });
          nextResponse.cookies.set('refresh_token', data.refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          
          return nextResponse;
        }
      } catch (error) {
        console.error("[middleware] Refresh fallback failed:", error);
      }
    }

    // Si finalmente no hay sesión válida, al login
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
