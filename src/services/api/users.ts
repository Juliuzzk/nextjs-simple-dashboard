import { User } from '@/types/user';
import { callApi } from '@/services/call-api';

const API_BASE_URL = '/api/users';

export async function fetchAllUsers() {
	return callApi(`${API_BASE_URL}`);
}

export async function fetchUserById(id: string) {
	return callApi<User>(`${API_BASE_URL}/${id}`);
}

export async function updateUser(user: User) {
	console.log('llegue a updateUser');

	const userData = {
		id: user.id,
		updates: {
			first_name: user.firstName,
			last_name: user.lastName,
			phone_number: user.phoneNumber,
			image: user.image,
			address: user.address,
			bio: user.bio,
		},
	};

	return callApi(
		`${API_BASE_URL}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		},
		'all'
	);
}
