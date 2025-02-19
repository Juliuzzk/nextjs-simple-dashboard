import { useEffect } from 'react';

export function SessionStorageIni({
	setLanguage,
}: {
	setLanguage: (lang: string) => void;
}) {
	useEffect(() => {
		const storedLang = sessionStorage.getItem('lang');

		if (storedLang) {
			setLanguage(storedLang); // Usar idioma guardado
		} else {
			sessionStorage.setItem('lang', 'en'); // Si no existe, establecer inglés por defecto
			setLanguage('en');
		}
	}, []);

	return null;
}
