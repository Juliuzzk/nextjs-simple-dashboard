import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

// Notice this is only an object, not a full Auth.js instance
export default {
	providers: [GitHub, Credentials],
} satisfies NextAuthConfig;
