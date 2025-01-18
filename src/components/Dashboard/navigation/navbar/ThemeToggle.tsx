import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<label className="swap swap-rotate btn btn-ghost btn-circle">
			<input
				type="checkbox"
				className="theme-controller hidden" // Oculta el input visualmente
				checked={theme === 'dark'} // Marca el checkbox si el tema es 'dark'
				onChange={toggleTheme} // Cambia el tema al alternar el checkbox
			/>
			<Sun className="swap-on w-6 h-6" /> <Moon className="swap-off w-6 h-6" />{' '}
		</label>
	);
};
