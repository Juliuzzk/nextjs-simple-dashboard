import { User, Settings, LogOut } from 'lucide-react';
import { Session } from 'next-auth';
import Image from 'next/image';

interface UserMenuProps {
	user: Session['user'];
}

export function UserMenu({ user }: UserMenuProps) {
	return (
		<div className="dropdown dropdown-end">
			<div
				tabIndex={0}
				role="button"
				className="btn btn-ghost btn-circle avatar"
			>
				<div className="w-10 rounded-full">
					{user.image ? (
						<Image
							src={user.image}
							alt="User Avatar"
							width={20}
							height={20}
							className="w-full h-full object-cover rounded-full"
						/>
					) : (
						<Image
							alt="User avatar"
							width={20}
							height={20}
							src="/images/default-avatar.jpg"
						/>
					)}
				</div>
			</div>
			<ul
				tabIndex={0}
				className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box min-w-[12rem] w-auto "
			>
				<li className="menu-title text-base-content/60">
					<span>
						{user.firstName} {user.lastName}
					</span>
					<span className="text-xs">{user.email}</span>
				</li>
				<div className="divider my-0"></div>
				<li>
					<a href={'/dashboard/profile'} className="gap-3">
						<User size={16} />
						Profile
					</a>
				</li>
				<li>
					<a className="gap-3">
						<Settings size={16} />
						Settings
					</a>
				</li>
				<div className="divider my-0"></div>
				<li>
					<a className="text-error gap-3">
						<LogOut size={16} />
						Logout
					</a>
				</li>
			</ul>
		</div>
	);
}
