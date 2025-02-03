import { NextResponse } from 'next/server';
import { createResponse } from '@/utils/response'; // Asegúrate de importar tu función de creación de respuestas
import { query } from '@/lib/database/db';
import { loadQuery } from '@/lib/database/load-query';
import { User } from '@/types/user';

const getUserSQL = loadQuery('src/app/api/users/sql/getUser.sql');

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params; // Obtén el ID del usuario desde los parámetros de la ruta

		// Consulta la base de datos para obtener el usuario con el ID proporcionado
		const user = await query(getUserSQL, [id]);
		let foundUser = {} as User;

		if (user.rows.length === 0) {
			return NextResponse.json(
				createResponse(false, {
					error: 'User not found',
					message: 'The requested user does not exist',
				}),
				{ status: 404 }
			);
		}

		if (user.rows.length > 0) {
			foundUser = {
				id: user.rows[0].id,
				firstName: user.rows[0].first_name,
				lastName: user.rows[0].last_name,
				email: user.rows[0].email,
				emailVerified: user.rows[0].email_verified,
				image: user.rows[0].image,
				createdAt: user.rows[0].created_at,
				lastLogin: user.rows[0].last_login,
				phoneNumber: user.rows[0].phone_number,
				address: user.rows[0].address,
				bio: user.rows[0].bio,
				status: user.rows[0].status,
			};
		}

		// Devuelve el usuario encontrado
		return NextResponse.json(
			createResponse(true, {
				data: foundUser,
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
