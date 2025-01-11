import NextAuth from 'next-auth';

declare module 'next-auth' {
	export interface User {
		id?: string;
		name?: string | null;
		email?: string | null;
		image?: string | null;
		roles?: string[];
	}

	interface JWT {
		id?: string;
		email?: string;
		roles?: string[];
	}

	interface Session {
		user: {
			id?: string;
			email?: string;
			roles?: string[];
		};
	}
}
