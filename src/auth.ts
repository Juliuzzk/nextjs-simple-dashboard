import { loadQuery } from '@/lib/database/load-query';
import { query } from '@/lib/database/db';
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
		const user = rows[0];

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
			if (user) {
				try {
					// Fetch roles from the database
					const resultRoles = await query(selectUserAccessSQL, [user.email]);
					// Add properties to the token
					token.id = user.id;
					token.email = user.email;
					token.roles = resultRoles.rows || []; // Default to an empty array if no roles are returned
				} catch (error) {
					console.error('Error fetching user roles:', error);
					token.roles = []; // Ensure token.roles is always defined
				}
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				id: token.id as string,
				name: session.user.name,
				email: token.email as string,
				emailVerified: token.emailVerified
					? new Date(token.emailVerified as string)
					: null,
			};
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Redirige al home después del login exitoso
			return baseUrl + '/dashboard'; // `baseUrl` es la URL base de tu aplicación (por ejemplo, http://localhost:3000)
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});
