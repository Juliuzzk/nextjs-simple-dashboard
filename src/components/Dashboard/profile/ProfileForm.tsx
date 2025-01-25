import { Mail, Phone, MapPin } from 'lucide-react';

interface ProfileFormProps {
	formData: {
		firstName: string;
		lastName: string;
		email: string;
		phone: string;
		address: string;
		bio: string;
	};
	onChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export const ProfileForm = ({
	formData,
	onChange,
	onSubmit,
}: ProfileFormProps) => {
	return (
		<form onSubmit={onSubmit} className="card-body">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Input fields */}
				<div className="form-control">
					<label className="label">
						<span className="label-text">First Name</span>
					</label>
					<input
						type="text"
						name="firstName"
						className="input input-bordered"
						value={formData.firstName}
						onChange={onChange}
					/>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Last Name</span>
					</label>
					<input
						type="text"
						name="lastName"
						className="input input-bordered"
						value={formData.lastName}
						onChange={onChange}
					/>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<Mail size={16} className="text-base-content/70" />
						<input
							type="email"
							name="email"
							className="grow"
							value={formData.email}
							onChange={onChange}
						/>
					</label>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Phone</span>
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<Phone size={16} className="text-base-content/70" />
						<input
							type="tel"
							name="phone"
							className="grow"
							value={formData.phone}
							onChange={onChange}
						/>
					</label>
				</div>
				<div className="form-control md:col-span-2">
					<label className="label">
						<span className="label-text">Address</span>
					</label>
					<label className="input input-bordered flex items-center gap-2">
						<MapPin size={16} className="text-base-content/70" />
						<input
							type="text"
							name="address"
							className="grow"
							value={formData.address}
							onChange={onChange}
						/>
					</label>
				</div>
				<div className="form-control md:col-span-2">
					<label className="label">
						<span className="label-text">Bio</span>
					</label>
					<textarea
						name="bio"
						className="textarea textarea-bordered h-24"
						value={formData.bio}
						onChange={onChange}
					/>
				</div>
			</div>
			<div className="card-actions justify-end mt-6">
				<button type="button" className="btn">
					Cancel
				</button>
				<button type="submit" className="btn btn-primary">
					Save Changes
				</button>
			</div>
		</form>
	);
};
