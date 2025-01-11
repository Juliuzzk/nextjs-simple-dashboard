import { query } from '@/lib/db';
import { hash, compare } from 'bcryptjs';
import { loadQuery } from '@/lib/load-query';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { getMessage } from '@/lib/dictionary';
import { getLanguage } from '@/lib/get-lenguaje';
import { NextResponse } from 'next/server';

// Validación del esquema con Zod
const loginSchema = z.object({
	email: z.string().email({ message: 'VALIDATION_INVALID_EMAIL' }),
	password: z.string().min(1, { message: 'VALIDATION_PASSWORD_REQUIRED' }),
});

// Cargar las queries SQL
const selectUserSQL = loadQuery(
	'src/app/api/auth/login/queries/LoginSelectUser.sql'
);

export async function POST(req: Request) {
	try {
		console.log('entre');
		// const { rows } = await query(selectUserSQL, [data.email]);

		return NextResponse.json({ error: 'error' }, { status: 401 });
		const language = getLanguage(req.headers); // Idioma dinámico

		// Parsear el cuerpo de la solicitud
		const body = await req.json();
		const data = loginSchema.parse(body);

		// Buscar al usuario en la base de datos
		const { rows } = await query(selectUserSQL, [data.email]);
		const user = rows[0];
		if (!user) {
			const errorMessage = await getMessage('USER_NOT_FOUND', language);
			return NextResponse.json({ error: errorMessage }, { status: 404 });
		}

		console.log(data.password, user.password);
		// Comparar la contraseña ingresada con el hash almacenado
		if (user.password === null) {
			user.password = '';
		}
		const isPasswordValid = await compare(data.password, user.password);
		user.password = '';
		if (!isPasswordValid) {
			const errorMessage = await getMessage('INVALID_CREDENTIALS', language);

			return NextResponse.json({ error: errorMessage }, { status: 401 });
		}

		// Generar el token JWT
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
			},
			process.env.JWT_SECRET as string,
			{
				expiresIn: process.env.JWT_EXPIRATION || '1h', // Tiempo de expiración configurable
			}
		);

		// Login exitoso
		const successMessage = await getMessage('LOGIN_SUCCESS', language);
		return NextResponse.json(
			{
				message: successMessage,
				token, // Devuelve el token al cliente
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
				},
			},
			{ status: 200 }
		);
	} catch (error) {
		return NextResponse.json({ error: 'catch error' }, { status: 500 });
	}
}
