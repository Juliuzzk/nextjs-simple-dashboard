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

const selectUserAccessSQL = loadQuery(
	'src/app/api/auth/login/queries/LoginSelectUserAccess.sql'
);

async function authenticateUser(email: string, password: string) {
	try {
		// Fetch user from the database
		const { rows } = await query(selectUserSQL, [email]);
		let user = rows[0];

		if (!user) {
			logger.warn(`Authentication failed: User not found for email ${email}`);
			return null;
		}

		// Validate password
		const isPasswordValid = await compare(password, user.password);
		if (!isPasswordValid) {
			logger.warn(`Authentication failed: Invalid password for email ${email}`);
			return null;
		}

		const resultRoles = await query(selectUserAccessSQL, [user.id]);
		const roles = resultRoles.rows;

		user.roles = roles;
		// Return user object if authentication is successful
		return user;
	} catch (error) {
		if (error instanceof Error) {
			logger.error(`Error during authentication: ${error.message}`);
		} else {
			logger.error('An unknown error occurred during authentication');
		}
		throw new Error('Authentication failed');
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	session: { strategy: 'jwt' },
	providers: [
		GitHub,
		Credentials({
			// credentials: {
			// 	email: { label: 'Email', type: 'text' },
			// 	password: { label: 'Password', type: 'password' },
			// },
			authorize: async (credentials) => {
				if (!credentials?.email || !credentials?.password) {
					logger.warn('Missing email or password in credentials');
					return null;
				}

				logger.info(`Authenticating user: ${credentials.email}`);
				// Authenticate user
				return await authenticateUser(
					credentials.email as string,
					credentials.password as string
				);
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// console.log('jwt: ');
			// console.log(user);
			if (user) {
				token.id = user.id; // Agrega el ID del usuario
				token.email = user.email; // Agrega el email del usuario
				token.roles = user.roles;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id as string,
				email: token.email as string,
				emailVerified: token.emailVerified
					? new Date(token.emailVerified as string)
					: null,
			};
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});
