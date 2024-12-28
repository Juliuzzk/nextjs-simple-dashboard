import { loadQuery } from '@/lib/load-query';
import { query } from '@/lib/db';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import PostgresAdapter from '@auth/pg-adapter';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';

// Cargar las queries SQL
const selectUserSQL = loadQuery(
	'src/app/api/auth/login/queries/LoginSelectUser.sql'
);

const pool = new Pool({
	host: process.env.PG_HOST,
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PostgresAdapter(pool),
	session: { strategy: 'jwt' },
	providers: [
		GitHub,
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				// Buscar al usuario en la base de datos
				const { rows } = await query(selectUserSQL, [credentials.email]);
				const user = rows[0];

				if (!user) {
					throw new Error('User Not Found');
				}
				console.log('Credentials: ', credentials);

				const isPasswordValid = await bcrypt.compare(
					credentials.password as string,
					user.password
				);
				if (!isPasswordValid) {
					throw new Error('User Not Found');
				}

				return user;
			},
			// authorize: async (credentials) => {
			// 	let user = null;
			//
			// 	console.log('Credentials: ', credentials);
			//
			// 	throw new Error('Invalid check my Throw.');
			// 	// return user object with their profile data
			//
			// 	return user;
			// },
		}),
	],
});
