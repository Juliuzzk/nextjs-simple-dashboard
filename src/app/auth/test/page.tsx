'use client';

import { useSignOut } from '@/hooks/useSignOut';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
	const signOut = useSignOut();
	const { data: session, status } = useSession();
	const router = useRouter();

	const handleSubmitSignOut = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signOut();
	};

	useEffect(() => {
		console.log(session, status);
		if (status === 'unauthenticated') {
			router.push('/auth/signin'); // Redirige si el usuario no está autenticado
		}
	}, [status, router]);

	if (status === 'loading') {
		return <p>Loading...</p>; // Muestra un estado de carga mientras se verifica
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
