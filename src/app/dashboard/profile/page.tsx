'use client';

import { ProfileForm } from '@/components/dashboard/profile/ProfileForm';
import { ProfileImageCard } from '@/components/dashboard/profile/ProfileImageCard';
import { fetchUserById, updateUser } from '@/services/api/users';
import { User } from '@/types/user';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		id: '',
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: '',
		address: '',
		bio: '',
	});

	useEffect(() => {
		const userId = '2'; // <-- Reemplaza con el ID correcto
		async function loadUser() {
			const response = await fetchUserById(userId);
			if (response.success) {
				console.log('API Response:', response.data);

				const formattedUser: User = {
					id: response.data.id || '',
					firstName: response.data.first_name || '',
					lastName: response.data.last_name || '',
					email: response.data.email || '',
					phoneNumber: response.data.phone_number || '',
					address: response.data.address || '',
					bio: response.data.bio || '',
					status: response.data.status || 'ACT',
				};

				setUser(formattedUser);
			} else {
				setError(response.error);
			}
			setLoading(false);
		}

		loadUser();
	}, []);

	useEffect(() => {
		if (user) {
			console.log('Nuevo user:', user);

			setFormData({
				id: user.id || '',
				firstName: user.firstName || '',
				lastName: user.lastName || '',
				email: user.email || '',
				phoneNumber: user.phoneNumber || '',
				address: user.address || '',
				bio: user.bio || '',
			});
		}
	}, [user]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form data:', formData);

		try {
			console.log('Enviando datos:', formData);

			const response = await updateUser(formData as User);

			if (response.success) {
				console.log(response);
				setUser(formData as User);
			} else {
				console.error('Error al actualizar:', response.error);
				alert(`Error: ${response.error}`);
			}
		} catch (error) {
			console.error('Error inesperado:', error);
			alert('Ocurrió un error inesperado');
		}
	};

	const handleChangePhoto = () => {
		console.log('Change Photo button clicked');
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Profile Settings</h1>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<ProfileImageCard
					firstName={formData.firstName}
					lastName={formData.lastName}
					avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
				/>
				<div className="lg:col-span-2 card bg-base-200 shadow-xl">
					<ProfileForm
						formData={formData}
						onChange={handleChange}
						onSubmit={handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
}
