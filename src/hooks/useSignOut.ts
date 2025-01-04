import { useAuth } from '@/context/AuthContext';

export const useSignOut = () => {
	const { signOut } = useAuth();
	return signOut;
};
