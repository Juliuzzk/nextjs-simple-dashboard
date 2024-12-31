'use server';
import { signIn, signOut } from '@/auth';
import logger from '@/utils/logger';

export const SignInGithub = async (provider?: string) => {
	return await signIn(provider);
};

export const SignInCredentials = async (
	provider?: string,
	formData?: { email?: string; password?: string; redirect?: boolean }
) => {
	try {
		const res = await signIn(provider, formData);
		return {
			success: true,
			data: res,
		};
	} catch (err) {
		return {
			success: false,
			message: 'Email or password is incorrect.',
		};
	}
};

export const SignOut = async () => {
	return await signOut();
};
