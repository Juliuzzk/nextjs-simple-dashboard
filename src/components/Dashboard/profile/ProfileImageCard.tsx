import { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';

interface ProfileImageCardProps {
	firstName: string;
	lastName: string;
	avatarString: string;
	onPhotoChange: (fileString: string) => void; // Callback para manejar la subida
}

const DefaultAvatar = () => (
	<svg
		viewBox="0 0 16 16"
		xmlns="http://www.w3.org/2000/svg"
		className="w-24 h-24 mx-auto"
		fill="#000000"
	>
		<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
		<g
			id="SVGRepo_tracerCarrier"
			strokeLinecap="round"
			strokeLinejoin="round"
		></g>
		<g id="SVGRepo_iconCarrier">
			<path
				d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
				fill="#2e3436"
			></path>
		</g>
	</svg>
);

export const ProfileImageCard = ({
	firstName,
	lastName,
	avatarString: avatarString,
	onPhotoChange,
}: ProfileImageCardProps) => {
	const [preview, setPreview] = useState(avatarString);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setPreview(avatarString);
	}, [avatarString]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file); // Convierte la imagen a Base64
			reader.onload = async () => {
				const base64String = reader.result as string;
				onPhotoChange(base64String);
				setPreview(base64String);
			};
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className="card bg-base-200 shadow-xl p-6">
			<div className="flex flex-col items-center">
				<div className="avatar online mb-4">
					<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
						{preview ? (
							<Image
								src={preview}
								alt="Profile"
								width={20}
								height={20}
								className="w-full h-full object-cover rounded-full"
							/>
						) : (
							<DefaultAvatar />
						)}
					</div>
				</div>
				<h3 className="text-lg font-semibold">
					{firstName} {lastName}
				</h3>
				{/* <p className="text-sm text-base-content/70">Senior Developer</p> */}
				<p className="text-sm text-base-content/70"></p>

				{/* Input oculto para seleccionar la imagen */}
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					className="hidden"
					onChange={handleFileChange}
				/>

				<button
					onClick={handleButtonClick}
					className="btn btn-outline btn-sm gap-2 mt-4"
				>
					<Camera size={16} />
					Change Photo
				</button>
			</div>
		</div>
	);
};
