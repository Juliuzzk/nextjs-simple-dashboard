/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from 'pg';

interface DBConfig {
	user: string;
	host: string;
	database: string;
	password: string;
	port: number;
}

// Configura la conexión al pool de PostgreSQL
const pool = new Pool({
	user: process.env.PG_USER as string,
	host: process.env.PG_HOST as string,
	database: process.env.PG_DATABASE as string,
	password: process.env.PG_PASSWORD as string,
	port: parseInt(process.env.PG_PORT || '5432'),
} as DBConfig);

export const query = (text: string, params?: any[]): Promise<any> => {
	return pool.query(text, params);
};

export default pool;
