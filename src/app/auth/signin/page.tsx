'use client';

import { LoginForm } from '@/components/Auth';
import { CustomLoader } from '@/components/shared/Loader';
import { useAuthenticatedSession } from '@/hooks/useAuthenticatedSession';
import { useSignIn } from '@/hooks/useSignIn';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
	const { session, status } = useAuthenticatedSession();
	const router = useRouter();

	const signIn = useSignIn();

	if (status === 'loading') {
		console.log('loading: ', status);
		return <CustomLoader />;
	}

	const login = async (provider: string, email?: string, password?: string) => {
		console.log('Intentando login...');
		const response = await signIn(provider, {
			email: email,
			password: password,
			redirect: false, // Manejar la redirección manualmente
		});
	};

	const onLogin = async (
		provider: string,
		email?: string,
		password?: string
	) => {
		await login(provider, email, password);
		//TODO: si resp viene con error debemos realizar algo..
	};

	return (
		<>
			{status === 'unauthenticated' && (
				<LoginForm handleLogin={onLogin} registerRoute="/auth/register" />
			)}
		</>
	);
}
