'use server';
import { signIn, signOut } from '@/auth';
import { createResponse } from '@/utils/response';

export const SignInGithub = async (provider?: string) => {
	const res = await signIn(provider, {
		redirect: true,
	});

	return res;
};

export const SignInCredentials = async (formData?: {
	email?: string;
	password?: string;
	redirect?: boolean;
}) => {
	try {
		console.log(formData);
		const res = await signIn('credentials', formData);

		return createResponse(true, {
			data: res,
		});
	} catch (err) {
		const error =
			err instanceof Error ? err.message : 'An unknown error occurred';
		console.log('mi error: ', error);
		return createResponse(false, {
			error: 'Email or password is incorrect.',
		});
	}
};

export const SignOut = async () => {
	return await signOut();
};
