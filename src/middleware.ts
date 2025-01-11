import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
	const secret = process.env.NEXTAUTH_SECRET; // Asegúrate de que esté definido en tu .env
	console.log('INICIO: middleware');

	//TODO:
	// We need to add role control access to url in this middleware, can i create more than one?

	// Obtener el token de sesión (modifica según tu sistema de autenticación)
	const token =
		request.cookies.get('authjs.session-token') ||
		request.cookies.get('next-auth.session-token') ||
		request.cookies.get('__Secure-next-auth.session-token');

	//TODO: falta validacion de token, solo lo obtiene pero no valida..
	const isAuthenticated = !!token;

	// Obtén el token del request
	const token2 = await getToken({ req: request, secret });
	console.log(request.nextUrl.pathname);

	console.log('token2: ', token2);
	//Obtenemos accesos que posee el usuario

	const url = request.nextUrl;

	if (!isAuthenticated && url.pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/auth/signin', request.url));
	}

	if (isAuthenticated && url.pathname === '/auth/signin') {
		return NextResponse.redirect(new URL('/dashboard/home', request.url));
	}

	console.log('FIN: middleware');
	// Continuar con la solicitud si todo está correcto
	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*', '/api/:path*'], // Aplica a las rutas protegidas
};
