import { useAuth } from '@/context/AuthContext';

export const useSession = () => {
	const { session } = useAuth();
	return session;
};
