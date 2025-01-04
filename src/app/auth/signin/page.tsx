'use client';

import { LoginForm } from '@/components/Auth';
import { useSession } from '@/hooks/useSession';
import { useSignIn } from '@/hooks/useSignIn';
import { useSignOut } from '@/hooks/useSignOut';

export default function SignIn() {
	const session = useSession();
	const signIn = useSignIn();
	const signOut = useSignOut();

	const handleSubmitSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signOut();
	};

	const login = async (provider: string, email?: string, password?: string) => {
		console.log('Intentando login..');
		const response = await signIn(provider, {
			email: email,
			password: password,
			redirect: false,
		});
		console.log(response);
	};

	const onLogin = async (
		provider: string,
		email?: string,
		password?: string
	) => {
		await login(provider, email, password);
	};

	// if (session === null) {
	// 	return (
	// 		<div className="flex items-center justify-center h-screen">
	// 			<p>Loading...</p>
	// 		</div>
	// 	);
	// }

	if (!session) {
		return <LoginForm handleLogin={onLogin} registerRoute={'/auth/register'} />;
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
