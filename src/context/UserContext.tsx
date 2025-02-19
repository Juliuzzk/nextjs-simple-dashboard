import { createContext, useContext, useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { fetchUserById } from '@/services/api/users';
import { User } from '@/types/user';

interface UserContextProps {
	user: User | null;
	setUser: (user: User | null) => void;
	updateAvatar: (newAvatar: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const { data: session } = useSession();
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		if (session?.user?.id) {
			// Obtener la información del usuario al cargar la página
			fetchUserById(session.user.id).then((response) => {
				if (response.data) {
					const user: User = response.data;
					setUser(user);
				}
			});
		}
	}, [session]);

	const updateAvatar = (newAvatar: string) => {
		if (user) {
			setUser({ ...user, image: newAvatar });
		}
	};

	return (
		<UserContext.Provider value={{ user, setUser, updateAvatar }}>
			{children}
		</UserContext.Provider>
	);
};
