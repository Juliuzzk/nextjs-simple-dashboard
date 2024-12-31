'use client';

import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function SignIn() {
	const { session, signIn, signOut } = useAuth();
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handleSubmitCredentials = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();

		try {
			const response = await signIn('credentials', {
				redirect: false,
				email,
				password,
			});
			setError(response.message ? response.message : '');
		} catch (err) {
			setError(err as string);
		}
	};
	const handleSubmitGitHub = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			signIn('github', { redirect: false });
			setError('');
		} catch (err) {
			setError(err as string);
		}
	};
	const handleSubmitSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signOut();
	};

	if (!session) {
		return (
			<div className="container mx-auto p-6">
				<div className="flex flex-col items-center space-y-6">
					{error && <p>{error}</p>}
					<form
						onSubmit={handleSubmitCredentials}
						className="w-full max-w-sm p-4 border rounded-lg shadow-md"
					>
						<h2 className="text-xl font-semibold text-center mb-4">Sign In</h2>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Email</label>
							<input
								name="email"
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-1">Password</label>
							<input
								name="password"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
						>
							Sign In
						</button>
					</form>
					<form onSubmit={handleSubmitGitHub} className="w-full max-w-sm">
						<button
							type="submit"
							className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-800 transition"
						>
							Sign in with GitHub
						</button>
					</form>
					<div className="text-gray-600">Not authenticated</div>
				</div>
			</div>
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
