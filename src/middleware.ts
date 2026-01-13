import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = [
    '/',
    '/auth',
    '/login',
    '/terms',
    '/privacy',
    '/help',
    '/api/auth/login',
    '/api/auth/register',
  ];
  
  // Verificar se a rota é pública
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Verificar se tem token de autenticação
  const token = request.cookies.get('sb-access-token');

  if (!token) {
    // Redirecionar para auth se não estiver autenticado
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
