import { useAuth } from '@/context/AuthContext';

export const useSignIn = () => {
	const { signIn } = useAuth();
	return signIn;
};
