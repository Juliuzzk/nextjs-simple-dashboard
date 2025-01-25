import { Camera } from 'lucide-react';

interface ProfileImageCardProps {
	firstName: string;
	lastName: string;
	avatarUrl: string;
}

export const ProfileImageCard = ({
	firstName,
	lastName,
	avatarUrl,
}: ProfileImageCardProps) => {
	return (
		<div className="card bg-base-200 shadow-xl p-6">
			<div className="flex flex-col items-center">
				<div className="avatar online mb-4">
					<div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
						<img src={avatarUrl} alt="Profile" />
					</div>
				</div>
				<h3 className="text-lg font-semibold">
					{firstName} {lastName}
				</h3>
				<p className="text-sm text-base-content/70">Senior Developer</p>
				<button className="btn btn-outline btn-sm gap-2 mt-4">
					<Camera size={16} />
					Change Photo
				</button>
			</div>
		</div>
	);
};
