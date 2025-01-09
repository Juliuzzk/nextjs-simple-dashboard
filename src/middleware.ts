import logger from '@/utils/logger';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	//TODO:
	// We need to add role control access to url in this middleware, can i create more than one?

	// Obtener el token de sesión (modifica según tu sistema de autenticación)
	const token =
		request.cookies.get('authjs.session-token') ||
		request.cookies.get('next-auth.session-token') ||
		request.cookies.get('__Secure-next-auth.session-token');

	console.log('token: ', token);

	const isAuthenticated = !!token;
	const url = request.nextUrl;

	if (!isAuthenticated && url.pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/auth/signin', request.url));
	}

	if (isAuthenticated && url.pathname === '/auth/signin') {
		return NextResponse.redirect(new URL('/dashboard/home', request.url));
	}

	// Continuar con la solicitud si todo está correcto
	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*'], // Aplica a las rutas protegidas
};
