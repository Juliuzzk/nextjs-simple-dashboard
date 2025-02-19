'use client';

import { createContext, useContext, useState, useEffect } from 'react';

interface DictionaryContextProps {
	dictionary: Record<string, string>;
	t: (key: string) => string;
	setDictionary: (dict: Record<string, string>) => void;
}

const DictionaryContext = createContext<DictionaryContextProps | undefined>(
	undefined
);

export function DictionaryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [dictionary, setDictionary] = useState<Record<string, string>>({});

	useEffect(() => {
		const storedDictionary = sessionStorage.getItem('dictionary');
		if (storedDictionary) {
			try {
				setDictionary(JSON.parse(storedDictionary)); // Intenta parsear solo si es válido
			} catch (error) {
				console.error('Error parsing dictionary from sessionStorage:', error);
				sessionStorage.removeItem('dictionary'); // Elimina el dato corrupto
			}
		}
	}, []);

	useEffect(() => {
		sessionStorage.setItem('dictionary', JSON.stringify(dictionary));
	}, [dictionary]);

	const t = (key: string) => dictionary[key] || key;

	return (
		<DictionaryContext.Provider value={{ dictionary, t, setDictionary }}>
			{children}
		</DictionaryContext.Provider>
	);
}

export function useDictionaryContext() {
	const context = useContext(DictionaryContext);
	if (!context) {
		throw new Error(
			'useDictionaryContext must be used within a DictionaryProvider'
		);
	}
	return context;
}
