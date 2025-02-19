'use client';

import { ProfileForm } from '@/components/dashboard/profile/ProfileForm';
import { ProfileImageCard } from '@/components/dashboard/profile/ProfileImageCard';
import { ErrorAlert } from '@/components/shared/ErrorAlert';
import { useUser } from '@/context/UserContext';
import { useCustomToast } from '@/hooks/useCustomToast';
import { fetchUserById, updateUser } from '@/services/api/users';
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
	const { user } = useUser();
	const { data: session, status, update } = useSession();
	const [errors, setErrors] = useState<string[]>([]);
	const { showSuccessToast, showErrorToast } = useCustomToast();

	// Estado para el formulario (valores editables)
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		image: '',
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
					setFormData({
						firstName: user.firstName || '',
						lastName: user.lastName || '',
						image: user.image || '',
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
		try {
			const userData: User = {
				id: Number(user?.id),
				image: user?.image,
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
				// toast.success('Profile updated successfully!');
				showSuccessToast('Profile updated successfully!');
			} else {
				console.error('Error updating user:', response.error);
				setErrors(response.error as string[]);
			}
		} catch (error: any) {
			console.error('Error in handleSubmit:', error);
			showErrorToast(error.message || 'An unknown error occurred');
		}
	};

	const handleChangePhoto = async (fileString: string) => {
		console.log('Change Photo button clicked');
		if (!fileString) return;

		try {
			const userData: User = {
				id: Number(session!.user!.id), // Usamos el operador "!" porque sabemos que session.user.id existe
				firstName: formData.firstName,
				lastName: formData.lastName,
				image: fileString,
				email: formData.email,
				phoneNumber: formData.phone,
				address: formData.address,
				bio: formData.bio,
				status: '',
			};

			const response = await updateUser(userData);

			if (response.success) {
				console.log('User updated successfully:', response.data);
				// update();
				// Actualizamos los valores confirmados
				setSavedData({
					firstName: formData.firstName,
					lastName: formData.lastName,
				});

				// mensajes de exito los renderizamos en un toast
				showSuccessToast('Profile updated successfully!');
			} else {
				// mensajes de error por validacion, los renderizamos en un error
				setErrors(response.error as string[]);
			}
		} catch (error) {}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Profile Settings</h1>
			</div>

			<ErrorAlert messages={errors} />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<ProfileImageCard
					firstName={savedData.firstName} // Solo muestra los valores confirmados
					lastName={savedData.lastName} // Solo muestra los valores confirmados
					avatarString={formData.image}
					onPhotoChange={handleChangePhoto}
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
