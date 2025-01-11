import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	// Obtener el encabezado Authorization
	const authHeader = req.headers.get('Authorization');

	// Validar si existe el encabezado Authorization
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return NextResponse.json(
			{ error: 'Unauthorized. No token provided.' },
			{ status: 401 }
		);
	}

	const token = authHeader.split(' ')[1]; // Extraer el token

	try {
		// Verificar el token usando la clave secreta
		const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);

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
