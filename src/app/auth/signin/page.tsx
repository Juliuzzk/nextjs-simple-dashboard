'use client';

import LoginForm from '@/components/auth/loginform/LoginForm';
import { CustomLoader } from '@/components/shared/Loader';
import { useSignIn } from '@/hooks/useSignIn';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SignInPage() {
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const signIn = useSignIn();
	const [loader, setLoader] = useState(false);
	const { data: session, status } = useSession();

	// Redirige automáticamente si el usuario está autenticado
	useEffect(() => {
		if (status === 'authenticated') {
			router.push('/dashboard/home');
			// setLoader(false);
		}
	}, [status, router]);

	// Muestra el loader mientras verifica el estado de la sesión o redirige
	if (status === 'loading' || status === 'authenticated' || loader === true) {
		return <CustomLoader />;
	}

	const onLogin = async (
		provider: string,
		email?: string,
		password?: string
	) => {
		// setLoader(true);
		setError(null);
		const response = await signIn(provider, {
			email: email,
			password: password,
			redirect: false, // Manejar la redirección manualmente
		});

		if (provider === 'credentials') {
			if (!response.success) {
				// setLoader(false);
				setError(response.error || null); // Manejar errores
			}
		}
	};

	return (
		<LoginForm
			handleLogin={onLogin}
			registerRoute="/auth/register"
			error={error}
		/>
	);
}
