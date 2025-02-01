import NextAuth from 'next-auth';

declare module 'next-auth' {
	export interface User {
		id?: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		roles?: string[];
	}

	export interface JWT {
		id?: string;
		email?: string;
		roles?: string[];
	}

	export interface Session {
		user: {
			id?: string;
			firstName?: string;
			lastName?: string;
			email?: string;
			roles?: string[];
		};
	}
}
