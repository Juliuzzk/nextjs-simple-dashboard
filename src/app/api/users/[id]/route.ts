import { NextResponse } from 'next/server';
import { createResponse } from '@/utils/response'; // Asegúrate de importar tu función de creación de respuestas
import { query } from '@/lib/database/db';
import { loadQuery } from '@/lib/database/load-query';

const getUserSQL = loadQuery('src/app/api/users/sql/getUser.sql');

export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const { id } = await params; // Obtén el ID del usuario desde los parámetros de la ruta

		// Consulta la base de datos para obtener el usuario con el ID proporcionado
		const user = await query(getUserSQL, [id]);

		if (user.rows.length === 0) {
			return NextResponse.json(
				createResponse(false, {
					error: 'User not found',
					message: 'The requested user does not exist',
				}),
				{ status: 404 }
			);
		}

		// Devuelve el usuario encontrado
		return NextResponse.json(
			createResponse(true, {
				data: user.rows[0],
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
