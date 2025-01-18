import { query } from '@/lib/database/db';
import { loadQuery } from '@/lib/database/load-query';
import { createResponse } from '@/utils/response';
import { NextResponse } from 'next/server';

const selectUserSQL = loadQuery('src/app/api/users/sql/getAllUsers.sql');

export async function GET() {
	try {
		const users = await query(selectUserSQL, []);

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
