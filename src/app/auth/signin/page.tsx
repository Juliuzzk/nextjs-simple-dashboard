'use client';

import { LoginForm } from '@/components/Auth';
// import { useSession } from '@/hooks/useSession';
import { useSignIn } from '@/hooks/useSignIn';
import { useSignOut } from '@/hooks/useSignOut';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
	// const session = useSession();
	const signIn = useSignIn();
	const signOut = useSignOut();

	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		console.log(session, status);
		if (status === 'authenticated') {
			router.push('/dashboard/home'); // Redirige si el usuario no está autenticado
		}
	}, [status, router]);

	if (status !== 'unauthenticated') {
		return <p>Loading...</p>; // Muestra un estado de carga mientras se verifica
	}

	const login = async (provider: string, email?: string, password?: string) => {
		console.log('Intentando login..');
		const response = await signIn(provider, {
			email: email,
			password: password,
			redirect: true,
		});
		// router.push('/dashboard/home');
	};

	const onLogin = async (
		provider: string,
		email?: string,
		password?: string
	) => {
		await login(provider, email, password);
	};

	return (
		<>
			{status === 'unauthenticated' && (
				<LoginForm handleLogin={onLogin} registerRoute="/auth/register" />
			)}
		</>
	);
}
