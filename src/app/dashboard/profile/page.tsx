'use client';

import { ProfileForm } from '@/components/dashboard/profile/ProfileForm';
import { ProfileImageCard } from '@/components/dashboard/profile/ProfileImageCard';
import { fetchUserById, updateUser } from '@/services/api/users';
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
	const { data: session, status } = useSession();

	// Estado para el formulario (valores editables)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		address: '',
		bio: '',
	});

	// Estado para los datos guardados en la base de datos (valores confirmados)
	const [savedData, setSavedData] = useState({
		firstName: '',
		lastName: '',
	});

	useEffect(() => {
		if (status === 'authenticated' && session?.user?.id) {
			// Obtener la información del usuario al cargar la página
			fetchUserById(session.user.id).then((response) => {
				if (response.data) {
					const user: User = response.data;
					console.log('user:', user);
					setFormData({
						firstName: user.firstName || '',
						lastName: user.lastName || '',
						email: user.email || '',
						phone: user.phoneNumber || '',
						address: user.address || '',
						bio: user.bio || '',
					});
					// También guardamos los valores confirmados
					setSavedData({
						firstName: user.firstName || '',
						lastName: user.lastName || '',
					});
				}
			});
		}
	}, [session, status]);

	// Validar la autenticación después de los Hooks

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
			// Asumimos que el usuario está autenticado (ya validamos al principio)
			const userData: User = {
				id: Number(session!.user!.id), // Usamos el operador "!" porque sabemos que session.user.id existe
				firstName: formData.firstName,
				lastName: formData.lastName,
				email: formData.email,
				phoneNumber: formData.phone,
				address: formData.address,
				bio: formData.bio,
				status: '',
			};

			const response = await updateUser(userData);

			if (response.success) {
				console.log('User updated successfully:', response.data);
				// Actualizamos los valores confirmados
				setSavedData({
					firstName: formData.firstName,
					lastName: formData.lastName,
				});
				toast.success('Profile updated successfully!');
			} else {
				console.error('Error updating user:', response.error);
				toast.error('Failed to update profile. Please try again.');
			}
		} catch (error) {
			console.error('Error in handleSubmit:', error);
			toast.error('An unexpected error occurred.');
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
					firstName={savedData.firstName} // Solo muestra los valores confirmados
					lastName={savedData.lastName} // Solo muestra los valores confirmados
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
