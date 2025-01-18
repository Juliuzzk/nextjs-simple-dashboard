import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
	icon: LucideIcon;
	label: string;
	href?: string;
	className?: string;
	collapsed?: boolean;
	type?: 'button' | 'link';
	onClick?: () => Promise<void>;
}

export function SidebarItem({
	icon: Icon,
	label,
	href = '#',
	className = '',
	collapsed = false,
	type = 'link',
	onClick,
}: SidebarItemProps) {
	const handleClick = async () => {
		if (type === 'button') {
			await onClick?.();
		}
	};

	return (
		<li className="list-none">
			{type === 'button' ? (
				<button
					onClick={onClick}
					className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition-colors ${className}`}
					title={collapsed ? label : undefined}
				>
					<Icon size={20} />
					{!collapsed && <span>{label}</span>}
				</button>
			) : (
				<a
					href={href}
					className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-300 transition-colors ${className}`}
					title={collapsed ? label : undefined}
					onClick={handleClick}
				>
					<Icon size={20} />
					{!collapsed && <span>{label}</span>}
				</a>
			)}
		</li>
	);
}
