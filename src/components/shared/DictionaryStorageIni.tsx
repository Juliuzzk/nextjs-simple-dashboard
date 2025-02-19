'use client';

import { useEffect, useState } from 'react';

export function DictionaryStorageIni({
	setDictionary,
}: {
	setDictionary: (dict: Record<string, string>) => void;
}) {
	const [language, setLanguage] = useState('en');

	useEffect(() => {
		const storedLang = sessionStorage.getItem('lang');
		if (storedLang) {
			setLanguage(storedLang);
		} else {
			sessionStorage.setItem('lang', 'en');
		}
	}, []);

	useEffect(() => {
		const fetchDictionary = async () => {
			const cachedDictionary = sessionStorage.getItem(`dictionary`);

			if (cachedDictionary) {
				setDictionary(JSON.parse(cachedDictionary)); // Cargar desde cache
				return;
			}

			try {
				const response = await fetch(`/api/dictionary?lang=${language}`);
				if (!response.ok) throw new Error('Failed to fetch dictionary');

				const data = await response.json();
				sessionStorage.setItem(`dictionary`, JSON.stringify(data.data)); // Guardar en cache
				setDictionary(data);
			} catch (error) {
				console.error('Error fetching dictionary:', error);
			}
		};

		fetchDictionary();
	}, [language]);

	return null;
}
