'use client';

import { ProfileForm } from '@/components/dashboard/profile/ProfileForm';
import { ProfileImageCard } from '@/components/dashboard/profile/ProfileImageCard';
import { useState } from 'react';

export default function ProfilePage() {
	const [formData, setFormData] = useState({
		firstName: 'John',
		lastName: 'Doe',
		email: 'john.doe@example.com',
		phone: '+1 (555) 000-0000',
		address: '123 Developer Street, Code City, 12345',
		bio: 'Senior developer with 5+ years of experience in web development.',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Form data:', formData);
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
					// onChangePhoto={handleChangePhoto}
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
