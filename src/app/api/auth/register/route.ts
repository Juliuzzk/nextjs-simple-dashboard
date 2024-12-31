import { query } from '@/lib/db';
import { loadQuery } from '@/lib/load-query';
import { getLanguage } from '@/lib/get-lenguaje';
import { hash, compare } from 'bcryptjs';
import { getMessage } from '@/lib/dictionary';
import { z } from 'zod';
import { NextResponse } from 'next/server';

const registerSchema = z.object({
	name: z.string().min(1, { message: 'VALIDATION_STRING_MIN_NAME' }), // Código del diccionario
	email: z.string().email({ message: 'VALIDATION_INVALID_EMAIL' }), // Código del diccionario
	password: z.string().min(6, { message: 'VALIDATION_STRING_MIN_PASSWORD' }), // Código del diccionario
});

// Cargar las queries SQL
const selectUserSQL = loadQuery(
	'src/app/api/auth/register/queries/RegisterSelectUser.sql'
);
const insertUserSQL = loadQuery(
	'src/app/api/auth/register/queries/RegisterInsertUser.sql'
);

export async function POST(req: Request) {
	try {
		// Determinar el idioma dinámicamente
		const language = getLanguage(req.headers); // Idioma por defecto: "es"

		// Parsear el cuerpo de la solicitud
		const body = await req.json();
		const data = registerSchema.parse(body);

		// Verificar si el usuario ya existe
		const userCheck = await query(selectUserSQL, [data.email]);
		if (userCheck.rows.length > 0) {
			const errorMessage = await getMessage('USER_ALREADY_EXISTS', language);
			return NextResponse.json({ error: errorMessage }, { status: 400 });
		}

		// Hashear la contraseña
		const hashedPassword = await hash(data.password, 10);

		// Insertar el usuario en la base de datos
		await query(insertUserSQL, [data.name, data.email, hashedPassword]);

		const successMessage = await getMessage('REGISTER_SUCCESS', language);
		return NextResponse.json({ message: successMessage }, { status: 201 });
	} catch (error) {
		// Determinar el idioma dinámicamente
		const language = getLanguage(req.headers); // Idioma por defecto: "es"

		// Manejar errores de validación con mensajes multilenguaje
		if (error instanceof z.ZodError) {
			const errors = await Promise.all(
				error.errors.map(async (err) => {
					const translatedMessage = await getMessage(err.message, language);
					return {
						path: err.path,
						message: translatedMessage || err.message,
					};
				})
			);
			return NextResponse.json({ errors }, { status: 400 });
		}

		const errorMessage = await getMessage('INTERNAL_SERVER_ERROR', language);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
