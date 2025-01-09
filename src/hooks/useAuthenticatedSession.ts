import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export const useAuthenticatedSession = () => {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		console.log('status: ', status);
		if (status === 'authenticated') {
			console.log('no entro nunca al if..');
			router.push('/dashboard/home');
		}
	}, [status, router]);

	return { session, status };
};
