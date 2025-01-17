import { Bell, Moon, Sun, PanelLeftClose, PanelLeft } from 'lucide-react';
import { UserMenu } from './UserMenu';
import { themeChange } from 'theme-change';
import { useEffect, useState } from 'react';

interface TopNavProps {
	isCollapsed: boolean;
	onToggleSidebar: () => void;
}

export function TopNav({ isCollapsed, onToggleSidebar }: TopNavProps) {
	const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Estado del tema actual

	// Inicializa themeChange y sincroniza el tema con localStorage
	useEffect(() => {
		const savedTheme =
			(localStorage.getItem('theme') as 'light' | 'dark') || 'light';
		setTheme(savedTheme);
		document.documentElement.setAttribute('data-theme', savedTheme);
	}, []);

	// Maneja el cambio de tema
	const handleThemeChange = (newTheme: 'light' | 'dark') => {
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme); // Guarda el tema en localStorage
		document.documentElement.setAttribute('data-theme', newTheme); // Cambia el atributo
	};

	return (
		<div className="navbar bg-base-200 px-4 border-b border-base-300 h-16">
			<div className="flex-1">
				<button onClick={onToggleSidebar} className="btn btn-ghost btn-sm">
					{isCollapsed ? <PanelLeft size={20} /> : <PanelLeftClose size={20} />}
				</button>
			</div>

			<div className="flex-none gap-2">
				{/* Controlador de tema */}
				<label className="swap swap-rotate btn btn-ghost btn-circle">
					<input
						type="checkbox"
						checked={theme === 'dark'} // Sincroniza el estado del checkbox
						onChange={(e) =>
							handleThemeChange(e.target.checked ? 'dark' : 'light')
						}
					/>
					<Moon className="swap-on" />
					<Sun className="swap-off" />
				</label>

				{/* Botón de notificaciones */}
				<button className="btn btn-ghost btn-circle">
					<div className="indicator">
						<Bell size={20} />
						<span className="badge badge-sm badge-primary indicator-item">
							2
						</span>
					</div>
				</button>

				{/* Menú de usuario */}
				<UserMenu />
			</div>
		</div>
	);
}
