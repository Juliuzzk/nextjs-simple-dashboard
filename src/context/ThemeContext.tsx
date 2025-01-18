'use client'; // Esto es necesario en el App Router de Next.js para hooks como useEffect

import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from 'react';

type Theme = 'light' | 'dark';
type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>('light'); // Valor predeterminado

	// Leer el tema del localStorage al cargar la app
	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme | null;
		if (storedTheme) {
			setTheme(storedTheme);
			updateHtmlDataTheme(storedTheme); // Actualiza el atributo data-theme al cargar
		}
	}, []);

	// Actualizar el tema y persistir en localStorage
	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		updateHtmlDataTheme(newTheme); // Cambia el atributo data-theme dinámicamente
	};

	// Función para actualizar el atributo data-theme
	const updateHtmlDataTheme = (theme: Theme) => {
		document.documentElement.setAttribute('data-theme', theme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within a ThemeProvider');
	return context;
};
