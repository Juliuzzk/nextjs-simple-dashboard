import {
	LayoutDashboard,
	Users,
	ShoppingCart,
	Settings,
	HelpCircle,
	LogOut,
} from 'lucide-react';
import { SidebarItem } from './SidebarItem';

//TODO: menuItems debe cargarse a partir de opciones del menu configuradas
const menuItems = [
	{ icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
	{ icon: Users, label: 'Users', href: '/dashboard/users' },
	// { icon: ShoppingCart, label: 'Products', href: '/products' },
	// { icon: Settings, label: 'Settings', href: '/settings' },
	{ icon: HelpCircle, label: 'Help', href: '/help' },
];

interface SidebarProps {
	isCollapsed: boolean;
	handleLogout: () => Promise<void>;
}

export function Sidebar({ isCollapsed, handleLogout }: SidebarProps) {
	return (
		<aside className="h-full bg-base-200 flex flex-col transition-all duration-300 border-r border-base-300 ${isCollapsed ? 'w-20' : 'w-64'}">
			<div className="p-4 h-16 flex items-center border-b border-base-300">
				<div className="flex items-center gap-2">
					<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
						<span className="text-primary-content font-bold text-xl">D</span>
					</div>
					{!isCollapsed && <span className="text-xl font-bold">Dashboard</span>}
				</div>
			</div>

			<nav className="flex-1 p-4">
				<ul className="space-y-2">
					{menuItems.map((item) => (
						<SidebarItem
							key={item.label}
							icon={item.icon}
							label={item.label}
							href={item.href}
							collapsed={isCollapsed}
						/>
					))}
				</ul>
			</nav>

			<div className="p-4 border-t border-base-300">
				<SidebarItem
					icon={LogOut}
					label="Logout"
					href="/logout"
					className="text-error"
					collapsed={isCollapsed}
					type="button"
					onClick={handleLogout}
				/>
			</div>
		</aside>
	);
}
