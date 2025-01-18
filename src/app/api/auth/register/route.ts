import { query } from '@/lib/database/db';
import { loadQuery } from '@/lib/database/load-query';
import { getLanguage } from '@/lib/get-lenguaje';
import { hash } from 'bcryptjs';
import { getMessage } from '@/lib/database/dictionary';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import logger from '@/utils/logger';
import { createResponse } from '@/utils/response';
import { translateZodErrors } from '@/lib/zod-utils';

// Definición de esquema de validación
const registerSchema = z
	.object({
		name: z.string().min(1, { message: 'VALIDATION_STRING_MIN_NAME' }), // Código del diccionario
		email: z
			.string({ required_error: 'VALIDATION_STRING_REQUIRED_EMAIL' })
			.min(1, { message: 'VALIDATION_STRING_REQUIRED_EMAIL' })
			.email({ message: 'VALIDATION_INVALID_EMAIL' }), // Código del diccionario
		password: z
			.string({ required_error: 'VALIDATION_STRING_REQUIRED_PASSWORD' })
			.min(6, { message: 'VALIDATION_STRING_MIN_PASSWORD' }), // Código del diccionario
		confirmPassword: z
			.string({ required_error: 'VALIDATION_STRING_REQUIRED_CONFIRM_PASSWORD' })
			.min(1, { message: 'VALIDATION_STRING_REQUIRED_CONFIRM_PASSWORD' }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'VALIDATION_PASSWORDS_DO_NOT_MATCH', // Código del diccionario
	});

// Queries SQL
const selectUserSQL = loadQuery(
	'src/app/api/auth/register/queries/RegisterSelectUser.sql'
);
const insertUserSQL = loadQuery(
	'src/app/api/auth/register/queries/RegisterInsertUser.sql'
);

export async function POST(req: Request) {
	try {
		// Determinar el idioma dinámicamente
		const language = getLanguage(req.headers) || 'en';

		// Parsear el cuerpo de la solicitud
		const body = await req.json();
		const data = registerSchema.parse(body);

		// Verificar si el usuario ya existe
		const userCheck = await query(selectUserSQL, [data.email]);
		if (userCheck.rows.length > 0) {
			const errorMessage = await getMessage('USER_ALREADY_EXISTS', language);
			return NextResponse.json(
				createResponse(false, {
					data: null,
					error: errorMessage,
				}),
				{ status: 400 }
			);
		}

		// Hashear la contraseña
		const hashedPassword = await hash(data.password, 10);

		// Insertar el usuario en la base de datos
		await query(insertUserSQL, [data.name, data.email, hashedPassword]);

		// Respuesta de éxito
		const successMessage = await getMessage('REGISTER_SUCCESS', language);
		return NextResponse.json(
			createResponse(true, {
				message: successMessage,
			}),
			{ status: 201 }
		);
	} catch (error) {
		logger.error('api/auth/register/route.ts', { error });

		const language = getLanguage(req.headers) || 'en';

		if (error instanceof z.ZodError) {
			// Manejar errores de validación de Zod
			const errors = await translateZodErrors(error, language, getMessage);
			const response = createResponse(false, {
				data: errors,
				error: 'Validation errors occurred',
			});

			logger.error('api/auth/register/route.ts', {
				validationErrors: response,
			});
			return NextResponse.json(response, { status: 400 });
		}

		// Manejar errores inesperados
		const errorMessage = await getMessage('INTERNAL_SERVER_ERROR', language);
		return NextResponse.json(
			createResponse(false, {
				error: errorMessage,
				message: 'An unexpected error occurred',
			}),
			{ status: 500 }
		);
	}
}
