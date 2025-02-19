import { NextResponse } from 'next/server';
import { Response } from '@/types/response';
import db from '@/lib/database/db';
import { createResponse } from '@/utils/response';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const language = searchParams.get('lang') || 'en';

		const result = await db.query(
			'SELECT code, message FROM dictionary WHERE language = $1',
			[language]
		);

		if (result.rowCount === 0) {
			return NextResponse.json(
				createResponse(false, { error: 'No translations found' }),
				{ status: 404 }
			);
		}

		// Convertir el resultado en un objeto { "CODE": "Mensaje" }
		const dictionary = result.rows.reduce((acc: any, row: any) => {
			acc[row.code] = row.message;
			return acc;
		}, {});

		return NextResponse.json(createResponse(true, { data: dictionary }));
	} catch (error) {
		console.error('Database error:', error);
		return NextResponse.json(
			createResponse(false, { error: 'Failed to fetch dictionary' }),
			{ status: 500 }
		);
	}
}
