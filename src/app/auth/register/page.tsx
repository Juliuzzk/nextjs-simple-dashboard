'use client';

import RegisterForm from '@/components/Auth/RegisterForm';
import { useSession } from '@/hooks/useSession';
import { useSignIn } from '@/hooks/useSignIn';
import { useSignOut } from '@/hooks/useSignOut';
import { useApi } from '@/hooks/useApi';

export default function RegisterPage() {
	const session = useSession();
	const signIn = useSignIn();
	const signOut = useSignOut();
	const { callApi, loading, error } = useApi();

	const handleSubmitSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signOut();
	};

	const register = async (name: string, email: string, password: string) => {
		const response = await callApi('/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password }),
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

	const onRegister = async (name: string, email: string, password: string) => {
		await register(name, email, password);
	};

	if (!session) {
		return (
			<RegisterForm
				handleRegister={onRegister}
				loading={loading}
				error={error}
			/>
		);
	}

	return (
		<div className="container mx-auto p-6">
			<div className="w-full p-4 border rounded-lg shadow-md">
				<h2 className="flex flex-col items-center space-y-6">Session Info</h2>
				<pre
					className="w-full bg-black border border-gray-700 mb-4
					p-4 rounded-lg text-sm text-white overflow-x-auto"
				>
					{JSON.stringify(session, null, 2)}
				</pre>
				<form onSubmit={handleSubmitSignOut} className="w-full">
					<button
						type="submit"
						className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
					>
						Sign Out
					</button>
				</form>
			</div>
		</div>
	);
}
