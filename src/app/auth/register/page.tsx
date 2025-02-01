'use client';

import { useSignIn } from '@/hooks/useSignIn';
import { useApi } from '@/hooks/useApi';
import { useAuthenticatedSession } from '@/hooks/useAuthenticatedSession';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/auth/registerform/RegisterForm';

export default function RegisterPage() {
	// Usar el hook personalizado para manejar la sesión
	const { status } = useAuthenticatedSession();
	const signIn = useSignIn();
	const { callApi, loading, error } = useApi();
	const [err, setErr] = useState<string | null>(null);
	const router = useRouter();

	const onRegister = async (
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		confirmPassword: string
	) => {
		const response = await callApi('/api/auth/register', {
			method: 'POST',
			//TODO: Definir variable global para manejo de idiomas en diccionario
			headers: { 'Content-Type': 'application/json', 'Accept-Language': 'es' },
			body: JSON.stringify({
				firstName,
				lastName,
				email,
				password,
				confirmPassword,
			}),
		});

		if (response.success) {
			console.log('Registro exitoso:', response.data);

			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});
			if (result.success) {
				router.push('/dashboard');
			} else {
				setErr(result.error || null);
			}
		} else {
			console.error('Error en el registro:', response.error || 'Unknown error');
			setErr(response.error || null);
		}
	};

	return (
		<>
			{status === 'unauthenticated' && (
				<RegisterForm
					handleRegister={onRegister}
					loading={loading}
					error={err}
				/>
			)}
		</>
	);
}
