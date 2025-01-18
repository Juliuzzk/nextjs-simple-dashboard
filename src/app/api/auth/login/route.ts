import { query } from '@/lib/database/db';
import { compare } from 'bcryptjs';
import { loadQuery } from '@/lib/database/load-query';
import jwt from 'jsonwebtoken'; // Usa el mismo paquete para firmar tokens
import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const selectUserSQL = loadQuery(
	'src/app/api/auth/login/queries/LoginSelectUser.sql'
);
const selectUserAccessSQL = loadQuery(
	'src/app/api/auth/login/queries/LoginSelectUserAccess.sql'
);

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { email, password } = body;

		// Buscar al usuario en la base de datos
		const resultUser = await query(selectUserSQL, [email]);
		const user = resultUser.rows[0];
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Validar la contraseña
		const isPasswordValid = await compare(password, user.password);
		if (!isPasswordValid) {
			return NextResponse.json(
				{ error: 'Invalid credentials' },
				{ status: 401 }
			);
		}

		// Buscar roles
		const resultRoles = await query(selectUserAccessSQL, [user.email]);

		// Generar el token utilizando la misma estructura que NextAuth
		const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET); // Encode the secret

		const token = await new SignJWT({
			id: user.id,
			email: user.email,
			name: user.name,
			roles: resultRoles.rows,
		})
			.setProtectedHeader({ alg: 'HS256' }) // Algorithm to use (HS256 matches your current setup)
			.setIssuedAt() // Set "iat" (issued at)
			.setExpirationTime('1h') // Set expiration time (same as `expiresIn`)
			.sign(secret); // Sign with the encoded secret
		// Devolver el token al cliente
		return NextResponse.json({
			message: 'Login successful',
			token,
		});
	} catch (error) {
		console.error('Error en el login:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		);
	}
}
