import { Bell, PanelLeftClose, PanelLeft } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from './ThemeToggle';
import { Session } from 'next-auth';

interface TopNavProps {
	isCollapsed: boolean;
	onToggleSidebar: () => void;
	user: Session['user'];
}

export function TopNav({ isCollapsed, onToggleSidebar, user }: TopNavProps) {
	return (
		<div className="navbar bg-base-200 px-4 border-b border-base-300 h-16">
			<div className="flex-1">
				<button onClick={onToggleSidebar} className="btn btn-ghost btn-sm">
					{isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
				</button>
			</div>

			<div className="flex-none gap-2">
				<ThemeToggle />

				<button className="btn btn-ghost btn-circle">
					<div className="indicator">
						<Bell size={20} />
						<span className="badge badge-sm badge-primary indicator-item">
							2
						</span>
					</div>
				</button>
				<UserMenu user={user} />
			</div>
		</div>
	);
}
