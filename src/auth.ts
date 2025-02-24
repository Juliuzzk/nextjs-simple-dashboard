import { loadQuery } from '@/lib/database/load-query';
import { query } from '@/lib/database/db';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import logger from './utils/logger';
import { kill } from 'process';

const selectUserSQL = loadQuery(
	'src/app/api/auth/login/queries/LoginSelectUser.sql'
);

const selectUserAccessSQL = loadQuery(
	'src/app/api/auth/login/queries/LoginSelectUserAccess.sql'
);

const insertUserSQL = loadQuery(
	'src/app/api/auth/register/queries/RegisterInsertUser.sql'
);

function parseName(fullName: string) {
	// Normalizar espacios y eliminar excesos
	const normalized = fullName.trim().replace(/\s+/g, ' ');

	// Dividir en partes
	const parts = normalized.split(' ');

	// Caso 1: Solo nombre y apellido
	if (parts.length === 2) {
		return {
			first_name: parts[0],
			last_name: parts[1],
		};
	}

	// Caso 2: Dos nombres y dos apellidos
	if (parts.length === 4) {
		return {
			first_name: `${parts[0]} ${parts[1]}`,
			last_name: `${parts[2]} ${parts[3]}`,
		};
	}

	// Caso 3: Dos nombres y un apellido
	if (parts.length === 3) {
		return {
			first_name: `${parts[0]} ${parts[1]}`,
			last_name: parts[2],
		};
	}

	// Caso por defecto (cualquier otra combinación)
	return {
		first_name: parts[0],
		last_name: parts.slice(1).join(' ') || 'Sin apellido',
	};
}

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
		GitHub({}),
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
		async signIn({ user, account, profile }) {
			console.log('signIn callback triggered');
			console.log('Provider:', account?.provider);

			if (account?.provider === 'github') {
				console.log(profile);
				const { first_name, last_name } = parseName(
					(profile?.name as string) || (profile?.login as string) || 'Usuario'
				);

				const { rows } = await query(insertUserSQL, [
					first_name,
					last_name,
					profile?.email,
					'',
				]);
			}

			return true;
		},
		async jwt({ token, user }) {
			if (user) {
				try {
					// Fetch roles from the database
					const resultRoles = await query(selectUserAccessSQL, [user.email]);
					// Add properties to the token
					token.id = user.id;
					token.email = user.email;
					token.roles = resultRoles.rows || []; // Default to an empty array if no roles are returned

					const { first_name, last_name } = parseName(
						(user.name as string) || ''
					);

					token.firstName = first_name;
					token.lastName = last_name;
				} catch (error) {
					console.error('Error fetching user roles:', error);
					token.roles = []; // Ensure token.roles is always defined
				}
			}
			return token;
		},
		async session({ session, token }) {
			console.log(session.user);
			session.user = {
				id: token.id as string,
				firstName: token.firstName as string,
				lastName: token.lastName as string,
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
