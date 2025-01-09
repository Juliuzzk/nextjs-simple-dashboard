'use client';

import RegisterForm from '@/components/Auth/RegisterForm';
import { useSignIn } from '@/hooks/useSignIn';
import { useSignOut } from '@/hooks/useSignOut';
import { useApi } from '@/hooks/useApi';
import { useAuthenticatedSession } from '@/hooks/useAuthenticatedSession';

export default function RegisterPage() {
	// Usar el hook personalizado para manejar la sesión
	const { session, status } = useAuthenticatedSession();
	const signIn = useSignIn();
	const signOut = useSignOut();
	const { callApi, loading, error } = useApi();

	const handleSubmitSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signOut();
	};

	const register = async (
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	) => {
		const response = await callApi('/api/auth/register', {
			method: 'POST',
			//TODO: Definir variable global para manejo de idiomas en diccionario
			headers: { 'Content-Type': 'application/json', 'Accept-Language': 'es' },
			body: JSON.stringify({ name, email, password, confirmPassword }),
		});

		if (response.success) {
			console.log('Registro exitoso:', response.data);

			// Opcional: iniciar sesión automáticamente después del registro
			await signIn('credentials', {
				email,
				password,
				redirect: false,
			});
		} else {
			console.error('Error en el registro:', response.error || 'Unknown error');
		}
	};

	const onRegister = async (
		name: string,
		email: string,
		password: string,
		confirmPassword: string
	) => {
		await register(name, email, password, confirmPassword);
	};

	return (
		<>
			{status === 'unauthenticated' && (
				<RegisterForm
					handleRegister={onRegister}
					loading={loading}
					error={error}
				/>
			)}
		</>
	);
}
