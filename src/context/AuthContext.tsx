'use client';
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';
import { SignInGithub, SignInCredentials, SignOut } from '@/lib/auth-action';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { createResponse } from '@/utils/response';

interface AuthContextProps {
	session: Session | null;
	signIn: (
		provider: string,
		formData?: { email?: string; password?: string; redirect: boolean }
	) => Promise<{ success: boolean; message?: string; error?: string }>;
	signOut: () => Promise<void>;
}
// Crea el contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [session, setSession] = useState<Session | null>(null);

	// Cargar la sesión inicial
	useEffect(() => {
		const fetchSession = async () => {
			const currentSession = await getSession();
			setSession(currentSession);
		};
		fetchSession();
	}, []);

	const handleSignIn: AuthContextProps['signIn'] = async (
		provider,
		formData
	) => {
		try {
			let response: { success: boolean; message?: string; error?: string } = {
				success: false,
			};

			if (provider === 'github') {
				await SignInGithub(provider);
				// Si llego aqui, todo esta OK
				// return createResponse(true, { data: res });
			} else if (provider === 'credentials' && formData) {
				response = await SignInCredentials('credentials', formData);
			} else {
				return createResponse(false, {
					error: `provider ${provider} not supported`,
				});
			}
			const updatedSession = await getSession();
			setSession(updatedSession);

			return response;
		} catch (err) {
			const error = err instanceof Error ? err.message : 'An unknown error';
			return createResponse(false, {
				error: error,
			});
		}
	};

	const handleSignOut = async () => {
		setSession(null);
		await SignOut();
	};

	return (
		<AuthContext.Provider
			value={{ session, signIn: handleSignIn, signOut: handleSignOut }}
		>
			{children}
		</AuthContext.Provider>
	);
};

// Hook para usar el contexto
export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
