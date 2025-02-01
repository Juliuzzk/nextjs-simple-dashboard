import { query } from '@/lib/database/db';
import { getMessage } from '@/lib/database/dictionary';
import { loadQuery } from '@/lib/database/load-query';
import { getLanguage } from '@/lib/get-lenguaje';
import { updateUserProfileSchema } from '@/lib/schema/update-user-profile-schema';
import { translateZodErrors } from '@/lib/zod-utils';
import logger from '@/utils/logger';
import { createResponse } from '@/utils/response';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const getAllUsersSQL = loadQuery('src/app/api/users/sql/getAllUsers.sql');
const updateUserSQL = loadQuery('src/app/api/users/sql/updateUser.sql');

export async function GET() {
	try {
		const users = await query(getAllUsersSQL, []);

		return NextResponse.json(
			createResponse(true, {
				data: users.rows,
				message: 'OK',
			}),
			{ status: 200 }
		);
	} catch (err: unknown) {
		const error =
			err instanceof Error ? err.message : 'An unknown error occurred';

		return NextResponse.json(
			createResponse(false, {
				error,
				message: 'An unexpected error occurred',
			}),
			{
				status: 500,
			}
		);
	}
}

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { id, updates } = updateUserProfileSchema.parse(body);

		console.log(id, updates);
		const response = await query(updateUserSQL, [
			id,
			updates.first_name,
			updates.last_name,
			updates.phone_number,
			updates.address,
			updates.bio,
		]);

		console.log(response);

		return NextResponse.json(
			createResponse(true, {
				message: 'User updated successfully',
			}),
			{ status: 200 }
		);
	} catch (error: unknown) {
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
