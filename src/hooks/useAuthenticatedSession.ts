import { useSession } from 'next-auth/react';

export const useAuthenticatedSession = () => {
	const { data: session, status } = useSession();

	return { session, status };
};
