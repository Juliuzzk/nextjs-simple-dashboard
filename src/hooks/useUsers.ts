import { useState, useEffect } from 'react';
import { useApi } from '@/hooks/useApi';

interface User {
	name: string;
	email: string;
	image: string;
	created_at: Date;
}

export const useUsers = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const { callApi } = useApi<User[]>(); // Especifica el tipo genérico aquí

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				setIsLoading(true);

				const response = await callApi(`/api/users`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Accept-Language': 'es',
					},
				});

				if (response.success) {
					setUsers(response.data || []); // Maneja el caso en que `data` sea opcional
				} else {
					console.error(
						'Error fetching users:',
						response.error || 'Unknown error'
					);
				}
			} catch (err) {
				console.error('Unexpected error:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchUsers();
	}, []);

	return { users, isLoading };
};
