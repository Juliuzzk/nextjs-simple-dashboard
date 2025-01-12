import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	// Obtener el encabezado Authorization
	const authHeader = req.headers.get('Authorization');

	// Validar si existe el encabezado Authorization
	if (!authHeader) {
		return NextResponse.json(
			{ error: 'Unauthorized. No token provided.' },
			{ status: 401 }
		);
	}

	// Extraer el token eliminando el prefijo "Bearer "
	const token = authHeader.replace('Bearer ', '').trim();

	// Validar si el token está vacío después de eliminar el prefijo
	if (!token) {
		return NextResponse.json(
			{ error: 'Unauthorized. Token is empty.' },
			{ status: 401 }
		);
	}

	try {
		// Verificar el token usando la clave secreta
		const secret = process.env.NEXTAUTH_SECRET as string;

		if (!secret) {
			console.error('Secret key is missing in the environment variables.');
			return NextResponse.json(
				{ error: 'Internal server error. Secret key is missing.' },
				{ status: 500 }
			);
		}

		const decoded = jwt.verify(token, secret);

		// Token válido, responder con información decodificada
		return NextResponse.json(
			{
				message: 'Access granted!',
				user: decoded, // Información del token decodificado
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error('Token verification failed:', error);
		return NextResponse.json(
			{ error: 'Invalid or expired token.' },
			{ status: 401 }
		);
	}
}
