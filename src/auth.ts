import { loadQuery } from '@/lib/load-query';
import { query } from '@/lib/db';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import logger from './utils/logger';

const selectUserSQL = loadQuery(
	'src/app/api/auth/login/queries/LoginSelectUser.sql'
);

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: { strategy: 'jwt' },
	providers: [
		GitHub,
		Credentials({
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				logger.info('Esto es una prueba');
				// Buscar al usuario en la base de datos
				const { rows } = await query(selectUserSQL, [credentials.email]);
				const user = rows[0];

				if (!user) {
					return null;
				}

				const isPasswordValid = await compare(
					credentials.password as string,
					user.password
				);
				if (!isPasswordValid) {
					return null;
				}

				return user;
			},
		}),
	],
});
