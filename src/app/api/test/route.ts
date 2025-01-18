import { query } from '@/lib/database/db';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const { rows } = await query('SELECT NOW()');
		return NextResponse.json({ status: 200, time: rows[0].now });
	} catch (error) {
		console.error('Database connection failed:', error);
		return NextResponse.json(
			{ error: 'Database connection failed' },
			{ status: 500 }
		);
	}
}
