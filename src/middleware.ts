import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken, JWT } from 'next-auth/jwt';
import { jwtVerify } from 'jose';

interface Role {
	path: string; // Ruta protegida asociada al rol
	ui_code: string; // Código único del rol
	description: string; // Descripción del permiso asociado al rol
}

interface ExtendtedJWT extends JWT {
	roles: Role[]; // Lista de rolesco del token (JWT ID)
}

export async function middleware(request: NextRequest) {
	console.log('INICIO: middleware');
	const url = request.nextUrl;
	const secret = process.env.NEXTAUTH_SECRET || ''; // Asegúrate de que esté definido en tu .env

	const excludedPaths = [
		'/api/auth/', // Prefijo dinámico (excluir todo lo que comience con /api/auth/)
		'/auth/', // Prefijo dinámico (excluir todo lo que comience con /api/auth/)
	];

	// Excluir rutas específicas o rutas que comiencen con un prefijo
	if (
		excludedPaths.some((path) =>
			path.endsWith('/') ? url.pathname.startsWith(path) : url.pathname === path
		)
	) {
		return NextResponse.next(); // Continuar sin aplicar el middleware
	}
	const token: ExtendtedJWT = (await authenticateRequest(
		request,
		secret
	)) as ExtendtedJWT;

	const isAuthenticated = !!token;

	if (!isAuthenticated && url.pathname.startsWith('/dashboard')) {
		return NextResponse.redirect(new URL('/auth/signin', request.url));
	}

	if (isAuthenticated && url.pathname === '/auth/signin') {
		return NextResponse.redirect(new URL('/dashboard/home', request.url));
	}

	// check roles
	console.log('Checking roles: ', process.env.ENABLE_ROLE_ACCESS);
	if (
		!token?.roles.some((role) => role.path === url.pathname) &&
		process.env.ENABLE_ROLE_ACCESS === 'true'
	) {
		console.log('El usuario no tiene acceso a la ruta:', url.pathname);
		//TODO: Need change it to a no access page..
		return NextResponse.json(
			{
				error: 'Forbidden: You do not have permission to access this resource.',
			},
			{ status: 403 }
		);
	}
	// Continuar con la solicitud si todo está correcto
	return NextResponse.next();
}
// Función para autenticar la solicitud
async function authenticateRequest(request: NextRequest, secret: string) {
	// Intentar obtener el token de sesión usando NextAuth
	let token = await getToken({ req: request, secret });

	// Si no hay token, intentar obtenerlo desde el encabezado Authorization
	if (!token) {
		const authHeader = request.headers.get('Authorization');
		if (authHeader) {
			const tokenFromHeader = authHeader.replace('Bearer ', '').trim(); // Quitar el prefijo "Bearer"
			try {
				const jwtSecret = new TextEncoder().encode(secret); // Codificar la clave secreta
				const { payload } = await jwtVerify(tokenFromHeader, jwtSecret); // Verificar el token
				token = payload as ExtendtedJWT; // Asignar el token decodificado
			} catch (err) {
				console.error('Error al verificar el token:', err);
				token = null;
			}
		}
	}

	return token;
}

export const config = {
	matcher: ['/dashboard/:path*', '/auth/:path*', '/api/:path*'], // Aplica a las rutas protegidas
};
